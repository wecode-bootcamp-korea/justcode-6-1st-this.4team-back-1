const { myDataSource } = require('./typeorm-client');

/*
코딩을 하실 때 만드는 메소드가 재사용성 여부가 있는지 한번 생각해보시면서 만드는게 좋아요.
그 이유를 예로 들자면, createPosting, updatePosting에 보시면 posting_stack을 insert 하는 것이 
중복되어 있는데, 이경우 postingStackDao 를 만드셔서 insertpostingStac 메소드 추가하신 뒤
const insertpostingStack = async (posting_id, stack) => {}
(메소드와 Dao의 이름은 예시이므로, 수철님이 좀더 직관적으로 지으셔도됩니다!)

postingService에 
createPosting 혹은 updatePosting이 실행된 이후에 insertpostingStack 이것을 실행하도록 수정하면
postingDao에서 코드가 중복되는 현상도 없어지고, 작성하실 때 번거로움이 줄어들어요.

createPosting 에서는 insert한  posting_id 값을 넘겨주어야 하니, select 되는 값을 return 해서 넘겨주시면 될것같습니다.

그리고 삭제 작업을 하실 때도
comment의 경우 commentDao에 삭제 쿼리가 있는데, 이거를 활용하셔서 호출하시면 될 것같습니다.
기존에는 comment_id만 받아오도록 되어있는데, 

const deleteComment = async (comment_id, posting_id) => { 
  let parm = [];
  let query = `DELETE FROM comment `;

  if(comment_id) {  >> comment_id가 null이 아니라면
    query = query + `WHERE comment_id = ?`
    parm.push(comment_id);
  }

  if(posting_id) { >> posting_id가 null이 아니라면
    query = query + `WHERE posting_id가 = ?`
    parm.push(posting_id가);
  }

  await myDataSource.query(query,parm);
}

이런 식으로 해주시면 delete 메소드를 재사용하면서 postingDao에 코드도 간결해질 수 있습니다.!

posting_stack을 삭제해주시는 것 또한 postingStackDao에 추가하셔서 
postingService에서 comment와 posting_stack 삭제 메소드 호출 이후에 deletePosting 호출하도록 하면 될 것 같습니다!

*/

const createPosting = async (
  classification,
  volume,
  onoffline,
  progress_period,
  stacks,
  start_date,
  contact,
  contact_content,
  user_id,
  title,
  contents
) => {
  await myDataSource.query(
    `
      INSERT INTO 
        postings(classification,
          volume,
          onoffline,
          progress_period,
          start_date,
          contact,
          contact_content,
          user_id,
          title,
          contents)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `,
    [
      classification,
      volume,
      onoffline,
      progress_period,
      start_date,
      contact,
      contact_content,
      user_id,
      title,
      contents,
    ]
  );
  const posting_id = await myDataSource.query(
    `
      SELECT postings.id FROM postings WHERE user_id = ? ORDER BY postings.id DESC LIMIT 1;
    `,
    [user_id]
  );
  for (let i = 0; i < stacks.length; i++) {
    await myDataSource.query(
      `
      INSERT INTO
      posting_stack(posting_id, stack_id)
      VALUES (?, ?)
      `,
      [posting_id[0].id, stacks[i]]
    );
  }
};

const updatePosting = async (
  user_id,
  posting_id,
  classification,
  volume,
  onoffline,
  progress_period,
  stacks,
  start_date,
  contact,
  contact_content,
  title,
  contents
) => {
  const isCorrectId = await myDataSource.query(
    `
  SELECT EXISTS (SELECT * FROM postings WHERE user_id = ? AND id = ? limit 1) AS SUCCESS
  `,
    [user_id, posting_id]
  );
  if (isCorrectId[0].SUCCESS === '0') {
    const err = new Error('NOT CORRECT USER');
    err.status = 403;
    throw err;
  }

  await myDataSource.query(
    `
  UPDATE
    postings
    
    SET
      classification = ?,
      volume = ?,
      onoffline = ?,
      progress_period = ?,
      start_date = ?,
      contact = ?,
      contact_content = ?,
      title = ?,
      contents = ?
    WHERE id = ?
  `,
    [
      classification,
      volume,
      onoffline,
      progress_period,
      start_date,
      contact,
      contact_content,
      title,
      contents,
      posting_id,
    ]
  );

  await myDataSource.query(
    `
    DELETE FROM posting_stack WHERE posting_id = ?;
    `,
    [posting_id]
  );

  for (let i = 0; i < stacks.length; i++) {
    await myDataSource.query(
      `
      INSERT INTO posting_stack( posting_id, stack_id ) VALUES (?, ?);
      `,
      [posting_id, stacks[i]]
    );
  }
};

const deletePosting = async (user_id, posting_id) => {
  const isCorrectId = await myDataSource.query(
    `
    SELECT EXISTS (SELECT * FROM postings WHERE user_id = ? AND id = ? limit 1) AS SUCCESS
  `,
    [user_id, posting_id]
  );
  if (isCorrectId[0].SUCCESS === '0') {
    const err = new Error('NOT CORRECT USER');
    err.status = 403;
    throw err;
  }
  await myDataSource.query(
    `
    DELETE FROM posting_stack, comments 
      USING 
        posting_stack 
      LEFT JOIN 
        comments ON posting_stack.posting_id = comments.posting_id 
      WHERE comments.posting_id = ?;
    `,
    [posting_id]
  );
  await myDataSource.query(
    `
    DELETE FROM postings WHERE id = ?
    `,
    [posting_id]
  );
};


// 게시글 상세페이지
const getOnePost = async(post_id) => {
  return await myDataSource.query(
    `SELECT 
    post.title, 
    USER.nickname, 
    USER.profile_image, 
    post.create_at, 
    post.classification, 
    post.volume, 
    post.onoffline,
    post.start_date, 
    post.contact_content, 
    post.progress_period,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'stack_name', stack.name,
        'stack_image', stack.image
      )
    ) AS stack
    FROM postings post
    JOIN users USER ON post.user_id = USER.id
    JOIN posting_stack ps ON post.id = ps.posting_id
    JOIN stacks stack ON ps.stack_id = stack.id
    WHERE post.id = ?
    `, [post_id]
  );
}

// 게시글 목록
const getPostList = async(user_id, stacks) => {
  let param = [];

  let query = `SELECT 
  post.id AS post_id,
  post.title, 
  USER.nickname, 
  USER.profile_image, 
  post.create_at, 
  post.classification, 
  post.volume, 
  post.onoffline,
  post.start_date, 
  post.contact_content, 
  post.progress_period,
  (
    SELECT
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'stack_id', stack.id,
          'stack_name', stack.name,
          'stack_image', stack.image
        )
      ) AS stack
    FROM postings post
    JOIN posting_stack ps ON post.id = ps.posting_id
    JOIN stacks stack ON ps.stack_id = stack.id
    WHERE post.id = post_id
  ) AS stack
  FROM postings post
  JOIN users USER ON post.user_id = USER.id
  JOIN posting_stack ps ON post.id = ps.posting_id
  JOIN stacks stack ON ps.stack_id = stack.id `;

  if(user_id) {
    query = query + `WHERE user_id = ? GROUP BY post.id`;
    param.push(user_id);
  } 

  if(stacks) {
    let arr = stacks.split(',');

    query = query + `WHERE stack.id IN (?) GROUP BY post.id`
    param.push(arr);
  }


  return await myDataSource.query(query, param);

}

module.exports = { createPosting, updatePosting, deletePosting, getOnePost, getPostList  };

