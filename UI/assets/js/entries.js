
class Entries extends Request {

  constructor(){
    super();
    this.status = new Status();

    this.entryAside = document.getElementById("entry-aside");
    this.entryBody = document.getElementById("entry-body");
    this.backButton = document.getElementById("btn-back");
    this.listWrapper = document.getElementById("list-wrapper");
    this.loadingIcon = document.getElementById("loading");
    this.infoText = document.getElementById("info");

    this.asideList = null;
    this.editBtn = null;

    this.showMobileAside();

    this.itemsList = [];
    this.selectedItem = {};

    this.listIsSelected = false;

    this.fetchData();
  }

  appendListItems(items){
    items.forEach((item, index) => {
      this.listWrapper.innerHTML += this.listItemHtml(item, index);
    });
  }

  clearSelections(){
    this.asideList = document.querySelectorAll("li.list");
    this.asideList.forEach(element => {
      element.classList.remove("selected");
    });
  }

  appendEntryBodyHtml(data){
    return `
        <div class="title">
          ${data.entry_title}
        </div>
        <!-- end of title -->
        <div class="content" id="body-content">
          ${data.entry_content}
        </div>
        <!-- end of content -->
        <div class="row btm-content">
          <button 
            onclick="entries.redirect()"
            id="btn-edit"
            class="btn btn-edit">
            <a href="javascript:void(0)">
              <i class="fa fa-edit"></i>
              &nbsp;Edit
            </a>
          </button>
          <div class="date">
            ${this.formatDate(data.updated_at)}
          </div>
        </div>
    `;
  }

  fetchData(){
    this.get("entries")
      .then(this.onSuccess.bind(this))
      .catch(this.onError.bind(this));    
  }

  formatDate(date){
    return new Date(date).toLocaleString()
  }

  hideMobileAside(){
    this.entryAside.classList.add("mobile-aside");
  }

  listSelected(event, context, index){

    this.selectedItem = this.itemsList[index];
    this.entryBody.innerHTML = 
      this.appendEntryBodyHtml(this.selectedItem);

    this.clearSelections();
    context.classList.add("selected");

    this.listIsSelected = true;

    this.showContentBody();
    this.hideMobileAside();
  }

  listItemHtml(data, index){
    return `
      <li class="list"
        onclick="entries.listSelected(event, this, ${index})">
        <span class="list-icon">
          <i class="fa fa-book"></i>
        </span>
        <div class="title">
        ${data.entry_title}
        </div>
        <!-- end of title -->
        <div class="date">
        ${this.truncateDate(data.updated_at)}
        </div>
      </li>
    `;
  }

  showMobileAside(){
    this.entryAside.classList.remove("mobile-aside");
  }

  toggleMobileAside(){
    if(!this.listIsSelected){
      return;
    }
    this.entryAside.classList.toggle("mobile-aside");
  }

  showContentBody(){
    this.editBtn = document.getElementById("btn-edit");
    this.entryBody.classList.remove("hide");
  }

  showInfoText(){
    if(this.infoText.classList.contains("_hide")){
      this.infoText.classList.remove("_hide");
    }
  }

  hideInfoText(){
    if(!this.infoText.classList.contains("_hide")){
      this.infoText.classList.add("_hide");
    }
  }

  showLoadingIcon(){
    if(this.loadingIcon.classList.contains("_hide")){
      this.loadingIcon.classList.remove("_hide");
    }
  }

  hideLoadingIcon(){
    if(!this.loadingIcon.classList.contains("_hide")){
      this.loadingIcon.classList.add("_hide");
    }
  }

  truncateDate(date){
    return new Date(date).toLocaleDateString();
  }

  redirect(){
    localStorage.setItem("entry", JSON.stringify(this.selectedItem));
    window.location.href = "entry.html";
  }

  onSuccess(data){
    this.itemsList = data.entries;
    this.hideLoadingIcon();
    if(this.itemsList.length){
      this.appendListItems(this.itemsList);
    } else {
      this.showInfoText();
    }

    localStorage.setItem(
      "entry-count", 
      String(this.itemsList.length)
    );
  }

  onError(error){
    this.hideLoadingIcon();
    this.showInfoText();
  }


} 

const entries = new Entries();

entries.backButton.addEventListener("click", (e) => {
  entries.toggleMobileAside();
});


