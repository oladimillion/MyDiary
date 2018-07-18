export function GenId(len=6, chars="abcdefghjkmnpqrstwxyz123456789"){
  let id = "";
  while(len){
    id += chars[Math.random() * chars.length | 0];
    len--;
  }
  return id;
}
