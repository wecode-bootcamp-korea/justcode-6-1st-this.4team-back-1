const postingVo = (object) =>{
  let params = new Map();

  if(!object) {
    const error = new Error(`${key} value not entered!`);
      error.status = 400;
      throw error;
  }

  let posting_id = object.posting_id;
  let classification = object.classification;
  let volume = object.volume;
  let start_date = object.start_date;
  let onoffline = object.onoffline;
  let progress_period = object.progress_period;
  let stack = object.stack;
  let contact = object.contact;
  let contact_content = object.contact;
  let title = object.title;
  let contents = object.contents;

  if(posting_id) {
    params.set("posting_id", posting_id);
  }

  if(classification) {
    params.set("classification", classification);
  }

  if(volume) {
    params.set("volume", volume);
  }

  if(start_date) {
    params.set("start_date", start_date);
  }

  if(onoffline) {
    params.set("onoffline", onoffline);
  }

  if(progress_period) {
    params.set("progress_period", progress_period);
  }

  if(stack) {
    params.set("stack", stack);
  }

  if(contact) {
    params.set("contact", contact);
  }

  if(contact_content) {
    params.set("contact_content", contact_content);
  }

  if(title) {
    params.set("title", title);
  }

  if(contents) {
    params.set("contents", contents);
  }

  return params;
}

module.exports = {postingVo}