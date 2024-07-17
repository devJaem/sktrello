export const BOARD_MESSAGES = {
  BOARD: {
    // Board 공통
    COMMON: {
      TITLE: {
        NO_TITLE: '제목을 입력해 주세요.',
      },
      COLOR: {
        NO_COLOR: '색상을 입력해 주세요.',
      },
      EMAIL: {
        NO_EMAIL: '초대할 사용자의 이메일을 입력해 주세요.',
        NOT_EMAIL_TYPE: '이메일 형식이 아닙니다.',
      },
    },
    // Board 생성(C)
    CREATE: {
      SUCCESS: '보드 생성에 성공했습니다.',
      FAILURE: '보드 생성에 실패했습니다.',
    },
    // Board 목록 조회(R-L)
    READ_LIST: {
      SUCCESS: '보드 목록 조회에 성공했습니다.',
      FAILURE: '보드 목록 조회에 실패했습니다.',
    },
    // Board 상세 조회(R-D)
    READ_DETAIL: {
      SUCCESS: '보드 상세 조회에 성공했습니다.',
      FAILURE: {
        UNAUTHORIZED: '초대 받지 않은 보드입니다.',
        NOTFOUND: '해당 보드가 존재하지 않습니다.',
      },
    },
    // Board 수정(U)
    UPDATE: {
      SUCCESS: '보드 수정에 성공했습니다.',
      FAILURE: {
        UNAUTHORIZED: '호스트만 수정할 수 있습니다.',
        NOTFOUND: '해당 보드가 존재하지 않습니다.',
      },
    },
    // Board 삭제(D)
    DELETE: {
      SUCCESS: '보드 삭제에 성공했습니다.',
      FAILURE: {
        UNAUTHORIZED: '호스트만 삭제할 수 있습니다.',
        NOTFOUND: '해당 보드가 존재하지 않습니다.',
      },
    },
    // Board 멤버 초대(Invite)
    INVITATION: {
      SUCCESS: '보드 멤버 초대에 성공했습니다.',
      FAILURE: {
        UNAUTHORIZED: '호스트만 초대할 수 있습니다.',
        NOTFOUND: '존재하지 않는 사용자입니다.',
        CONFLICT: '이미 초대한 사용자입니다.',
      },
    },
    // 초대 수락(U)
    ACCEPT_INVITATION: {
      SUCCESS: '보드 초대를 수락했습니다.',
      FAILURE: {
        NOT_INVITED: '해당 보드에 초대를 받지 못했습니다.',
      },
    },
    // 초대 거절(D)
    DECLINE_INVITATION: {
      SUCCESS: '보드 초대를 거절했습니다.',
      FAILURE: {
        NOT_INVITED: '해당 보드에 초대를 받지 못했습니다.',
      },
    },
    // 권한 변경(U)
    BOARD_AUTH: {
      SUCCESS: {
        CHANGE: '권한 변경에 성공했습니다.',
        BYEBYE: '해당 참여자를 추방했습니다.',
        HOST_CHANGE: '해당 참여자에게 호스트 권한을 넘겨주었습니다.',
      },
      FAILURE: {
        NOT_MEMBER: '해당 보드의 참여자가 아닙니다.',
        NO_USERID: '참여자 id를 입력해주세요.',
        NO_ROLE: '변경할 권한을 설정해주세요.',
      },
    },
  },
};
