<div align="center">
  <img src="https://user-images.githubusercontent.com/110225060/197337903-82af5ddd-444f-443b-a16a-b48b56ef2bf1.png" width=400/>


  ### 👉 이거사조팀의 **[Hola!](https://holaworld.io/)** 클론 코딩 프로젝트
</div>

<br>

# *목차*
### 목차 <br>
### [1. 프로젝트 소개](#✨프로젝트-소개) 

### [2. 기능 소개](#✨기능-소개)

### [3. 링크](#✨링크)

<br>

# *✨프로젝트 소개*

## **📌사이트 소개**
Hola!는 개발 관련 스터디 및 프로젝트 동료를 구하는 사이트로 기술 스택 별로 게시글을 보여주며 사용자가 글을 작성 및 댓글을 남겨 원하는 팀원을 구할 수 있는 사이트이다.

## **📌선정 이유**
e-commerce 사이트의 경우 조회에 관련된 기능들이 메인으로 조회 기능에 치우쳐서 프로젝트를 진행하기보다는 밸런스 있게 CRUD를 경험하고자 선정하였다. 또한 부트 캠프를 들어와서 처음 시작하는 프로젝트인 만큼 다양한 기능을 진행해 보는 것보다는 완성도에 목표를 두고 싶었다.

## **📹프로젝트 구현 영상**
[![프로젝트 구현 영상](http://img.youtube.com/vi/xo1gqoUQRx0/0.jpg)](https://youtu.be/xo1gqoUQRx0?t=0s) 

## **📌개발 기간**
2022.08.29 ~ 2022.09.08

## **📌팀원**
**[프론트 엔드]** 이혜림(PM), 안승섭, 박유빈, 이고운 <br>
**[백 엔드]** 김현정, 안수철

## **📌DB 모델링**
![](https://user-images.githubusercontent.com/110225060/197342659-41c8fe87-7d62-4e41-a043-8bddd7b9c064.png)

## **📌적용 기술**
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Slick-FF880F?style=for-the-badge&logo=SlickPic&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/React modal-0088CC?style=for-the-badge&logo=React&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Create portal-09D3AC?style=for-the-badge&logo=Create React App&logoColor=white"/>&nbsp; <br>
<img src="https://img.shields.io/badge/Node.js-39933?style=for-the-badge&logo=Node.js&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/TypeORM-262627?style=for-the-badge&logo=TypeORM&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Bcrypt-003A70?style=for-the-badge&logo=Bcrypt&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/JWT-FBBA00?style=for-the-badge&logo=JWT&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/RESTful API-2478CC?style=for-the-badge&logo=RESTful API&logoColor=white"/>&nbsp;

## **📌프로젝트 구조**
```
📦/
 ┣ 📂controllers
 ┣ 📂db
 ┣ 📂middleware
 ┣ 📂models
 ┣ 📂routes
 ┣ 📂services
 ┣ 📜app.js.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜server.js
```

## **📌프로젝트 실행 방법**
### 1. 레포지토리 clone
```
git clone https://github.com/hhhj1008/justcode-6-1st-this.4team-back.git
```
### 2. 프로젝트 폴더 선택 후 아래의 명령어 실행
```
npm i
```
### 3. 프로젝트 실행
```
npm start
```

<br>

# *✨기능 소개*

## **📌기능 분담**
|이름|담당기능|
|---|---|
|이혜림|- header nav <br> - footer <br> - 새글 작성 UI 및 api 연동 <br> - 새글 작성 UI 및 api 연동 <br> - 사용자 수정 UI 및 api 연동|
|안승섭|- 메인 화면 UI, 내 글 목록 화면 UI <br> - 무한 스크롤, API 연동 <br >- 각종 버그 수정|
|박유빈|- 게시글 상세페이지 UI <br> - 게시글 삭제 및 뒤로가기 <br> - 댓글 리스트 UI <br> - 댓글 작성, 수정 , 삭제|
|이고운|- 로그인 <br> - 이용약관 <br> - 회원가입|
|김현정|- 회원가입 및 로그인 <br> - 사용자 정보 가져오기 및 정보 수정 <br> - 게시글 목록 가져오기 <br> - 게시글 선택 내용 읽기 <br> - 기술 스택 목록 읽어오기|
|안수철|- 게시글 작성, 수정, 삭제 <br> - 댓글 불러오기, 작성, 수정, 삭제|

## **📌구현 기능**
|구현 기능|설명|
|---|---|
|회원 가입|- 사용자 정보를 입력받아 회원 가입을 할 수 있는 API <br> - 회원 가입 시 이메일 중복여부 체크 <br> - Bcrypt를 이용하여 해시 함수로 비밀번호 암호화 |
|로그인|- 이메일과 비밀번호를 입력받아 로그인하는 API <br> - 로그인을 성공하였을 경우 JWT을 이용하여 access token을 발급|
|사용자 정보 불러오기|- 토큰으로 사용자 아이디를 확인하여 해당 사용자의 정보를 불러오는 API|
|사용자 정보 수정|- 사용자의 정보를 수정하는 API <br> - 발급된 토큰으로 사용자를 확인하여 수정 요청|
|기술 스택 리스트|- 기술 스택의 목록을 읽어오는 API <br> - 각 기술 스택의 카테고리에 알맞은 것을 보여주는 필터링 기능 구현 <br> - 인기 목록의 경우 자주 작성된 기술 스택 중 상위 10개를 보여줌|
|게시글 목록 읽어오기|- 작성된 게시글 목록을 읽어오는 API <br> - 게시글에 선택된 기술 스택으로 검색할 수 있는 필터링 기능 구현 <br> - 게시글 목록 페이징 기능 구현|
|게시글 내용 읽어오기|- 목록에서 선택된 게시글의 내용을 보여주는 API|
|게시글 작성|- 게시글을 작성하는 API <br> - 토큰으로 어떤 사용자가 작성하였는지 확인 후 게시글 삽입|
|게시글 수정|- 게시글을 수정하는 API <br> - 토큰으로 게시글 작성자와 수정을 요청한 사용자가 일치하는지 확인 후 수정 진행|
|게시글 삭제|- 게시글을 삭제하는 API <br> - 토큰으로 게시글 작성자와 삭제를 요청한 사용자가 일치하는지 확인 후 삭제 진행|
|댓글 읽어오기|- 게시글에 작성된 댓글을 읽어오는 API|
|댓글 작성|- 댓글을 작성하는 API <br> - 토큰으로 어떤 사용자가 작성하였는지 확인 후 댓글 삽입|
|댓글 수정|- 댓글을 수정하는 API <br> - 토큰으로 댓글 작성자와 수정을 요청한 사용자가 일치하는지 확인 후 수정 진행|
|댓글 삭제|- 댓글을 삭제하는 API <br> - 토큰으로 댓글 작성자와 삭제를 요청한 사용자가 일치하는지 확인 후 수정 진행|

<br>

# *✨링크*
### 👉[API 명세서 ](https://documenter.getpostman.com/view/22723177/2s847Ftsdk)  
### 👉[팀 노션](https://www.notion.so/wecode/4-4193b03c5f434d29a5c055fff938b777) 
### 👉[프론트엔드 Github 링크](https://github.com/wecode-bootcamp-korea/justcode-6-1st-this.4team-front) 
### 👉[백엔드 Github 링크](https://github.com/wecode-bootcamp-korea/justcode-6-1st-this.4team-back)

