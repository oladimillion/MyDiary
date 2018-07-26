class Entry extends Request{

  constructor(){
    super();

    this.titleInput = document.querySelector("input[name='title']");
    this.textarea = document.querySelector("textarea");

    this.update = false;
    this.entry = {};

    this.localStorageData();
  }

  genId(len=10, chars="abcdefghjkmnpqrstwxyz123456789"){
    let id = "";
    while(len){
      id += chars[Math.random() * chars.length | 0];
      len--;
    }
    return id;
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
    this.textarea.value = data.entry_content || "";
    this.titleInput.value = data.entry_title || "";
  }

  submit(form){
    const formData = new FormData(form);

    const errors = ValidateInput(formData);

    if(errors.length){
      return;
    }

    const payload = {
      body: {
        entry_id: this.entry.entry_id 
        ? this.entry.entry_id : this.genId(),
        entry_title: formData.get("title"),
        entry_content: formData.get("textarea"),
      }
    };

    if(!this.update){
      this.post("entries", payload)
        .then(res => res.json())
        .then(this.onSuccess.bind(this))
        .catch(this.onError.bind(this));    
    }
    else {
      this.put("entries/" + this.entry.entry_id,  payload)
        .then(res => res.json())
        .then(this.onSuccess.bind(this))
        .catch(this.onError.bind(this));    
    }
  }

  onSuccess(data){
    console.log(data);
  }

  onError(error){
    console.log(error);
  }

} 

const entry = new Entry();

document.getElementById("form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    entry.submit(e.target);
  })
