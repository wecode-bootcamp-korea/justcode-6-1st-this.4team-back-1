-- migrate:up
CREATE TABLE postings (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
classification VARCHAR(100),            -- 모집 구분
volume INT,                             -- 모집인원
onoffline VARCHAR(50),                  -- 진행방식(on/offline)
progress_period VARCHAR(50),            -- 진행기간(기간미정, 1개월, 2개월 ...)
stack VARCHAR(50),                      -- 기술스택 콤마로 구분해서 여러개 값
start_date DATETIME,                    -- 시작 예정일
contect VARCHAR(50),                    -- 연락방법
contect_content VARCHAR(50),            -- 선택된 방법의 상세 내용(메일주소, url 등)
isclosed CHAR(1),                       -- 마감여부 (Y/N)
user_id INT NOT NULL,
title VARCHAR(100),                     -- 제목
contents VARCHAR(3000),                 -- 내용
create_at DATETIME DEFAULT NOW(),       -- 게시글 작성일
update_at DATETIME DEFAULT NOW(),       -- 게시글 수정일
FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE
);

-- migrate:down
DROP TABLE postings;

