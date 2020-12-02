// let messageList=new MessageList();


class PersonalUsersView{
  constructor(containerId){
    this._containerId = containerId;
  }
    get containerId() {
    return this._containerId;
  }
  display(users,currentUser) {
    const select = document.getElementById(this.containerId);
    const result_users=users.filter((item)=>item!==currentUser);
    select.innerHTML=`<option value="public">public</option>`;
    let str="";
    for(const name of result_users){
      str+=`<option value="${name}">${name}</option>`
    }
    select.innerHTML="";
     select.innerHTML=`<option value="public">public</option>`+str;
  }
}


class UserList {
  constructor(users, activeUsers) {
    this._users = users;
    this._activeUsers = activeUsers;
    console.log(this.activeUsers);
    console.log(this.users);
    // this.restore();
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
  // restore(){
  //   this._users=JSON.parse(localStorage.getItem("userList")[0]);
  //   this._activeUsers=JSON.parse(localStorage.getItem("userList")[1]);
  // }
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
      // messageList.user = '';
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
    console.log( msgList[0] instanceof Object);
    // console.log(new Date(msgList[0].createdAt))
    const temp = document.getElementById('msgs-tmpl');
    const temp2 = document.getElementById('msgs-date-tmpl');
    const parent = document.getElementById(this.containerId);
    console.log( msgList[0]);
    let day=msgList[0].createdAt.getDate();
    let month=msgList[0]._createdAt.getMonth();
    let year=msgList[0].createdAt.getFullYear();
    // parent.innerHTML=msgList.map(item=>
    //     `<div class="message ${MessagesView.check(user,item.author)}">
    //         <span class="user-name">${item.author}</span>
    //         <span class="time">${item.createdAt}</span>
    //         <p class="msg-text">${item.text}</p>
    //     </div>`
    // ).join(`\n`);

    const fragment = new DocumentFragment();
    for (const item of msgList) {
        if(item.createdAt.getDate()!==day || item.createdAt.getMonth()!==month || item.createdAt.getFullYear()!==year){
        const el2 = temp2.content.cloneNode(true);
        el2.querySelector(".date-history").textContent=`${day}.${month+1}.${year}`;
        fragment.appendChild(el2);
      }
      day=item.createdAt.getDate();
      month=item.createdAt.getMonth();
      year=item.createdAt.getFullYear(); 
      const el = temp.content.cloneNode(true);
      el.querySelector('.info-message-name').textContent = item.author;
      el.querySelector('.info-message-time').textContent = `${item.createdAt.getHours()}:${item.createdAt.getMinutes()}`;
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
    // parent.innerHTML+=`                    
    //   <div class="loud-flex" id="loud-flex">
    //     <button class="loud-more" id="loud-more">
    //       <img src="img/row-top.svg" alt="">
    //     </button>
    //   </div>`;
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
      const el = temp.content.cloneNode(true);
      el.querySelector('.online-name').textContent = item;
      fragment.appendChild(el);
    }
    parent.innerHTML = '';
    parent.appendChild(fragment);
  }
}