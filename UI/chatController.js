class ChatController{
    constructor(){
        this.messageList=new MessageList(JSON.parse(localStorage.getItem("messageList")));
        this.userList=new UserList(JSON.parse(localStorage.getItem("userList"))[0],JSON.parse(localStorage.getItem("userList"))[1]);
        this.activeUsersView=new ActiveUsersView('online-panel');
        this.headerView = new HeaderView('user-name');
        this.messagesView = new MessagesView('chat');
        this.personalUsersView=new PersonalUsersView("select-user-name");
        this.msgs_container=document.getElementById("chat");
        this.return_chat1=document.getElementById("return-chat1");
        this.return_chat2=document.getElementById("return-chat2");
        this.btn_signin=document.getElementById("signin");
        this.btn_registr=document.getElementById("registr");
        this.load_more=document.getElementById("loud-more");
        this.filter_author=document.getElementById("filter-author");
        this.filter_date_to=document.getElementById("filter-date-to");
        this.filter_date_from=document.getElementById("filter-date-from");
        this.filter_msg=document.getElementById("filter-msg");
        this.add_message=document.getElementById("new-message");
        this.btn_send=document.getElementById("btn-send");
        this.btn_exit=document.getElementById("btn-exit");
        this.filter_author_value=document.getElementById("filter-author").value;
        this.filter_date_to_value=document.getElementById("filter-date-to").value;
        this.filter_date_from_value=document.getElementById("filter-date-from").value;
        this.filter_msg_value=document.getElementById("filter-msg").value;
        this.select=document.getElementById("select-user-name");
        this.filter={};
        this.reset=document.getElementById("reset");
        this.target="";
        this.f_addMessage=function(){
            console.log(this);
            // const select=document.getElementById("select-user-name");
            // console.log(select.value);
            if(this.select.value==="public"){
                this.addMessage({text: this.add_message.value});
            }
            else{
                this.addMessage({text: this.add_message.value,isPersonal: true, to: this.select.value});
            }

            this.add_message.value="";
            // this.removeEventListener("click",this);
            console.log("addint");
        }
        this.f_addMessage=this.f_addMessage.bind(this);
        this.f_editMessage=function(){
            if(this.select.value==="public"){
            this.editMessage(this.target.closest(".message-item").id,{text: this.add_message.value, isPersonal: false});
            }else{
                this.editMessage(this.target.closest(".message-item").id,
                {text: this.add_message.value,isPersonal: true, to: this.select.value});
            }
            this.add_message.value="";
            console.log("edit");
            this.btn_send.removeEventListener("click",this.f_editMessage);
            this.btn_send.addEventListener("click",this.f_addMessage);
        }
        this.f_editMessage=this.f_editMessage.bind(this);
        this.f_contextmenu=function(event,obj) {
        event.preventDefault();
        this.target=event.target;
        const msg_menu=document.getElementById("msg-menu");
        if(this.target.classList.contains("your-mes")){
            const btn_delete_msg=document.getElementById("btn-delete-msg");
            const btn_edit_msg=document.getElementById("btn-edit-msg");
            msg_menu.style.top=`${event.clientY}px`;
            msg_menu.style.left=`${event.clientX}px`;
            msg_menu.style.display="flex";
            // console.log(msg_menu.style.top);
            // console.log(target.closest(".message-item").id);
            btn_delete_msg.addEventListener("click",function(){
                obj.removeMessage(obj.target.closest(".message-item").id);
                console.log(obj.target.closest(".message-item").id);
                msg_menu.style.display="none";
                // console.log("deleting");
        });
        btn_edit_msg.addEventListener("click",function(){
            msg_menu.style.display="none";
            obj.add_message.value=obj.target.innerHTML;
            obj.btn_send.removeEventListener("click", obj.f_addMessage);
            obj.btn_send.addEventListener("click",obj.f_editMessage);
        }); 
    }
        this.msgs_container.addEventListener("click",function(){
        msg_menu.style.display="none";
    })
        }
        // this.f_load_more=function(){
        //     console.log(this);
        //     this.showMessages(0,ChatController.count_messages+=10,{
        //     author: this.filter_author_value,
        //     dateFrom: this.filter_date_from_value,
        //     dateTo: this.filter_date_to_value,
        //     text: this.filter_msg_value
        //     })
        // }
        // this.load_more.addEventListener("click", this.f_load_more); 
        // this.events();
        this.events(this);
    }
    events(obj){
        // this.showAllUsers();
        document.addEventListener("load", this.showAllUsers());
        document.addEventListener("load", this.showActiveUsers());
        document.addEventListener("load", this.showMessages());
        document.addEventListener("load", this.setCurrentUser());
        this.load_more.addEventListener("click", this.f_load_more.bind(obj));   
        this.btn_signin.addEventListener("click",this.signin.bind(obj));
        this.btn_send.addEventListener("click", this.f_addMessage);
        this.msgs_container.addEventListener("contextmenu", function(event){obj.f_contextmenu.call(obj,event,obj)});
        this.btn_exit.addEventListener("click", this.exit.bind(obj));
        this.btn_registr.addEventListener("click",this.registration.bind(obj));
        this.filter_author.addEventListener("input", function() {
            obj.filter.author= obj.filter_author.value;
            obj.showMessages(0,10,obj.filter)
        });
        this.filter_date_to.addEventListener("change", function() {
            obj.filter.dateTo= obj.filter_date_to.value;
            obj.showMessages(0,10,obj.filter)
        });
        this.filter_date_from.addEventListener("change", function() {
            obj.filter.dateFrom= obj.filter_date_from.value;
            obj.showMessages(0,10,obj.filter)
        });
        this.filter_msg.addEventListener("input", function() {
            obj.filter.text= obj.filter_msg.value;
            obj.showMessages(0,10,obj.filter)
        });
        this.reset.addEventListener("click",function(){
            // const reset_form=
            document.getElementById("filter-form").reset();
            obj.showMessages();
            obj.filter_author_value="";
            obj.filter_date_to_value="";
            obj.filter_date_from_value="";
            obj.filter_msg_value=""
            obj.filter={};
            console.log("tgdb");
        })
        this.return_chat1.addEventListener("click", function(event){
            event.preventDefault();
            const frame_signin=document.querySelector(".authorization");
            frame_signin.style.display="none";
        });
        this.return_chat2.addEventListener("click", function(event){
            event.preventDefault();
            const frame_registr=document.querySelector(".registration");
            frame_registr.style.display="none";
        });
    }
    static count_messages=10;
    showActiveUsers() {
        console.log(this.userList.users);
        console.log(this)
        this.activeUsersView.display(this.userList.activeUsers);
    }
    showMessages(skip, top, filter) {
        console.log(skip,top,filter);
        console.log(this.messageList.array);
        console.log(this.messageList.getPage(skip, top, filter));
        this.messagesView.display(this.messageList.getPage(skip, top, filter), this.messageList.user);
    }
    signin(){
        const frame_signin=document.querySelector(".authorization");
        frame_signin.style.display="block";
        const form_author=document.getElementById("author-form");
        form_author[0].focus();
        form_author.addEventListener("submit",(event)=>{
            event.preventDefault();
            if(this.userList.users.find((item)=>item===form_author[0].value)){
                this.messageList.user=form_author[0].value;
                this.headerView.display(this.messageList.user);
                this.messagesView.display(this.messageList.getPage(), this.messageList.user);
                // localStorage.setItem("user",JSON.stringify(form_author[0].value));
                form_author[0].value="";
                form_author[1].value="";
                frame_signin.style.display="none";
                document.getElementById("select-user-name").disabled=false;
                document.getElementById("new-message").disabled=false;
                document.getElementById("btn-send").disabled=false;

            }
        });
        this.showMessages();
    }
    registration(){
        const frame_registr=document.querySelector(".registration");
        frame_registr.style.display="block";
        const form_registr=document.getElementById("registr-form");
        form_registr[0].focus();
        console.log(form_registr[3]);
        form_registr.addEventListener("submit",(event)=>{
            event.preventDefault();
            if(this.userList.users.find((item)=>item===form_registr[0].value)){
                const login_error=document.getElementById("login-error");
                login_error.style.display="block";
            }
            else{
                this.messageList.user=form_registr[0].value;
                // this.userList.array.push(this.messageList.user);
                console.log(this.userList.users.length);
                let arr=this.userList.users;
                arr.push(this.messageList.user);
                this.userList.users=arr;
                this.headerView.display(this.messageList.user);
                this.messagesView.display(this.messageList.getPage(), this.messageList.user);
                frame_registr.style.display="none";
                document.getElementById("select-user-name").disabled=false;
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
            console.log("add");
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
            document.getElementById("select-user-name").disabled=false;
        }
        this.messagesView.display(this.messageList.getPage(), this.messageList.user);
    }
    exit(){
        // localStorage.removeItem("user");
        this.messageList.user="";
        this.headerView.display(this.messageList.user);
        this.showMessages();
        document.getElementById("select-user-name").disabled=true;
        document.getElementById("new-message").disabled=true;
        document.getElementById("btn-send").disabled=true;
        console.log("gdr");
    }
    f_load_more(){
        console.log(this);
        this.showMessages(0,ChatController.count_messages+=10,this.filter
        //     {
        // author: this.filter_author_value,
        // dateFrom: this.filter_date_from_value,
        // dateTo: this.filter_date_to_value,
        // text: this.filter_msg_value
        // }
        )
    }
    showAllUsers(){
        this.personalUsersView.display(this.userList.users,this.messageList.user);
    }
}


function fillLocalStorage(){
    if(!JSON.parse(localStorage.getItem("messageList"))){
        localStorage.setItem("messageList",JSON.stringify(array_of_messages.map((item)=>new Message(item))));
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
// const btn_signin=document.getElementById("signin");
// const btn_registr=document.getElementById("registr");
// const load_more=document.getElementById("loud-more");
// const filter_author=document.getElementById("filter-author");
// const filter_date_to=document.getElementById("filter-date-to");
// const filter_date_from=document.getElementById("filter-date-from");
// const filter_msg=document.getElementById("filter-msg");
// const add_message=document.getElementById("new-message");
// const btn_send=document.getElementById("btn-send");
// const btn_exit=document.getElementById("btn-exit");

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

// filter_author.addEventListener("input", function() {chatController.showMessages(0,10,{author: filter_author.value})});
// filter_date_to.addEventListener("change", function() {chatController.showMessages(0,10,{dateTo: filter_date_to.value})});
// filter_date_from.addEventListener("change", function() {chatController.showMessages(0,10,{dateFrom: filter_date_from.value})});
// filter_msg.addEventListener("input", function() {chatController.showMessages(0,10,{text: filter_msg.value})});

// filter_author.addEventListener("input",chatController.showMessages(0,5,{author: filter_author.value}));
// console.log(filter_author.value);
// console.log(chatController.messageList.getPage(0,30)) ;



// load_more.addEventListener("click",function(){
//     const filter_author_value=document.getElementById("filter-author").value;
//     const filter_date_to_value=document.getElementById("filter-date-to").value;
//     const filter_date_from_value=document.getElementById("filter-date-from").value;
//     const filter_msg_value=document.getElementById("filter-msg").value;
//     chatController.showMessages(0,ChatController.count_messages+=10,{
//         author: filter_author_value,
//         dateFrom: filter_date_from_value,
//         dateTo: filter_date_to_value,
//         text: filter_msg_value
//     })
// });
// let target;






// btn_send.addEventListener("click",f_addMessage);

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
