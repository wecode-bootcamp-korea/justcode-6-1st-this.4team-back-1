const dataSource = require("./typeorm-client");

// 게시글 상세페이지
const getOnePost = async(post_id) => {
  return await dataSource.myDataSource.query(
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

  return await dataSource.myDataSource.query(query, param);

}

module.exports = { getOnePost, getPostList }