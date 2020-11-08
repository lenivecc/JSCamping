function maxProfit(arr){
    let maxP=0;
    for(let i=0;i<arr.length;i++){
        if(arr[i]<arr[i+1]){
            maxP+=arr[i+1]-arr[i];
        }
    }
    return maxP;
}

console.log(maxProfit([7,1,5,3,6,4]));
console.log(maxProfit([7,1,3,5,6,4]));
console.log(maxProfit([7,1,3,9,2,1,3,7,5]));
console.log(maxProfit([1,2,3,4,5]));
console.log(maxProfit([7,6,4,3,1]));
console.log(maxProfit([7]));