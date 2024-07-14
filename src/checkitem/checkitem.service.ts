import _ from 'lodash';
import { CreateCheckItemDto } from './dto/create-checkItem.dto';
import { UpdateCheckItemDto } from './dto/update-checkItem.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckItem } from './entities/checkItem.entity';
import { Repository } from 'typeorm';
import { LexoRank } from 'lexorank';
import { MoveCheckItemDto } from './dto/move-checkItem.dto';
import { MESSAGES } from '../constants/check-message.constats'

@Injectable()
export class CheckItemService {
  constructor(
    @InjectRepository(CheckItem)
    private readonly checkItemRepository: Repository<CheckItem>
  ) {}

  /**
   * 체크리스트 내부 아이탬 추가
   * @param createCheckItemDto 체크아이탬 생성 DTO
   * @returns 생성된 결과값
   */
  async create(createCheckItemDto: CreateCheckItemDto) {
    const { checkListId, content } = createCheckItemDto;

    const lastCheckItem = await this.checkItemRepository.findOne({
      where: { checkListId },
      order: { checkItemOrder: 'DESC' },
    });

    // RexoRank
    const order = lastCheckItem
      ? LexoRank.parse(lastCheckItem.checkItemOrder).genNext()
      : LexoRank.middle();

    const newCheckItem = this.checkItemRepository.create({
      checkListId,
      content,
      checkItemOrder: order.toString(),
    });
    await this.checkItemRepository.save(newCheckItem);
    return newCheckItem;
  }

  /**
   * 체크리스트 내부 아이탬 전체 조회
   * @param checkListId 체크리스트 ID
   * @returns 조회된 결과값
   */
  async findAll(checkListId: number) {
    const checkItems = await this.checkItemRepository
      .createQueryBuilder('check_item')
      .where('check_item.checklist_id = :checklistId', { checkListId })
      .getRawMany();

    return checkItems;
  }

  /**
   * 체크아이탬 단일 조회
   * @param id 체크아이템 ID
   * @returns 조회된 결과값
   */
  async findOne(id: number) {
    const checkItem = await this.verifyListById(id);
    return checkItem;
  }

  /**
   * 체크아이탬 수정
   * @param id 체크아이템 ID
   * @param updateCheckItemDto  content or isDone
   */
  async update(id: number, updateCheckItemDto: UpdateCheckItemDto) {
    await this.verifyListById(id);
    await this.checkItemRepository.update({ id }, updateCheckItemDto);
  }

  /**
   * 체크리스트 내의 아이탬 순서이동
   * @param id 체크아이템 ID
   * @param moveCheckItemDto targetOrder : 이동할 곳의 목표 순서값
   * @returns 이동한 결과값
   */
  async moveItemWithinCheckList(
    id: number,
    moveCheckItemDto: MoveCheckItemDto
  ) {
    const { targetOrder } = moveCheckItemDto;

    const checkItem = await this.verifyListById(id);
    const targetItem = await this.checkItemRepository.findOne({
      where: {
        checkListId: checkItem.checkListId,
        checkItemOrder: targetOrder.toString(),
      },
    });

    if (_.isNil(targetItem)) {
      throw new NotFoundException(MESSAGES.CHECKITEM.TARGET_NOT_FOUND);
    }

    const targetRank = LexoRank.parse(targetItem.checkItemOrder);
    const currentRank = LexoRank.parse(checkItem.checkItemOrder);
    const newRank = targetRank.between(currentRank);

    checkItem.checkItemOrder = newRank.toString();
    await this.checkItemRepository.save(checkItem);

    return { originalItem: checkItem, targetItem: targetItem };
  }

  /**
   * 다른 체크리스트로 이동 and 위치까지 지정
   * @param id 체크아이템 ID
   * @param moveCheckItemDto targetChecklistId, targetOrder
   * @returns 이동한 결과값
   */
  async moveItemToAnotherChecklist(
    id: number,
    moveCheckItemDto: MoveCheckItemDto
  ) {
    const { targetChecklistId, targetOrder } = moveCheckItemDto;

    // 이동할 체크아이템 가져오기
    const checkItem = await this.verifyListById(id);
    checkItem.checkListId = targetChecklistId;

    let newOrder = checkItem.checkItemOrder; // 기본적으로 현재 순서를 유지

    if (targetOrder) {
      const targetItem = await this.checkItemRepository.findOne({
        where: {
          checkListId: targetChecklistId,
          checkItemOrder: targetOrder.toString(),
        },
      });

      if (_.isNil(targetItem)) {
        throw new NotFoundException(MESSAGES.CHECKITEM.NOT_FOUND);
      }

      const targetRank = LexoRank.parse(targetItem.checkItemOrder);
      const currentRank = LexoRank.parse(checkItem.checkItemOrder);

      // 기존의 순서와 목표 순서가 동일하지 않을 경우에만 새로운 순서를 생성
      if (!currentRank.equals(targetRank)) {
        newOrder = targetRank.genNext().toString();
      }
    } else {
      // 타겟 체크리스트에서 마지막 아이템 순서 가져오기
      const lastCheckItemInTargetList = await this.checkItemRepository.findOne({
        where: { checkListId: targetChecklistId },
        order: { checkItemOrder: 'DESC' },
      });

      // LexoRank를 사용하여 새로운 순서 생성
      newOrder = lastCheckItemInTargetList
        ? LexoRank.parse(lastCheckItemInTargetList.checkItemOrder)
            .genNext()
            .toString()
        : LexoRank.middle().toString();
    }

    // 새로운 순서와 체크리스트 ID 저장
    checkItem.checkItemOrder = newOrder;
    await this.checkItemRepository.save(checkItem);

    return { originalItem: checkItem, targetList: targetChecklistId };
  }

  /**
   * 체크 아이탬 삭제
   * @param id 체크아이템 ID
   * @returns 소프트 딜리트 된 아이탬 리턴
   */
  async remove(id: number) {
    const checkItem = await this.verifyListById(id);
    checkItem.deletedAt = new Date();
    await this.checkItemRepository.save(checkItem);
    return { deletedItem: checkItem };
  }

  /**
   * 한개의 id값을 열람하는 메서드
   * @param id 체크아이템 ID
   * @returns id에 해당하는 컬럼
   */
  private async verifyListById(id: number) {
    const checkItem = await this.checkItemRepository.findOne({
      where: { id },
    });
    if (_.isNil(checkItem)) {
      throw new NotFoundException(MESSAGES.CHECKITEM.NOT_FOUND);
    }

    return checkItem;
  }
  /**
   * 전체 list 갯수 확인 메서드
   * @param checkListId 체크리스트 id
   * @returns list 갯수
   */
  async count(checkListId: number) {
    const listCount = await this.checkItemRepository
      .createQueryBuilder('check_item')
      .select('COUNT(check_item.checkItemOrder)', 'total_list_count')
      .where('check_item.checkListId = :checkListId', { checkListId })
      .getRawOne();

    return listCount;
  }
}
