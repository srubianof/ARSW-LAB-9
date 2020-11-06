var bigInt = require("big-integer");
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let nth = req.body.nth
    let nth_1 = bigInt.one;
    let nth_2 = bigInt.zero;
    let answer = bigInt.zero;
    

    if (nth < 0)
        throw 'must be greater than 0'
    else {
        answer = fiboDP(nth)
    }
    context.res = {
        body: answer.toString()
    };
}
let table = {};
function fiboDP(n){  
    
    if (n in table){
        return table[n];
    }
    
    if (n === 0){
        table[n] = bigInt.zero;
        return bigInt.zero;
    }
    else if (n === 1){
        table[n] = bigInt.one;
        return bigInt.one;
    }
    else{
        table[n] = fiboDP(n-1).add(fiboDP(n-2))
    }

    return table[n];
    
}


// newman run collection.postman_collection.json -e environment.postman_environment.json & newman run collection.postman_collection.json -e environment.postman_environment.json & newman run collection.postman_collection.json -e environment.postman_environment.json & newman run collection.postman_collection.json -e environment.postman_environment.json &  newman run collection.postman_collection.json -e environment.postman_environment.json & newman run collection.postman_collection.json -e environment.postman_environment.json &  newman run collection.postman_collection.json -e environment.postman_environment.json & newman run collection.postman_collection.json -e environment.postman_environment.json &  newman run collection.postman_collection.json -e environment.postman_environment.json & newman run collection.postman_collection.json -e environment.postman_environment.json