class MessageList{
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
            return b.createdAt-a.createdAt;
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
