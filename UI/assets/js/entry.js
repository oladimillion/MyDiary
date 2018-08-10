class Entry extends Request{

  constructor(){
    super();

    this.status = new Status();

    this.titleInput = document.querySelector("input[name='title']");
    this.textarea = document.querySelector("textarea");
    this.btnSave = document.getElementById("btn-save");

    this.update = false;
    this.isLoading = false;
    this.entry = {};

    this.localStorageData();
  }

  localStorageData(){
    this.entry = localStorage.getItem("entry");

    this.update = !!this.entry;

    if(this.update){
      this.entry = JSON.parse(this.entry);
    }

    this.entry = this.entry || {};
    this.setData(this.entry);
  }

  setData(data){
    this.titleInput.value = data.entry_title || "";
    this.textarea.value = data.entry_content || "";
  }

  submit(form){
    const formData = new FormData(form);

    const errors = ValidateInput(formData);

    if(Object.keys(errors).length || this.isLoading){
      this.status.show({errors}, true);
      return;
    }

    if(this.isLoading){
      return;
    }

    const body = {
      entryTitle: formData.get("title"),
      entryContent: formData.get("entry"),
    };

    this.isLoading = true;
    this.updateSaveBtn();

    if(!this.update){
      this.post("entries", body)
        .then(this.onSuccess.bind(this))
        .catch(this.onError.bind(this));    
    }
    else {
      this.put("entries/" + this.entry.entry_id, body)
        .then(this.onSuccess.bind(this))
        .catch(this.onError.bind(this));    
    }
  }


  updateSaveBtn(){
    if(!this.isLoading){
      this.btnSave.innerHTML = `
      <i class="fa fa-floppy-o"></i>
      &nbsp;&nbsp;Save
      `;
    } else {
      this.btnSave.innerHTML = 
        '<i class="fa fa-spinner fa-spin"></i>';
    }
  }


  onSuccess(data){
    this.isLoading = false;
    this.updateSaveBtn();
    localStorage.removeItem("entry");
    this.status.show(data);
    setTimeout(() => {
      window.location.href = "entries.html";
    }, 1000);
  }

  onError(error){
    this.isLoading = false;
    this.updateSaveBtn();
    this.status.show(error, true);
  }

} 

const entry = new Entry();

document.getElementById("form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    entry.submit(e.target);
  })
