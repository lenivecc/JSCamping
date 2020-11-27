class ChatController{
    constructor(){
        this.messageList=new MessageList(JSON.parse(localStorage.getItem("messageList")));
        this.userList=new UserList(JSON.parse(localStorage.getItem("userList"))[0],JSON.parse(localStorage.getItem("userList"))[1]);
        this.activeUsersView=new ActiveUsersView('online-panel');
        this.headerView = new HeaderView('user-name');
        this.messagesView = new MessagesView('chat');
    }
    static count_messages=10;
    showActiveUsers() {
        console.log(this.userList.users);
        console.log(this)
        this.activeUsersView.display(this.userList.activeUsers);
    }
    showMessages(skip, top, filterConfig) {
        console.log(skip,top,filterConfig);
        this.messagesView.display(this.messageList.getPage(skip, top, filterConfig), this.messageList.user);
    }
    signin(){
        const frame_signin=document.querySelector(".authorization");
        frame_signin.style.display="block";
        const form_author=document.getElementById("author-form");
        form_author[0].focus();
        form_author.addEventListener("submit",(event)=>{
            event.preventDefault();
            if(this.userList.users.find((item)=>item===form_author[0].value)){
                this.headerView.display(form_author[0].value);
                this.messagesView.display(this.messageList.getPage(), this.messageList.user);
                frame_signin.style.display="none";
                document.getElementById("new-message").disabled=false;
                document.getElementById("btn-send").disabled=false;
                localStorage.setItem("user",JSON.stringify(form_author[0].value));
            }
        });
    }
    registration(){
        const frame_registr=document.querySelector(".registration");
        frame_registr.style.display="block";
        const form_registr=document.getElementById("registr-form");
        form_registr[0].focus();
        console.log(form_registr[3]);
        form_registr.addEventListener("submit",(event)=>{
            event.preventDefault();
            if(userList.users.find((item)=>item===form_registr[0].value)){
                const login_error=document.getElementById("login-error");
                login_error.style.display="block";
            }
            else{
                userList.users.push(form_registr[0].value);
                headerView.display(form_registr[0].value);
                messagesView.display(messageList.getPage(), messageList.user);
                frame_registr.style.display="none";
                document.getElementById("new-message").disabled=false;
                document.getElementById("btn-send").disabled=false;
            }
        });
    }
    change(){

    }
    addMessage(msg) {
        if (this.messageList.add(msg)) {
            this.messagesView.display(this.messageList.getPage(), this.messageList.user);
        }
    }
    removeMessage(id) {
        if (this.messageList.remove(id)) {
            this.messagesView.display(this.messageList.getPage(), this.messageList.user);
        }
    }
    editMessage(id, msg) {
        if (this.messageList.edit(id, msg)) {
            this.messagesView.display(this.messageList.getPage(), this.messageList.user);
        }
    }
    setCurrentUser() {
        if(this.headerView.display(this.messageList.user)){
            document.getElementById("new-message").disabled=false;
            document.getElementById("btn-send").disabled=false;  
        }
        this.messagesView.display(this.messageList.getPage(), this.messageList.user);
    }
    exit(){
        headerView.display("");
        messageList.user="";
    }
}

function fillLocalStorage(){
    if(!JSON.parse(localStorage.getItem("messageList"))){
        localStorage.setItem("messageList",JSON.stringify(array_of_messages));
            console.log(JSON.parse(localStorage.getItem("messageList")));
    }
    if(!JSON.parse(localStorage.getItem("user"))){
        localStorage.setItem("user",JSON.stringify(""));
            console.log("ff2");
    }
    if(!JSON.parse(localStorage.getItem("userList"))){
        localStorage.setItem("userList",JSON.stringify(uList));
        console.log(JSON.parse(localStorage.getItem("userList")));
    }
    console.log("ffe");
}

fillLocalStorage();
const chatController=new ChatController();
const btn_signin=document.getElementById("signin");
const btn_registr=document.getElementById("registr");
const load_more=document.getElementById("loud-more");
const filter_author=document.getElementById("filter-author");
const filter_date_to=document.getElementById("filter-date-to");
const filter_date_from=document.getElementById("filter-date-from");
const filter_msg=document.getElementById("filter-msg");
const add_message=document.getElementById("new-message");
const btn_send=document.getElementById("btn-send");
const msgs_container=document.getElementById("chat");
let flag=false;
const btn_exit=document.getElementById("btn-exit");

// document.getElementById("filter-msg").addEventListener("input",function(event){
//     console.log(document.getElementById("filter-msg").value);
//     chatController.showMessages(0,5,{text: document.getElementById("filter-msg").value})
// });

// document.getElementById("filter-author").addEventListener("input",function(event){
//     console.log(document.getElementById("filter-author").value);
//     chatController.showMessages(0,5,{author: document.getElementById("filter-author").value})
// });

// document.getElementById("filter-author").addEventListener("input",function(event){
//     console.log(document.getElementById("filter-author").value);
//     chatController.showMessages(0,5,{author: document.getElementById("filter-author").value})
// });

filter_author.addEventListener("input", function() {chatController.showMessages(0,10,{author: filter_author.value})});
filter_date_to.addEventListener("change", function() {chatController.showMessages(0,10,{dateTo: filter_date_to.value})});
filter_date_from.addEventListener("change", function() {chatController.showMessages(0,10,{dateFrom: filter_date_from.value})});
filter_msg.addEventListener("input", function() {chatController.showMessages(0,10,{text: filter_msg.value})});

// filter_author.addEventListener("input",chatController.showMessages(0,5,{author: filter_author.value}));
// console.log(filter_author.value);
// console.log(chatController.messageList.getPage(0,30)) ;
document.addEventListener("DOMContentLoaded", chatController.showActiveUsers());
document.addEventListener("DOMContentLoaded", function() {chatController.showMessages()});
document.addEventListener("DOMContentLoaded", function() {chatController.setCurrentUser()});
btn_signin.addEventListener("click",function() {chatController.signin()});
btn_registr.addEventListener("click",chatController.registration);


load_more.addEventListener("click",function(){
    const filter_author_value=document.getElementById("filter-author").value;
    const filter_date_to_value=document.getElementById("filter-date-to").value;
    const filter_date_from_value=document.getElementById("filter-date-from").value;
    const filter_msg_value=document.getElementById("filter-msg").value;
    chatController.showMessages(0,ChatController.count_messages+=10,{
        author: filter_author_value,
        dateFrom: filter_date_from_value,
        dateTo: filter_date_to_value,
        text: filter_msg_value
    })
});



msgs_container.addEventListener("contextmenu", function(event){
    event.preventDefault();
    let target=event.target;
    const msg_menu=document.getElementById("msg-menu");
    if(target.classList.contains("your-mes")){
        const btn_delete_msg=document.getElementById("btn-delete-msg");
        const btn_edit_msg=document.getElementById("btn-edit-msg");
        msg_menu.style.top=`${event.clientY}px`;
        msg_menu.style.left=`${event.clientX}px`;
        msg_menu.style.display="flex";
        // console.log(msg_menu.style.top);
        // console.log(target.closest(".message-item").id);
        btn_delete_msg.addEventListener("click",function(){
            chatController.removeMessage(target.closest(".message-item").id);
            console.log(target.closest(".message-item").id);
            msg_menu.style.display="none";
            // console.log("deleting");
        });
        btn_edit_msg.addEventListener("click",function(){
            msg_menu.style.display="none";
            add_message.value=target.innerHTML;
            // btn_send.removeEventListener("click",f_addMessage);
            // btn_send.addEventListener("click",function(){f_editMessage(target)});
            // btn_send.removeEventListener("click",f_editMessage);
            flag=true;
            btn_send.removeEventListener("click",f_addMessage);
            btn_send.addEventListener("click",function(){f_editMessage(target)});
                
                // flag=true;
                // if(flag){
                //     console.log(target.closest(".message-item").id);
                //     chatController.editMessage(target.closest(".message-item").id,{text: add_message.value});
                //     add_message.value="";
                //     console.log("edit");
                // }else{
                //     chatController.adMessage({text: add_message.value});
                //     add_message.value="";
                //     console.log("addint");
                // }

            
            // btn_send.addEventListener("click",f_addMessage,false);
            flag=false;
        });
        
    }
                // target="";
    // msgs_container.addEventListener("click",function(){
    //     msg_menu.style.display="none";
    // })
});

function f_addMessage(){
    chatController.addMessage({text: add_message.value});
    add_message.value="";
    console.log("addint");
    // btn_send.removeEventListener("click",f_addMessage);
}

function f_editMessage(targ){
        let target=targ;
        chatController.editMessage(target.closest(".message-item").id,{text: add_message.value});
        add_message.value="";
        console.log("edit");
        btn_send.removeEventListener("click",f_editMessage);
}

btn_send.addEventListener("click",f_addMessage);

// const f_editMessage=function(targ=false){
//     if(targ){
//         let target=targ;
//         chatController.editMessage(target.closest(".message-item").id,{text: add_message.value});
//         add_message.value="";
//         console.log("edit");
//     }else{
//         chatController.addMessage({text: add_message.value});
//         add_message.value="";
//         console.log("addint");
//     }

// }
// btn_send.addEventListener("click", function() {f_editMessage()});
btn_exit.addEventListener("click", chatController.exit)

// const f_addMessage=function(){
//                     if(flag){
//                     chatController.editMessage(target.closest(".message-item").id,{text: add_message.value});
//                     add_message.value="";
//                     console.log("edit");
//                 }else{
//                     chatController.addMessage({text: add_message.value});
//                     add_message.value="";
//                     console.log("addint");
//                 }
// }
// flag=false;
// btn_send.addEventListener("click",function(){f_editMessage("")});
// btn_registr.addEventListener("click", chatController.signin()) ;
