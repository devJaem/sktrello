import { IS_BOOLEAN, IS_NUMBER, IS_STRING } from "class-validator";

// messages.ts
export const CHECK_MESSAGES = {
  CHECKLIST: {
    CREATE: '체크리스트가 생성되었습니다.',
    UPDATE: '체크리스트가 수정되었습니다.',
    DELETE: '체크리스트가 삭제되었습니다.',
    FOUND: '체크리스트가 조회 되었습니다.',
    NOT_FOUND: '체크리스트를 찾을 수 없습니다.',
    ID_IS_NOT_EMPTY:'체크리스트 아이디를 입력해 주세요',
    CARD_ID_IS_NOT_EMPTY:'카드 아이디를 입력해주세요.',
    TITLE_IS_NOT_EMPTY:'타이틀을 입력해주세요.',
    TARGET_NOT_FOUND: '목표 순서에 체크리스트가 존재하지 않습니다.',
    MOVE_WITHIN: '체크리스트가 이동되었습니다.',
    MOVE_TO_ANOTHER: '체크리스트가 다른 카드로 이동되었습니다.',
    CARD_NOT_FOUND: '카드 조회에 실패 하였습니다.'
  },
  CHECKITEM: {
    CREATE: '체크리스트 아이템이 생성되었습니다.',
    UPDATE: '체크리스트 아이템이 수정되었습니다.',
    DELETE: '체크리스트 아이템이 삭제되었습니다.',
    FOUND: '체크리스트 아이템이 조회 되었습니다.',
    NOT_FOUND: '체크리스트 아이템을 찾을 수 없습니다.',
    CONTENT_NOT_EMPTY: '컨텐츠를 입력해 주세요.',
    IS_DONE_NOT_EMPTY: '상태를 입력해 주세요.',
    IS_STRING: '문자열을 입력해 주세요.',
    IS_NUMBER: '숫자를 입력해 주세요.',
    IS_BOOLEAN: 'Boolean을 입력해 주세요.',
    TARGET_NOT_FOUND: '목표 순서에 체크리스트 아이템이 존재하지 않습니다.',
    MOVE_WITHIN: '체크리스트 아이템이 이동되었습니다.',
    MOVE_TO_ANOTHER: '체크리스트 아이템이 다른 체크리스트로 이동되었습니다.',
  },
};
