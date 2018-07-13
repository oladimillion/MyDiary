
class Request{

  constructor() {
    this.API = "http://localhost:8000/api/v1/";
    this.token = localStorage.getItem("token") || "";

    this.headers = {
      "Authorization": "Bearer " + this.token,
    };
  }

  post(url, payload){
    const URI = this.API + url;
    return fetch(URI, {
      method: "post", 
      headers: this.headers,
      ...payload
    });
  }

  put(url, payload){
    const URI = this.API + url;
    return fetch(URI, {
      method: "put", 
      headers: this.headers, 
      ...payload
    });
  }

  get(url){
    const URI = this.API + url;
    return fetch(URI, {headers: this.headers});
  }

}

