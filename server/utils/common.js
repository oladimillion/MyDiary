export function GenId(
  len=8, 
  chars="abcdefghjkmnpqrtwxyABCDEFGHJKMNPQRTWXY123456789"){
  let id = "";
  while(len){
    id += chars[Math.random() * chars.length | 0];
    len--;
  }
  return id;
}
