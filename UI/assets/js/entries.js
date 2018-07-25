
class Entries extends Request {

  constructor(){
    super();
    this.entryAside = document.getElementById("entry-aside");
    this.entryBody = document.getElementById("entry-body");
    this.backButton = document.getElementById("btn-back");
    this.asideList = document.querySelectorAll("li.list");

    this.showMobileAside();

    this.fetchData();
  }

  clearSelections(){
    this.asideList.forEach(element => {
      element.classList.remove("selected");
    })
  }

  fetchData(){
    this.get("entries")
      .then(res => res.json())
      .then(this.onSuccess.bind(this))
      .catch(this.onError.bind(this));    
  }

  hideMobileAside(){
    this.entryAside.classList.add("mobile-aside");
    this.backButton.classList.remove("_hide");
  }

  hideMobileContentBody(){
    this.entryBody.classList.add("mobile-body");
  }

  listSelected(event, context, index){
    if(context.classList.contains("selected")){
      return;
    }

    this.clearSelections();
    context.classList.add("selected");

    this.showContentBody();
    this.showMobileContentBody();
    this.hideMobileAside();
  }

  showMobileAside(){
    this.entryAside.classList.remove("mobile-aside");
    this.backButton.classList.add("_hide");
  }

  showMobileContentBody(){
    this.entryBody.classList.remove("mobile-body");
  }

  showContentBody(){
    this.entryBody.classList.remove("_hide");
  }

  onSuccess(data){
    console.log(data);
  }

  onError(error){
    console.log(error);
  }


} 

const entries = new Entries();

entries.backButton.addEventListener("click", (e) => {
  entries.hideMobileContentBody();
  entries.showMobileAside();
});


