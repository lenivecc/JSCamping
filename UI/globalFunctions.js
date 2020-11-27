const headerView = new HeaderView('user-name');
const messagesView = new MessagesView('chat');
const activeUsersView = new ActiveUsersView('online-panel');
const userList = new UserList(['Dima', 'Zhenya Zh.', 'Zhenya H.', 'Sasha', 'Pasha'], ['Dima', 'Zhenya Zh.']);



function setCurrentUser(user) {
  headerView.display(user);
  messagesView.display(messageList.getPage(skip, top, filterConfig), messageList.user);
}
function showActiveUsers() {
  activeUsersView.display(userList.activeUsers);
}

function showMessages(skip, top, filterConfig) {
  messagesView.display(messageList.getPage(skip, top, filterConfig), messageList.user);
}
function addMessage(msg) {
  if (messageList.add(msg)) {
    messagesView.display(messageList.getPage(), messageList.user);
  }
}
function editMessage(id, msg) {
  if (messageList.edit(id, msg)) {
    messagesView.display(messageList.getPage(), messageList.user);
  }
}
function removeMessage(id) {
  if (messageList.remove(id)) {
    messagesView.display(messageList.getPage(), messageList.user);
  }
}



// setCurrentUser('Pasha');
// setCurrentUser("");
// showActiveUsers();
// showMessages(0,20);
// addMessage({ text: 'lalka', isPersonal: false });
// showMessages(0,20);
// // addMessage({ text: 'lalka', isPersonal: false });
// // addMessage({ text: 'lalka', isPersonal: false });
// // console.log(messageList.getPage(0,20));
// // showMessages(0,20);
// editMessage('10', { text: 'edited', isPersonal: false });
// showMessages(0,20);
// // console.log(messageList.getPage(0,20));
// removeMessage('10');
// showMessages(0,20);


