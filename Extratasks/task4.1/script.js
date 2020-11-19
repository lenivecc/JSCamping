class Node{
    constructor(value,next=null){
        this.value=value;
        this.next=next;
    }
}

class List{
    constructor(root_value){
        this.root=new Node(root_value);
        List.count++;
    }
    static count=0;
    addNode(value,i){
        if(i){
            if(i<List.count){
                let flag=0;
                let currentNode=this.root;
                while(currentNode.next){
                    flag++;
                    if(i===flag){
                        let next=currentNode.next;
                        currentNode.next=new Node(value,next);
                        List.count++;                   
                        return true;
                    }
                    currentNode=currentNode.next;
                }
            }
            return false;
        }else{
            let currentNode=this.root;
            while(currentNode.next){
                currentNode=currentNode.next;
            }
            currentNode.next=new Node(value);
            List.count++;
            return  true;
        }
    }
    removeNode(i){
        if(List.count===1){
            return false;
        }
        if(i){
            if(i>List.count){
            return false;
            }
            let flag=0;
            let currentNode=this.root;
            while(currentNode.next){
                flag++;
                if(i===flag){
                    currentNode.next=currentNode.next.next;
                    return true;
                }
                currentNode=currentNode.next;
            }
        }
        else{
            let currentNode=this.root;
            while(currentNode.next && currentNode.next.next){
                currentNode=currentNode.next;
            }
            currentNode.next=null;
        }


    }
    print(){
        let currentNode=this.root;
        let result="";
        while(currentNode.next){
            result+=`${currentNode.value}, `;
            currentNode=currentNode.next;
        }
        return result;
    }
}

let list=new List(1);
console.log(list);

list.addNode(2);
list.addNode(3);
list.addNode(4);
list.addNode(5);
list.addNode(6);

list.addNode(777,3);
list.removeNode();
list.removeNode(2);
console.log(list.print());
console.log(list);