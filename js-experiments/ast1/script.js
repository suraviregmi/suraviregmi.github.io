/*To display the following animate on repeat in console 
 *
 **
 ***
 ****
 *****
 ******
 *****
 ****
 ***
 **
 **/
function animate() {
    var star = "*";
    flag = 1;
    var ref = setInterval(function() {
        if (flag === 1) {
            console.log(star);
            star += "*";
            if (star.length >= 6) {
                flag = 0;
            }
        }
        if (flag === 0) {
            star = star.substr(0, star.length - 1)
            console.log(star)
            if (star.length === 1) {
                flag = 1;
            }
        }
        /*clearTimeout(ref);*/
    }, 100);
}

animate()