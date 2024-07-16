import { createParamDecorator, ExecutionContext } from '@nestjs/common';

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

export const UserInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user ? request.user : null;
  }
);
