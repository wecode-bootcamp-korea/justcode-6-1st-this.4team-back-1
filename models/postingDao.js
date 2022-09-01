const { myDataSource } = require('./typeorm-client');

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

  /* 
  if(is_closed || stacks || classification) {
    let str = '';

    if(is_closed) {
      if(!str) {
        str = str + `is_closed = ?`;
      } else {
        str = str + ` AND is_closed = ?`;  
      }

      param.push(is_closed);
    }

    if(stacks) {
      let arr = stacks.split(',');

      if(!str) {
        str = str + `stack.id IN (?)`
      } else {
        str = str + ` AND stack.id IN (?)`  
      }

      param.push(arr);
    }

    if(classification) {
      if(!str) {
        str = str + `post.classification = ?`
      } else {
        str = str + ` AND post.classification = ?`  
      }

      param.push(classification);
    }

    query = query + `WHERE ` + str + ` GROUP BY post.id`

  }
  

  if(!user_id && !is_closed && !stacks && !classification) {
    query = query + ` GROUP BY post.id`;
  }
  */

  return await myDataSource.query(query, param);

}

module.exports = { createPosting, updatePosting, deletePosting, getOnePost, getPostList  };

