class PersonalUsersView{
  constructor(containerId){
    this._containerId = containerId;
  }
    get containerId() {
    return this._containerId;
  }
  display(users,currentUser) {
    const select = document.getElementById(this.containerId);
    const result_users=users.filter((item)=>item.name!==currentUser);
    select.innerHTML=`<option value="public">public</option>`;
    const arr=result_users.sort((a,b)=>{
      return a.name-b.name;
    });
    let str="";
    for(const user of arr){
      str+=`<option value="${user.name}">${PersonalUsersView.valid(user.name)}</option>`
    }
    select.innerHTML="";
    select.innerHTML=`<option value="public">public</option>`+str;
  }
  static valid(user){
    if(user.length>20){
      return `${user.slice(0,20)}...`
    }
    return user;
  }
}


class UserList {
  constructor(users, activeUsers) {
    this._users = users;
    this._activeUsers = activeUsers;
  }

  get users() {
    return this._users;
  }
  set users(users){
    this._users=users;
    this.save();
  }

  get activeUsers() {
    return this._activeUsers;
  }
  set activeUsers(activeUsers){
    this._activeUsers=activeUsers;
    this.save();
  }
  save(){
    localStorage.setItem("userList",JSON.stringify([this.users,this.activeUsers]));
  }
}

class HeaderView {
  constructor(containerId) {
    this._containerId = containerId;
  }

  get containerId() {
    return this._containerId;
  }

  display(user) {
    const header = document.getElementById(this.containerId);
    if (user) {
      header.innerHTML = `<p class="UserName">${user}</p>`;
      document.querySelector(".btn-exit").style.display="block";
      document.getElementById("link-auti-reg").style.display="none";
      return user;
    } else {
      document.getElementById("link-auti-reg").style.display="block";
      header.innerHTML = `<p class="UserName">${""}</p>`;
      document.querySelector(".btn-exit").style.display="none";
      return "";
    }
  }
}

class MessagesView {
  constructor(containerId) {
    this._containerId = containerId;
  }

  get containerId() {
    return this._containerId;
  }

  static check(user, author) {
    if (user === author) {
      return 'own-msg';
    }
  }

  display(msgList, user) {
    const temp = document.getElementById('msgs-tmpl');
    const temp2 = document.getElementById('msgs-date-tmpl');
    const parent = document.getElementById(this.containerId);
    let day=new Date(msgList[0].createdAt).getDate();
    let month=new Date(msgList[0].createdAt).getMonth();
    let year=new Date(msgList[0].createdAt).getFullYear();

    const fragment = new DocumentFragment();
    for (const item of msgList) {
        if(new Date(item.createdAt).getDate()!==day || new Date(item.createdAt).getMonth()!==month
         || new Date(item.createdAt).getFullYear()!==year){
        const el2 = temp2.content.cloneNode(true);
        el2.querySelector(".date-history").textContent=`${day}.${month+1}.${year}`;
        fragment.appendChild(el2);
      }
      day=new Date(item.createdAt).getDate();
      month=new Date(item.createdAt).getMonth();
      year=new Date(item.createdAt).getFullYear(); 
      const el = temp.content.cloneNode(true);
      el.querySelector('.info-message-name').textContent = item.author;
      el.querySelector('.info-message-time').textContent = `${new Date(item.createdAt).getHours()}:${new Date(item.createdAt).getMinutes()}`;
      el.querySelector('.text-message').textContent = item.text;
      el.querySelector(".message-item").id=item.id;
      if (item.author === user) {
        el.querySelector('.text-message').className = 'your-mes';
        el.getElementById('img-icon').style.background = 'darkorchid';
      }
      if(item.isPersonal && item.author===user){
        el.querySelector(".private").textContent=`only for ${item.to}`
      }
      else if(item.isPersonal){
        el.querySelector(".private").textContent=`only for you`
      }
      fragment.appendChild(el); 
    }
    parent.innerHTML = '';
    parent.appendChild(fragment);
  }
}

class ActiveUsersView {
  constructor(containerId) {
    this._containerId = containerId;
  }

  get containerId() {
    return this._containerId;
  }

  display(activeUsers) {
    const temp = document.getElementById('online-tmpl');
    const parent = document.getElementById(this.containerId);
    const fragment = new DocumentFragment();
    for (const item of activeUsers) {
      if(item.isActive){
        const el = temp.content.cloneNode(true);
        el.querySelector('.online-name').textContent = PersonalUsersView.valid(item.name);
        fragment.appendChild(el);
      }
    }
    parent.innerHTML = '';
    parent.appendChild(fragment);
  }
}