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
        table = Array.from({length: nth+1}, (x) => bigInt.zero);
        answer = fiboDP(nth)
    }
    context.res = {
        body: answer.toString()
    };
}
let table = null;
function fiboDP(n){   
    if (n === 0){
      return bigInt.zero;
    }
    else if (n === 1){
        return bigInt.one;
    }
    else if((table[n] !== bigInt.zero)){
        return table[n];
    }
    else{
      if (table[n-1] === 0 ){
            table[n-1] = fiboDP(n-1);
      }
      if (table[n-2] === 0 ){
            table[n-2] = fiboDP(n-2);
      }
    }
    console.log(table[n-1]+(table[n-2]))
    console.log(table[n-1].add(table[n-2]));
    return table[n-1].add(table[n-2]);
    
}


// newman run collection.postman_collection.json -e environment.postman_environment.json & newman run collection.postman_collection.json -e environment.postman_environment.json & newman run collection.postman_collection.json -e environment.postman_environment.json & newman run collection.postman_collection.json -e environment.postman_environment.json &  newman run collection.postman_collection.json -e environment.postman_environment.json & newman run collection.postman_collection.json -e environment.postman_environment.json &  newman run collection.postman_collection.json -e environment.postman_environment.json & newman run collection.postman_collection.json -e environment.postman_environment.json &  newman run collection.postman_collection.json -e environment.postman_environment.json & newman run collection.postman_collection.json -e environment.postman_environment.json