class Message{
    constructor(msg){
        this._id=msg.id || msg._id;
        this._author=msg.author|| msg._author;
        this._createdAt=msg.createdAt|| msg._createdAt;
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