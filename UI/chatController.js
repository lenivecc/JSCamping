class ChatController{
    constructor(){
        this.activeUsersView=new ActiveUsersView('online-panel');
        this.headerView = new HeaderView('user-name');
        this.messagesView = new MessagesView('chat');
        this.personalUsersView=new PersonalUsersView("select-user-name");
        this.chatApiServeci=new ChatApiService();
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
        this.token="";
        this.user=""
        this.showMessagesTimeout=null;
        this.showUsersTimeout=null;
        this.f_addMessage=function(){
            if(this.select.value==="public"){
                this.addMessage({text: this.add_message.value, author: JSON.parse(localStorage.getItem("user")),isPersonal: false});
            }
            else{
                this.addMessage({text: this.add_message.value,isPersonal: true, to: this.select.value, author: JSON.parse(localStorage.getItem("user"))});
            }
            this.add_message.value="";
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
            btn_delete_msg.addEventListener("click",function(){
                const url="https://jslabdb.datamola.com/messages/";
                console.log(obj);
                obj.chatApiServeci.delM(`${url}${obj.target.closest(".message-item").id}`)
                .then(res=>{
                    console.log(obj.target.closest(".message-item").id);
                    msg_menu.style.display="none";
                    obj.showMessages();
                });
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
        });
        }
        this.events(this);
        this.usersTimeout=null;
    }
    events(obj){
        document.addEventListener("load", this.showActiveUsers());
        document.addEventListener("load", this.showMessages(0,10));
        document.addEventListener("load", this.setCurrentUser());
        this.load_more.addEventListener("click", this.f_load_more.bind(obj));   
        this.load_more.addEventListener("contextmenu", this.f_load_more_reset.bind(obj));   
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
            const dateTo=new Date(obj.filter_date_to.value);
            console.log(dateTo);
            obj.filter.dateTo= `${dateTo.getFullYear()}${dateTo.getMonth()+1}${addZero(dateTo.getDate())}`;
            obj.showMessages(0,10,obj.filter)
        });
        function addZero(date){
            if(date.toString().length===1){
                return `0${date}`
            }
            return date;
        }
        this.filter_date_from.addEventListener("change", function() {
            const dateFrom=new Date(obj.filter_date_from.value);
            obj.filter.dateFrom= `${dateFrom.getFullYear()}${dateFrom.getMonth()+1}${addZero(dateFrom.getDate())}`;
            obj.showMessages(0,10,obj.filter)
        });
        this.filter_msg.addEventListener("input", function() {
            obj.filter.text= obj.filter_msg.value;
            obj.showMessages(0,10,obj.filter)
        });
        this.reset.addEventListener("click",function(){
            document.getElementById("filter-form").reset();
            obj.showMessages();
            obj.filter_author_value="";
            obj.filter_date_to_value="";
            obj.filter_date_from_value="";
            obj.filter_msg_value=""
            obj.filter={};
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
        if(this.showUsersTimeout) {
            clearTimeout(this.showUsersTimeout);
        }
        const url="https://jslabdb.datamola.com/users";
        fetch(url,{
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            }
        },)
        .then((response)=>{
            return response.json();
        })
        .then((result)=>{
            this.activeUsersView.display(result);
            this.personalUsersView.display(result,JSON.parse(localStorage.getItem("user")));
            this.showUsersTimeout=setTimeout(()=>{
                 this.showActiveUsers();
            },60*1000);
        });
    }
    showMessages(skip=0, top=10, filter={}) {
        if(this.showMessagesTimeout) {
            clearTimeout(this.showMessagesTimeout);
        }
        this.chatApiServeci.getmes(skip, top, filter)
        .then((result)=>{
            this.messagesView.display(result,JSON.parse(localStorage.getItem("user")));
            this.showMessagesTimeout=setTimeout(()=>{
                 this.showMessages();
            },60*1000);
        }).catch((error)=>{
            const errorr=document.querySelector(".error");
            errorr.style.display="flex";
        });
    }
    signin(){
        const frame_signin=document.querySelector(".authorization");
        frame_signin.style.display="block";
        const form_author=document.getElementById("author-form");
        form_author[0].focus();
        form_author.addEventListener("submit",(event)=>{
            event.preventDefault();
            // if(this.userList.users.find((item)=>item===form_author[0].value)){
                // this.messageList.user=form_author[0].value;
                // this.headerView.display(this.messageList.user);
                // this.messagesView.display(this.messageList.getPage(), this.messageList.user);
                // // localStorage.setItem("user",JSON.stringify(form_author[0].value));
                // form_author[0].value="";
                // form_author[1].value="";
                // frame_signin.style.display="none";
                // document.getElementById("select-user-name").disabled=false;
                // document.getElementById("new-message").disabled=false;
                // document.getElementById("btn-send").disabled=false;


                const formAuth = new FormData(form_author);
                const url="https://jslabdb.datamola.com/auth/login";
                this.chatApiServeci.post(url,formAuth)   
                .then(res=>{
                    if(res.status===200){
                        return res.json();
                    }
                    if(res.status===401){
                        const login_error=document.getElementById("login-error");
                        login_error.style.display="block";
                        setTimeout(()=>{
                           login_error.style.display="none";
                        },3*1000); 
                    }
                    else{
                        const errorr=document.querySelector(".error");
                        errorr.style.display="flex";
                    }
                }).then(data=>{
                        const form_author=document.getElementById("author-form");
                        localStorage.setItem("user",JSON.stringify(form_author[0].value));
                        localStorage.setItem("token",JSON.stringify(data.token))
                        this.headerView.display(JSON.parse(localStorage.getItem("user")));
                        this.showMessages(); 
                        form_author[0].value="";
                        form_author[1].value="";
                        frame_signin.style.display="none";
                        document.getElementById("select-user-name").disabled=false;
                        document.getElementById("new-message").disabled=false;
                        document.getElementById("btn-send").disabled=false;
                });
        });
    }
    registration(){
        const frame_registr=document.querySelector(".registration");
        frame_registr.style.display="block";
        const form_registr=document.getElementById("registr-form");
        form_registr[0].focus();
        form_registr.addEventListener("submit",(event)=>{
            event.preventDefault();
            if(form_registr[1]===form_registr[2]){
                const formReg = new FormData(form_registr);
                const url="https://jslabdb.datamola.com/auth/register";
                this.chatApiServeci.post(url,formReg)   
                .then(res=>{
                    if(res.status===200){
                        frame_registr.style.display="none";
                        this.signin();
                    }
                    if(res.status===409){
                        const reg_error=document.querySelector(".reg-error");
                        reg_error.style.display="block";
                        setTimeout(()=>{
                            reg_error.style.display="none";
                        },3*1000); 
                        
                    }
                    if((res.status>=400 && res.status<409) || res.status>409){
                        const errorr=document.querySelector(".error");
                        errorr.style.display="flex";
                    }
                })
                .catch(error=>{
                    console.log("regist failed "+error)
                });
            }
            else{
                const reg_error=document.querySelector(".reg-error-wpass");
                reg_error.style.display="block";
                setTimeout(()=>{
                    reg_error.style.display="none";
                },3*1000);
            }
            
        });       
    }
    addMessage(msg) {
        const url="https://jslabdb.datamola.com/messages";
        this.chatApiServeci.postM(url,msg)
        .then(res=>{
            if(res.status===201){
                this.showMessages();
            }else{
                document.querySelector(".error").style.display="flex"
            }
        })
    }
    removeMessage(id) {
        if (this.messageList.remove(id)) {
            this.messagesView.display(this.messageList.getPage(), this.messageList.user);
        }
    }
    editMessage(id, msg) {
        const url=`https://jslabdb.datamola.com/messages/${id}`;
        this.chatApiServeci.putM(url,msg)
        .then(()=>{
            this.showMessages();
        });
    }
    setCurrentUser() {
        if(this.headerView.display(JSON.parse(localStorage.getItem("user")))){
            document.getElementById("new-message").disabled=false;
            document.getElementById("btn-send").disabled=false;  
            document.getElementById("select-user-name").disabled=false;
        }
    }
    exit(){
        const url="https://jslabdb.datamola.com/auth/logout";
        this.chatApiServeci.postM(url)
        .then((data)=>{
            if(data.status===200){
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                this.headerView.display("");
                this.showMessages();
                document.getElementById("select-user-name").disabled=true;
                document.getElementById("new-message").disabled=true;
                document.getElementById("btn-send").disabled=true;
            }else{
                document.querySelector(".error").style.display="flex"
            }
        });  
    }
    f_load_more(){
        console.log(this);
        this.showMessages(0,ChatController.count_messages+=10,this.filter
        )
    }
    f_load_more_reset(event){
        event.preventDefault();
        ChatController.count_messages=10;
        this.showMessages(0,ChatController.count_messages,this.filter);
    }
}


const chatController=new ChatController();
