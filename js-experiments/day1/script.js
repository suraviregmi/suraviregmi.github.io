/*function getData(callbackFn) {
    var data = { id: 1, name: "pikachu" };
    newReturn = callbackFn(data);
    return (newReturn);
}

function myFunction(d) {
    console.log("data", d);
    return 555;
}
var rValue = getData(myFunction);
console.log("return", rValue);


*/

/*function counter() {
    for (var i = 0; i < 10; i++) {
        function encData(d) {
            return function() {
                console.log(d);
            }
        }
        var cb = encData(i);
        setTimeout(cb, 1000);
    }
}
counter();*/

console.log("String methods", Object.getPrototypeOf("someString"))
console.log("Number methods", Object.getPrototypeOf(1))
console.log("Array methods", Object.getPrototypeOf([]))
console.log("Object methods", Object.getPrototypeOf({}))
console.log("Date methods", Object.getPrototypeOf(new Date()))