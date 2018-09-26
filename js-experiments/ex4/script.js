/*Create a function “transform” that applies a function transformation to each element of
input array and returns the transformed array.*/

var number = [1, 2, 3, 4, 5, 6];

function multiply(a) {
    return (a * 5);
}

function transform(collection, transFunc) {

    tranArr = [];
    for (var i = 0; i < collection.length; i++) {
        tranArr.push(transFunc(collection[i]))
    }
    return (tranArr);
}

console.log(transform(number, multiply))