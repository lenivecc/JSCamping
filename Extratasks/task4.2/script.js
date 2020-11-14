function add(a,b){
    if(b){
        return a+b;
    }else{
        return (b2)=>{
            return a+b2;
        };
    } 
}
function sub(a,b){
    if(b){
        return a-b;
    }else{
        return (b2)=>{
            return b2-a;
        };
    } 
}
function mul(a,b){
    if(b){
        return a*b;
    }else{
        return (b2)=>{
            return a*b2;
        };
    } 
}
function div(a,b){
    if(b){
        return a/b;
    }else{
        return (b2)=>{
            return b2/a;
        };
    } 
}
function pipe(...args){
    return (b)=>{
        let result=0;
        for(let i=0;i<args.length;i++){
            result=args[i](b);
            // console.log(result);
            b=result;
        }
        return result;
    }
}

let a = add(1,2); // 3
console.log(a);

let b = mul(a, 10); // 30
console.log(b);
let sub1 = sub(1); // sub1 отнимает от любого числа единицу
let c = sub1(b); // 29
console.log(c);

let d = mul(sub(a,1))(c); // 58
console.log(d);

let doSmth = pipe(add(d), sub(c), mul(b), div(a));
let result = doSmth(0); // (((0 + 58) - 29) * 30) / 3 = 290
console.log(result);

let x = pipe(add(1), mul(2))(3); // 8
console.log(x);

