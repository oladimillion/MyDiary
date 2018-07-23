
class Request{

  constructor() {
    this.API = "http://localhost:8000/api/v1/";
    this.token = localStorage.getItem("token") || "";

    this.headers = {
      headers: {
        "Authorization": "Bearer " + this.token,
        "Content-Type": "application/json; charset=utf-8",
      } 
    };

    this.options = {
      mode: "cors",
      credentials: 'omit',
    };
  }

  post(url, payload){
    const URI = this.API + url;
    return fetch(URI, {
      method: "POST", 
      ...this.headers,
      ...this.options,
      body: JSON.stringify(payload),
    });
  }

  put(url, payload){
    const URI = this.API + url;
    return fetch(URI, {
      method: "PUT", 
      ...this.headers,
      ...this.options,
      body: JSON.stringify(payload),
    });
  }

  get(url){
    const URI = this.API + url;
    return fetch(URI, {...this.headers, ...this.options});
  }

}

