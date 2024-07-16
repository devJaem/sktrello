import _ from 'lodash';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCheckListDto } from './dto/create-checkList.dto';
import { UpdateCheckListDto } from './dto/update-checkList.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckList } from './entities/checkList.entity';
import { Repository } from 'typeorm';
import { LexoRank } from 'lexorank';
import { CHECK_MESSAGES } from 'src/constants/check-message.constant';
import { MoveCheckListDto } from './dto/move-checkList.dto';
import { Card } from 'src/card/entities/card.entity';

@Injectable()
export class CheckListService {
  constructor(
    @InjectRepository(CheckList)
    private readonly checkListRepository: Repository<CheckList>,
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>
  ) {}

  /**
   * 카드 내부 체크리스트 추가
   * @param createCheckListDto 체크리스트 생성 DTO
   * @returns 생성된 결과값
   */
  async create(createCheckListDto: CreateCheckListDto) {
    const { cardId, title } = createCheckListDto;

    // 카드가 존재하는지 확인
    const card = await this.cardRepository.findOne({ where: { id: cardId } });
    if (!card) {
      throw new NotFoundException(CHECK_MESSAGES.CHECKLIST.CARD_NOT_FOUND);
    }

    const lastCheckList = await this.checkListRepository.findOne({
      where: { cardId },
      order: { checkListOrder: 'DESC' },
    });
    const order = lastCheckList
      ? LexoRank.parse(lastCheckList.checkListOrder).genNext()
      : LexoRank.middle();

    const newCheckList = this.checkListRepository.create({
      cardId,
      title,
      checkListOrder: order.toString(),
    });
    await this.checkListRepository.save(newCheckList);
    return newCheckList;
  }

  /**
   * 카드 내부 체크리스트 조회
   * @param cardId 카드 ID
   * @returns 조회된 결과값
   */
  async findAll(cardId: number) {
    const checklists = await this.checkListRepository
      .createQueryBuilder('check_list')
      .where('check_list.card_id = :cardId', { cardId })
      .leftJoinAndSelect('check_list.checkItems', 'check_item')
      .getMany();

    return checklists;
  }

  /**
   * 체크리스트 단일 조회
   * @param id 체크리스트 ID
   * @returns 조회된 결과값
   */
  async findOne(id: number) {
    const checkList = await this.verifyListById(id);
    return checkList;
  }

  /**
   * 체크리스트 내용 수정
   * @param id 체크리스트 ID
   * @param updateCheckListDto title
   */
  async update(id: number, updateCheckListDto: UpdateCheckListDto) {
    await this.verifyListById(id);
    await this.checkListRepository.update({ id }, updateCheckListDto);
  }

  /**
   * 카드 내의 체크리스트 순서 이동
   * @param id 체크리스트 ID
   * @param moveCheckItemDto targetOrder : 이동할 곳의 목표 순서값
   * @returns 이동한 결과값
   */
  async moveItemWithInCard(id: number, moveCheckItemDto: MoveCheckListDto) {
    const { targetOrder } = moveCheckItemDto;

    const checkList = await this.verifyListById(id);
    const targetList = await this.checkListRepository.findOne({
      where: {
        cardId: checkList.cardId,
        checkListOrder: targetOrder.toString(),
      },
    });

    if (_.isNil(targetList)) {
      throw new NotFoundException(CHECK_MESSAGES.CHECKLIST.TARGET_NOT_FOUND);
    }

    const targetRank = LexoRank.parse(targetList.checkListOrder);
    const currentRank = LexoRank.parse(checkList.checkListOrder);
    const newRank = targetRank.between(currentRank);

    checkList.checkListOrder = newRank.toString();
    await this.checkListRepository.save(checkList);

    return { originalList: checkList, targetList: targetList };
  }

  /**
   * 다른 카드로 이동 and 위치까지 지정
   * @param id 체크리스트 ID
   * @param moveCheckListDto targetCardId, targetCardId
   * @returns 이동한 결과값
   */
  async moveListToAnotherCard(id: number, moveCheckListDto: MoveCheckListDto) {
    const { targetOrder, targetCardId } = moveCheckListDto;

    //이동할 체크리스트 가져오기
    const checkList = await this.verifyListById(id);
    checkList.cardId = targetCardId;

    let newOrder = checkList.checkListOrder;
    if (targetOrder) {
      const targetList = await this.checkListRepository.findOne({
        where: {
          cardId: targetCardId,
          checkListOrder: targetOrder.toString(),
        },
      });

      if (_.isNil(targetList)) {
        throw new NotFoundException(CHECK_MESSAGES.CHECKLIST.NOT_FOUND);
      }

      const targetRank = LexoRank.parse(targetList.checkListOrder);
      const currentRank = LexoRank.parse(checkList.checkListOrder);

      // 기존 순서와 목표순서가 동일하지 않을 경우만 새로운 순서 생성
      if (!currentRank.equals(targetRank)) {
        newOrder = targetRank.genNext().toString();
      }
    } else {
      // 타겟 체크리스트에서 마지막 아이템 순서 가져오기
      const lastCheckListInTargetList = await this.checkListRepository.findOne({
        where: { cardId: targetCardId },
        order: { checkListOrder: 'DESC' },
      });

      // LexoRank를 사용하여 새로운 순서 생성
      newOrder = lastCheckListInTargetList
        ? LexoRank.parse(lastCheckListInTargetList.checkListOrder)
            .genNext()
            .toString()
        : LexoRank.middle().toString();
    }

    // 새로운 순서와 카드ID 저장
    checkList.checkListOrder = newOrder;
    await this.checkListRepository.save(checkList);

    return { originalList: checkList, targetCard: targetCardId };
  }

  /**
   * 체크 리스트 삭제
   * @param id 체크리스트 ID
   * @returns 소프트 딜리트 된 아이템 리턴
   */
  async remove(id: number) {
    const checkList = await this.verifyListById(id);
    checkList.deletedAt = new Date();
    await this.checkListRepository.save(checkList);
    return { deletedItem: checkList };
  }

  /**
   * 한개의 id값을 가져오는 메서드
   * @param id
   * @returns
   */
  private async verifyListById(id: number) {
    const checkList = await this.checkListRepository.findOne({
      where: { id },
      relations: { checkItems: true },
    });
    if (_.isNil(checkList)) {
      throw new NotFoundException(CHECK_MESSAGES.CHECKLIST.NOT_FOUND);
    }

    return checkList;
  }

  /**
   * 전체 checklist 갯수 확인 메서드
   * @param cardId 카드 id
   * @returns checlist 갯수
   */
  async count(cardId: number) {
    const listCount = await this.checkListRepository
      .createQueryBuilder('check_list')
      .select('COUNT(check_list.checkListOrder)', 'total_list_count')
      .where('check_list.cardId= :cardId', { cardId })
      .getRawOne();

    return listCount;
  }
}
