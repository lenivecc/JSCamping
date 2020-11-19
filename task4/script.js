class Message{
    constructor(msg){
        this._id=msg.id;
        this._author=msg.author;
        this._createdAt=msg.createdAt;
        this.text=msg.text;
        if(msg.isPersonal){
            this.isPersonal=msg.isPersonal;
            if(msg.to){
                this.to=msg.to;
            }
        }
    }
    get id(){
        return this._id;
    }
    get author(){
        return this._author;
    }
    get createdAt(){
        return this._createdAt;
    }
    set id(id){
        this._id=id;
    }
    set author(author){
        this._author=author;
    }
    set createdAt(createdAt){
        this._createdAt=createdAt;
    }
}
export class MessageList{
    constructor(msgs){
        this._array=msgs.map(item=>new Message(item));
        this._user="User";
    }
    get user(){
        return this._user;
    }
    set user(user){
        this._user=user;
    }
    get array(){
        return this._array;
    }
    set array(array){
        this._array=array;
    }
    get user(){
        return this._user;
    }
    set user(user){
        this._user=user;
    }
    static filterObject = {
        author: (item, author)=> !author || item.author.toLowerCase().includes(author.toLowerCase()),
        text: (item, text)=> !text || item.text.toLowerCase().includes(text.toLowerCase()),
        dateTo: (item, dateTo)=> !dateTo || item.createdAt<dateTo,
        dateFrom: (item, dateFrom)=> !dateFrom || item.createdAt>dateFrom
    }; 
    getPage(skip=0,top=10,filterConfig={}){
        let result=this.array.slice();
        Object.keys(filterConfig).forEach((key)=>{
            result=result.filter((item)=>MessageList.filterObject[key](item,filterConfig[key]));
        });
        result=result.filter((item)=>{
            if(item.author===this.user || item.to===this.user || item.isPersonal===false || !item.isPersonal){
                return true;
            }
            return false;
        });
        return result.sort((a,b)=>{
            return a.createdAt-b.createdAt;
        })
        .slice(skip,skip+top);  
    }
    get(id){
        return this.array.find((item)=>item.id===id);
    }
    add(msg){
        msg.id=`${Date.now()}`;
        msg.author=this.user;
        msg.createdAt=new Date();
        if(MessageList.validate(msg)){
            let msg_for_adding=new Message(msg);
            this.array.push(msg_for_adding);
            return true;
        }
        return false;
    }
    addAll(msgs){
        msgs=msgs.map(item=>new Message(item));
        let result=[];
        for(let i in msgs){
            if(!MessageList.validate(msgs[i])){
                result.push(msgs[i]);
            }
            this.array.push(msgs[i]);
        }
        return result;
    }
    static validateObject={    
        author: (item)=>item.author,    
        text: (item)=>item.text && item.text.length<=200 && item.text.length>0,
        isPersonal: (item)=> !item.isPersonal || typeof item.isPersonal==="boolean",
        to: (item)=> !item.to || typeof item.to==="string"
    };
    static validate(msg){
        return Object.keys(MessageList.validateObject).every((key)=>MessageList.validateObject[key](msg));
    }
    edit(id, msg){
        let new_msg=new Message(this.get(id));
            if(new_msg.author===this.user){
                if(msg.text){
                    new_msg.text=msg.text;          
                }
                if(msg.isPersonal===true){
                    new_msg.isPersonal=msg.isPersonal;
                    new_msg.to=msg.to;
                }
                if(msg.isPersonal===false){
                    delete  new_msg.isPersonal;
                    delete  new_msg.to;
                }
                if(MessageList.validate(new_msg)){
                    this.array.splice(this.array.indexOf(this.get(id)),1,new_msg);
                    return true;
                }   
            }
        return false;
    }
    remove(id){
        if(this.get(id) && this.get(id).author===this.user){
            this.array.splice(this.array.indexOf(this.get(id)),1);
            return true;
        }
        return false;
    }
    clear(){
        this.array=[];
    }

}



export const array_of_messages=[

    {
    id: '8',
    createdAt: new Date('2020-10-12T23:20:00'),
    author: 'Иванов Иван',
    text: "message 1",
    isPersonal: true,
    to: "User 1"
    },
    {
    id: '9',
    createdAt: new Date('2020-10-12T23:22:00'),
    author: 'Иванов Иван',
    text: "message 2",
    isPersonal: true,
    to: "User 2"
    },
    {
    id: '10',
    createdAt: new Date('2020-10-12T23:25:00'),
    author: 'Pasha',
    text: "message 3"
    },
    {
    id: '11',
    createdAt: new Date('2020-10-12T23:30:00'),
    author: 'Иванов Иван',
    text: "message 4",
    isPersonal: true,
    to: "User 3"
    },
    {
    id: '12',
    createdAt: new Date('2020-10-12T23:33:00'),
    author: 'Иванов Иван',
    text: "message 5",
    isPersonal: false
    },
    {
    id: '13',
    createdAt: new Date('2020-10-12T23:40:00'),
    author: 'User',
    text: "dtfghjkl;",

    },
    {
    id: '14',
    createdAt: new Date('2020-10-12T23:45:00'),
    author: 'User',
    text: "dtfgrthyjyukiulytrhjkl;",
    }
]; 
export const messageList=new MessageList(array_of_messages);
// console.log(messageList.user());
// const msg1=new Message({
//     text: "test text for test"
// });
// console.log("Not valid"+messageList.addAll(array_of_messages));

messageList.add({
    text: "test text for test"
});

// console.log(messageList.getPage()); 

messageList.add({
    text: "test text for test for other user",
    isPersonal: true,
    to: "Other user"
});
// console.log(messageList.getPage()); 

// console.log(messageList.addAll(array_of_messages));


// console.log(messageList.getPage(0,10,{author: "Ив"})); 

// console.log(messageList.edit("13", {text: "edit", isPersonal: true,to:"Agent777"}));
// // console.log(messageList.getPage()); 

// // console.log(messageList.remove("13"));
// console.log(messageList.getPage()); 

// console.log(messageList.clear()); 
// console.log(messageList.getPage()); 

// console.log(messageList.user);