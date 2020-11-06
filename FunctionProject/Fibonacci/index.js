var bigInt = require("big-integer");
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let nth = req.body.nth
    let nth_1 = bigInt.one;
    let nth_2 = bigInt.zero;
    let answer = bigInt.zero;

    if (nth < 0)
        throw 'must be greater than 0'
    else if (nth === 0)
        answer = nth_2
    else if (nth === 1)
        answer = nth_1
    else {
        answer = fiboDP(nth)
    }

    context.res = {
        body: answer.toString()
    };
}

function fiboDP(n){
    let table = Array.from({length: n}, (x) => 0);
    if (n <= 1){
      return n;
    }
    else{
      if (table[n-1] === 0 ){
            table[n-1] = fiboDP(n-1);
      }
      if (table[n-2] === 0 ){
            table[n-2] = fiboDP(n-2);
      }
    }
    return table[n-1] + table[n-2];
    
}


