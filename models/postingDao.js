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

module.exports = { createPosting, updatePosting, deletePosting };
