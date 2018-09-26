/*Write a
function findEven which takes an array of numbers and
returns the ones that are even in it.*/
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

var checkEven = function findEven(arr) {

    even = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] % 2 == 0) { even.push(arr[i]); }

    }
    return even;
}

console.log(checkEven(arr));