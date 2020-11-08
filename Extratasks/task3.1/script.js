let searchMaxSum = (arr) => {
let maxSum = 0;
  for (let i = 0; i < arr.length; i++) {
    let sumFixedStart = 0;
    for (let j = i; j < arr.length; j++) {
      sumFixedStart += arr[j];
      maxSum = Math.max(maxSum, sumFixedStart);
    }
  }
  return maxSum;
};

console.log(searchMaxSum([-1,5-9,10,-9,4,7,-5]));