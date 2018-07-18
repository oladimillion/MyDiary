class Entry extends Request{

  constructor(){
    super();
    this.todayDate = new TodayDate();

    this.dateInput = document.querySelector("input[type='date']");
    this.titleInput = document.querySelector("input[name='title']");
    this.textarea = document.querySelector("textarea");

    this.update = false;
    this.entry = {};

    this.localStorageData()
  }

  genId(
    len=10, 
    chars="abcdefghjkmnpqrstwxyzABCDEFGHJKMNPQRSTWXYZ123456789"){
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
    const date = data.entry_date || this.todayDate.getDate();
    this.dateInput.value = date;
    this.textarea.value = data.entry_content || "";
    this.titleInput.value = data.entry_title || "";
  }

  submit(form){
    const formData = new FormData(form);

    const errors = ValidateInput(formData);

    if(errors.length){
      // return;
    }

    const body = {
      entry_title: formData.get("title"),
      entry_date: formData.get("date"),
      entry_content: formData.get("entry"),
    };

    if(!this.update){
      this.post("entries", body)
        .then(res => res.json())
        .then(this.onSuccess.bind(this))
        .catch(this.onError.bind(this));    
    }
    else {
      this.put("entries/" + this.entry.entry_id, body)
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
