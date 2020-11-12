class Message{
    constructor(msg){
        this._id=`${Date.now()}`;
        this._author="User"
        this._createdAt=new Date();
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
}
// let msg=new Message({
//     text: "test text for test"
// });
// msg.id="1";

// console.log(msg);
class MessageList{
    constructor(msgs){
        this._array=msgs;
        this._user="User";
    }
    get filterObject(){
        return this.filterObject;
    }
    get validateObject(){
        return this.validateObject;
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
    getPage(skip=0,top=10,filterConfig={}){
        let filterObject={
            author: (item, author)=> !author || item.author.toLowerCase().includes(author.toLowerCase()),
            text: (item, text)=> !text || item.text.toLowerCase().includes(text.toLowerCase()),
            dateTo: (item, dateTo)=> !dateTo || item.createdAt<dateTo,
            dateFrom: (item, dateFrom)=> !dateFrom || item.createdAt>dateFrom
        };   
        let result=this.array.slice();
        Object.keys(filterConfig).forEach((key)=>{
            result=result.filter((item)=>filterObject[key](item,filterConfig[key]));
        });
        result=result.filter((item)=>{
            if(item.author===this.user || item.to===this.user || item.isPersonal===false || !item.isPersonal){
                return true;
            }
        });
        return result.sort((a,b)=>{
            return a.createdAt-b.createdAt;
        })
        .slice(skip,top);  
    }
    get(id){
        return this.array.find((item)=>{if(item.id===id){return true}});
    }
    add(msg){
        if(!MessageList.validate(msg)){
            let msg_for_adding=new Message(msg);
            this.array.push(msg_for_adding);
        }
    }
    // addAll(msgs){
    //     let result=[];
    //     for(let i in msgs){
    //         if(!MessageList.validate(msgs[i])){
    //             result.push(msgs[i]);
    //         }
    //         this.array.push(msgs[i]);
    //     }
    //     return result;
    // }
    static validate(msg){
        let validateObject={        
            text: (item)=>item.text && item.text.length<=200 && item.text.length>0,
            isPersonal: (item)=> !item.isPersonal || typeof item.isPersonal==="boolean",
            to: (item)=> !item.to || typeof item.to==="string"
        };
        return Object.keys(validateObject).every((key)=>validateObject[key](msg));
    }
    edit(id, msg){
        if(this.get(id).author===this.user){
            if(msg.text){
                this.get(id).text=msg.text;          
            }
            if(msg.isPersonal===true){
                this.get(id).isPersonal=msg.isPersonal;
                this.get(id).to=msg.to;
            }
            if(msg.isPersonal===false){
                delete this.get(id).isPersonal;
                delete this.get(id).to;
            }
            if(MessageList.validate(this.get(id))){
                return true;
            }
        }       
        return false;
    }
    remove(id){
        if(this.get(id) && this.get(id).author===user){
            this.array.splice(this.array.indexOf(this.get(id)),1);
            return true;
        }
        return false;
    }
    clear(){
        this.array=[];
    }
}



const array_of_messages=[
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
    author: 'Срегей',
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
    author: 'Иванов Иван',
    text: "",

    }
]; 
const messageList=new MessageList(array_of_messages);
// const msg1=new Message({
//     text: "test text for test"
// });
// console.log("Not valid"+messageList.addAll(array_of_messages));




messageList.add({
    text: "test text for test"
});



console.log(messageList); 
console.log(messageList.getPage()); 

messageList.add({
    text: "test text for test for other user",
    isPersonal: true,
    to: "Other user"
});

console.log(messageList.getPage()); 

// console.log(messageList.edit("", {text: "edit", isPersonal: false}));

// console.log(messageList.remove(""));


console.log(messageList.clear()); 
console.log(messageList.getPage()); 