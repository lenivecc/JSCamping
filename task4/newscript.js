import { MessageList, array_of_messages } from '/script.js';

const messageList = new MessageList(array_of_messages);
console.log(messageList.getPage());

class UserList {
  constructor(users, activeUsers) {
    this._users = users;
    this._activeUsers = activeUsers;
  }

  get users() {
    return this._users;
  }

  get activeUsers() {
    return this._activeUsers;
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
      header.innerHTML = `<p id="user-name">${user}</p>`;
      messageList.user = user;
    } else {
      messageList.user = '';
      header.innerHTML = '<a>Вход / </a><a>Регистрация</a>';
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

    const parent = document.getElementById(this.containerId);
    // parent.innerHTML=msgList.map(item=>
    //     `<div class="message ${MessagesView.check(user,item.author)}">
    //         <span class="user-name">${item.author}</span>
    //         <span class="time">${item.createdAt}</span>
    //         <p class="msg-text">${item.text}</p>
    //     </div>`
    // ).join(`\n`);

    const fragment = new DocumentFragment();
    for (const item of msgList) {
      const el = temp.content.cloneNode(true);
      el.querySelector('.user-name').textContent = item.author;
      el.querySelector('.time').textContent = item.createdAt;
      el.querySelector('.msg-text').textContent = item.text;
      if (item.author === user) {
        el.querySelector('.message').className = 'own-msg';
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
      const el = temp.content.cloneNode(true);
      el.querySelector('.user-name-online').textContent = item;
      fragment.appendChild(el);
    }
    parent.appendChild(fragment);
  }
}


const headerView = new HeaderView('header-user');
function setCurrentUser(user) {
  headerView.display(user);
}

setCurrentUser('Pasha');
// setCurrentUser("");

const activeUsersView = new ActiveUsersView('active-users');
const userList = new UserList(['Dima', 'Zhenya Zh.', 'Zhenya H.', 'Sasha', 'Pasha'], ['Dima', 'Zhenya Zh.']);
function showActiveUsers() {
  activeUsersView.display(userList.activeUsers);
}

showActiveUsers();

const messagesView = new MessagesView('messages');

function showMessages(skip, top, filterConfig) {
  messagesView.display(messageList.getPage(skip, top, filterConfig), messageList.user);
}
showMessages();

function addMessage(msg) {
  if (messageList.add(msg)) {
    messagesView.display(messageList.getPage(), messageList.user);
  }
}
addMessage({ text: 'lalka', isPersonal: false });

function editMessage(id, msg) {
  if (messageList.edit(id, msg)) {
    messagesView.display(messageList.getPage(), messageList.user);
  }
}
editMessage('10', { text: 'edited', isPersonal: false });

function removeMessage(id) {
  if (messageList.remove(id)) {
    messagesView.display(messageList.getPage(), messageList.user);
  }
}
removeMessage('10');
