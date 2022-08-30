const dataSource = require("./typeorm-client");

// 게시글 상세페이지
const getOnePost = async(post_id) => {
  const [post] = await dataSource.myDataSource.query(
    `SELECT 
    post.title, 
    USER.nickname, 
    USER.profile_image, 
    post.create_at, 
    post.classification, 
    post.volume, 
    post.onoffline,
    post.start_date, 
    post.contect_content, 
    post.progress_period,
    (SELECT GROUP_CONCAT(stack_name) FROM stacks WHERE id IN(post.stack)) AS stack_name,
    (SELECT GROUP_CONCAT(stack_image) FROM stacks WHERE id IN(post.stack)) AS stack_image
    FROM postings post
    LEFT JOIN users USER ON post.user_id = USER.id
    WHERE post.id = ?
    `, [post_id]
  );

  return post;
}

// 내 게시글 목록
const getMyPostList = async(user_id) => {
  const [post] = '';
}

module.exports = { getOnePost }