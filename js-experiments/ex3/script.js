//Write a function to search an object based on id from array
var fruits = [
    { id: 1, name: "apple", color: "red" },
    { id: 2, name: "banana", color: "yellow" }
]

function searchByFruit(fruitObj, id) {
    var fruitName = [];
    for (var i = 0; i < fruitObj.length; i++) {
        if (id === fruits[i].id) {
            fruitName.push(fruitObj[i].name);
        }

    }
    return (fruitName);
}

console.log(searchByFruit(fruits, 2));