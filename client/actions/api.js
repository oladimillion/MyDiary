let API = "";
if(window.location.href.includes("localhost")){
  API = "http://localhost:9000/api/v1/";
} else {
  API = "https://mydiary-ola.herokuapp.com/api/v1/";
}

export default API;

