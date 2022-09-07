const userVo = (object) =>{
  let params = new Map();

  let email = object.email;
  let nickname = object.nickname;
  let password = object.password;
  let stacks = object.stacks;
  let profile_image = object.profile_image;

  if(email) {
    params.set("email", email);
  }

  if(nickname) {
    params.set("nickname", nickname);
  }

  if(password) {
    params.set("password", password);
  }

  if(stacks) {
    params.set("stacks", stacks);
  }

  if(profile_image) {
    params.set("profile_image", profile_image);
  }

  return params;
}
 
module.exports = {userVo}