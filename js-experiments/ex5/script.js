// 
function Counter() {
    var count = 0;
    var start = setInterval(function() {
        count += 1;
        console.log(count);
        if (count >= 20) {
            clearTimeout(start);
        }

    }, 100)
}

Counter();