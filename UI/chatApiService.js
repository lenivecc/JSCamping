class ChatApiService{
    constructor(){
        this.totalUrl="https://jslabdb.datamola.com";
    }
    delM(url){
        return fetch(url,{
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            },
        })
        .then((response)=>{
            return  response.json();
        })
        .catch(err=>console.error(err));
    }
    putM(url,newData){
        return fetch(url,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            },
            body: JSON.stringify(newData)
        })
        .then((response)=>{
            return  response.json();
        })
        .catch(err=>console.error(err));
    }
    postM(url,data){
        return fetch(url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            },
            body: JSON.stringify(data),
        })
        .catch(err=>console.error(err));
    }
    post(url,data={}){
        return fetch(url,{
            method: "POST",
            body: data
        })
    }
    getmes(skip, top, filter={}){
        const url="https://jslabdb.datamola.com/messages";
        filter.skip=skip;
        filter.top=top;
        return fetch(`${url}?${new URLSearchParams(filter)}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        .then((response)=>{
            return response.json(); 
        })
    }
}

// HTML Programmer HTML 
// Сын маминой подруги 12345 
// Creater creater

