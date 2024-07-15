import { createParamDecorator } from '@nestjs/common';

export const TestLogIn = createParamDecorator(() => {
  const request = {
    user: {
      id: 1,
      email: 'aaaa1111@naver.com',
      nickname: '김에이',
    },
  };
  return request.user;
});
