
class Request{

  constructor() {
    // this.API = "https://mydiary-ola.herokuapp.com/api/v1/";
    this.API = "http://localhost:8000/api/v1/";
    const token = localStorage.getItem("token") || "";

    this.headers = {
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json; charset=utf-8",
      } 
    };

    this.options = {
      mode: "cors",
      credentials: 'omit',
    };

    this.filter = this.filter.bind(this);
  }

  delete(url){
    const URI = this.API + url;
    return fetch(URI, {
      method: "DELETE", 
      ...this.headers,
      ...this.options,
    })
      .then(res => res.json())
      .then(this.filter);
  }

  get(url){
    const URI = this.API + url;
    return fetch(URI, {...this.headers, ...this.options})
      .then(res => res.json())
      .then(this.filter);
  }

  post(url, payload){
    const URI = this.API + url;
    return fetch(URI, {
      method: "POST", 
      ...this.headers,
      ...this.options,
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(this.filter);
  }

  put(url, payload){
    const URI = this.API + url;
    return fetch(URI, {
      method: "PUT", 
      ...this.headers,
      ...this.options,
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(this.filter);
  }

  filter(res){
    const {error, errors} = res;
    if(error || errors){
      throw res;
    } else {
      return res;
    }
  }

}

