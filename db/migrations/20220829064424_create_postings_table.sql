-- migrate:up
CREATE TABLE postings (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
classification VARCHAR(100),            -- 모집 구분
volume VARCHAR(50),                     -- 모집인원
onoffline VARCHAR(50),                  -- 진행방식(on/offline)
progress_period VARCHAR(50),            -- 진행기간(기간미정, 1개월, 2개월 ...)
start_date DATETIME,                    -- 시작 예정일
contact VARCHAR(50),                    -- 연락방법
contact_content VARCHAR(50),            -- 선택된 방법의 상세 내용(메일주소, url 등)
is_closed VARCHAR(10),                       -- 마감여부 (Y/N)
user_id INT NOT NULL,
title VARCHAR(100),                     -- 제목
contents VARCHAR(3000),                 -- 내용
create_at DATETIME DEFAULT NOW(),       -- 게시글 작성일
update_at DATETIME DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,       -- 게시글 수정일
FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE
);

-- migrate:down
DROP TABLE postings;

