# SKTrello

- 트렐로와 비슷한 칸반보드 기반의 협업툴 서비스 구현.
- Nest.js, TypeORM을 이용하여 구현한다.

## 👋 개발 기간

2024.07.11 ~ 2024.07.17

## 📌 주요 기능

<details>
  <summary>1. 사용자 관리 기능</summary>
  <div markdown="1">
    <ul>
      <li>회원 가입 : 사용자는 이메일과 비밀번호, 비밀번호 확인, 사용자 닉네임을 입력하여 회원 가입 할 수 있습니다.</li>
      <li>로그인 : 회원 가입에 성공한 사용자는 이메일과 비밀번호를 통하여 로그인 할 수 있습니다.</li>
      <li>회원 정보 조회 : 로그인한 사용자는 본인의 회원 정보를 조회할 수 있습니다.</li>
      <li>회원 정보 수정 : 로그인한 사용자는 본인의 회원 정보를 수정할 수 있습니다.</li>
      <li>회원 비밀번호 수정 : 로그인한 사용자는 본인의 비밀번호를 수정할 수 있습니다.</li>
      <li>회원 탈퇴 : 로그인한 사용자는 회원 탈퇴할 수 있습니다.</li>
    </ul>
  </div>
</details>

<details>
  <summary>2. 보드 관리 기능</summary>
  <div markdown="2">
    <ul>
      <li>보드 생성 : 로그인한 사용자는 보드를 생성할 수 있습니다.</li>
      <li>보드 목록 조회 : 호스트는 보드의 목록을 조회할 수 있습니다.</li>
      <li>보드 상세 조회 : 호스트, 어드민, 멤버는 보드의 목록을 상세 조회할 수 있습니다.</li>
      <li>보드 수정 : 호스트, 어드민, 멤버는 보드를 수정할 수 있습니다.</li>
      <li>보드 삭제 : 호스트는 보드를 삭제할 수 있습니다.</li>
      <li>보드 멤버 초대 : 호스트는 보드에 멤버를 초대할 수 있습니다.</li>
      <li>보드 초대 수락 : 로그인한 사용자는 보드에서 초대를 수락할 수 있습니다.</li>
      <li>보드 초대 거절 : 로그인한 사용자는 보드에서 초대를 거절할수 있습니다.</li>
      <li>보드 참여자 권한 변경 : 호스트는 보드의 참여자 권한을 변경할 수 있습니다.</li>
    </ul>
  </div>
</details>

<details>
  <summary>3. 보드 내 컬럼(리스트) 관리 기능</summary>
  <div markdown="3">
    <ul>
      <li>리스트 생성 : 호스트, 어드민, 멤버는 리스트를 생성할 수 있습니다.</li>
      <li>리스트 목록 조회 : 호스트, 어드민, 멤버는 리스트의 목록을 조회할 수 있습니다.</li>
      <li>리스트 상세 조회 : 호스트, 어드민, 멤버는 리스트의 목록을 상세 조회할 수 있습니다.</li>
      <li>리스트 이름 수정 : 호스트, 어드민, 멤버는 리스트의 이름을 수정할 수 있습니다.</li>
      <li>리스트 순서 이동 : 호스트, 어드민, 멤버는 리스트의 순서를 이동할 수 있습니다.</li>
      <li>리스트 삭제 : 호스트, 어드민, 멤버는 리스트를 삭제할 수 있습니다.</li>
    </ul>
  </div>
</details>

<details>
  <summary>4. 컬럼(리스트) 내 카드 관리 기능</summary>
  <div markdown="4">
    <ul>
      <li>카드 생성 : 호스트, 어드민, 멤버는 카드를 생성할 수 있습니다.</li>
      <li>카드 목록 조회 : 호스트, 어드민, 멤버는 카드의 목록을 조회할 수 있습니다.</li>
      <li>카드 상세 조회 : 호스트, 어드민, 멤버는 카드의 목록을 상세 조회할 수 있습니다.</li>
      <li>카드 이름 수정 : 호스트, 어드민, 멤버는 카드의 이름을 수정할 수 있습니다.</li>
      <li>카드 순서 이동 : 호스트, 어드민, 멤버는 카드의 순서를 이동할 수 있습니다.</li>
      <li>카드 삭제 : 호스트, 어드민, 멤버는 카드를 삭제할 수 있습니다.</li>
    </ul>
  </div>
</details>

<details>
  <summary>5. 카드 내 체크리스트 관리 기능</summary>
  <div markdown="5">
    <ul>
      <li>체크리스트 생성 : 호스트, 어드민, 멤버는 체크리스트를 생성할 수 있습니다.</li>
      <li>체크리스트 목록 조회 : 호스트, 어드민, 멤버는 카드 내 체크리스트를 모두 조회할 수 있습니다.</li>
      <li>체크리스트 상세 조회 : 호스트, 어드민, 멤버는 특정 체크리스트를 조회할 수 있습니다.</li>
      <li>체크리스트 수정 : 호스트, 어드민, 멤버는 체크리스트를 수정할 수 있습니다.</li>
      <li>체크리스트 위치 이동 : 호스트, 어드민, 멤버는 체크리스트의 위치를 이동할 수 있습니다.</li>
      <li>다른 카드로 체크리스트 이동 : 호스트, 어드민, 멤버는 다른 카드로 체크리스트를 이동할 수 있습니다.</li>
      <li>체크리스트 삭제 : 호스트, 어드민, 멤버는 체크리스트를 삭제할 수 있습니다.</li>
    </ul>
  </div>
</details>

<details>
  <summary>6. 카드 내 체크리스트 아이템 관리 기능</summary>
  <div markdown="6">
    <ul>
      <li>체크리스트 아이템 생성 : 호스트, 어드민, 멤버는 체크리스트 아이템을 생성할 수 있습니다.</li>
      <li>체크리스트 아이템 목록 조회 : 호스트, 어드민, 멤버는 체크리스트 내 아이템을 모두 조회할 수 있습니다.</li>
      <li>체크리스트 아이템 상세 조회 : 호스트, 어드민, 멤버는 체크리스트 아이템을 상세 조회할 수 있습니다.</li>
      <li>체크리스트 아이템 수정 : 호스트, 어드민, 멤버는 체크리스트 아이템을 수정할 수 있습니다.</li>
      <li>체크리스트 내 아이템 이동 : 호스트, 어드민, 멤버는 체크리스트 내의 아이템 순서를 이동할 수 있습니다.</li>
      <li>다른 체크리스트로 아이템 이동 : 호스트, 어드민, 멤버는 다른 체크리스트로 아이템을 이동할 수 있습니다.</li>
      <li>체크리스트 아이템 삭제 : 호스트, 어드민, 멤버는 체크리스트 아이템을 삭제할 수 있습니다.</li>
    </ul>
  </div>
</details>

<details>
  <summary>7. 카드 내 댓글 작성 기능</summary>
  <div markdown="7">
    <ul>
      <li>댓글 생성 : 로그인한 사용자는 댓글을 생성할 수 있습니다.</li>
      <li>댓글 목록 조회 : 호스트, 어드민, 멤버는 댓글의 목록을 조회할 수 있습니다.</li>
      <li>댓글 수정 : 로그인한 사용자는 댓글을 수정할 수 있습니다.</li>
      <li>댓글 삭제 : 로그인한 사용자는 댓글을 삭제할 수 있습니다.</li>
    </ul>
  </div>
</details>

## 👋 SKTrello 팀 소개

- **SKTrello**는 저희 팀명과 트렐로를 합성한 간단한 이름입니다.

- [배포 웹사이트 링크](https://devjeam.shop/api-docs/)
- [시연 영상 링크](https://youtu.be/M6XahVm7m2w)
- [GitHub 페이지 링크](https://github.com/devJaem/sktrello)

## 👋 팀원 소개

<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/CDR4733"><img src="https://avatars.githubusercontent.com/u/166963977?v=4" width="100px;" alt=""/><br /><sub><b> 팀장 : 석한솔 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/xszvvfm"><img src="https://avatars.githubusercontent.com/u/161733851?v=4" width="100px;" alt=""/><br /><sub><b> 팀원 : 방채은 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/dokidokitiger"><img src="https://avatars.githubusercontent.com/u/155073832?v=4" width="100px;" alt=""/><br /><sub><b> 팀원 : 이지훈 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/devJaem"><img src="https://avatars.githubusercontent.com/u/125876896?v=4" width="100px;" alt=""/><br /><sub><b> 팀원 : 정재민 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/Eomhyein"><img src="https://avatars.githubusercontent.com/u/26666131?v=44" width="100px;" alt=""/><br /><sub><b> 팀원 : 엄혜인 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/9r3dflam3"><img src="https://avatars.githubusercontent.com/u/167046779?v=4" width="100px;" alt=""/><br /><sub><b> 팀원 : 구남욱 </b></sub></a><br /></td>
    </tr>
  </tbody>
</table>

## 👥 팀 구성원 및 역할

- **석한솔**

  - 보드 담당
  - API 명세 설계

- **방채은**

  - 리스트 담당
  - README 작성

- **이지훈**

  - 카드 담당
  - ERD 설계

- **정재민**

  - 체크리스트 및 체크리스트 아이템 담당
  - 초기 설정
  - 웹 사이트 배포

- **엄혜인**

  - 댓글 CRUD
  - README 작성

- **구남욱**

  - 사용자 인증 담당
  - 발표

## 기술

### BACKEND

![Nest.js](https://img.shields.io/badge/nest.js-E0234E?style=for-the-badge&logo=Nest.js.js&logoColor=white)
![TypeORM](https://img.shields.io/badge/typeorm-262627?style=for-the-badge&logo=typeorm&logoColor=white)

### TOOLS

![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white) ![GitHub](https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white) ![Git](https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white)

## API 명세서

![Alt text](/docs/API 명세서1.png)

![Alt text](/docs/API 명세서2.png)

## 🗃 ERD

![Alt text](/docs/ERD 최종.png)

## 프로젝트 설치 및 실행 방법

### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
