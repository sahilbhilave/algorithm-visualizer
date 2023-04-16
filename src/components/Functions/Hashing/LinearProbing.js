import { isFull } from '../basic';

function insertLinear(c, num, input, res) {
    if (!isFull()) {
        let SIZE = document.getElementById('size').innerText;
        c.innerHTML = "<p>position = " + num + " % " + SIZE + "</p> <p>position = " + (num % SIZE) + "</p>";
        let str = input(num % SIZE);

        let n = document.getElementById(str);
        if (n.innerText === '') {
            n.innerText = num;
            n.style.backgroundColor = "green";
            res.innerHTML = "<b style=\"color:green\">Element Added at Position " + num % SIZE + "</b>";
        }
        else {
            let x = num % SIZE;
            n.style.backgroundColor = "yellow";
            let count = 0
            //while (count <= 9 && n.innerText !== "" && n.innerText !== num && n.innerText !== 'x') {
            while (count <= (SIZE-1) && n.innerText !== "" && n.innerText !== 'x') {
                c.innerHTML = c.innerHTML + "<b>Collision Occured At Position " + x + "</b><p> [Next Position = (" + num + " + " + (count + 1) + ") % " + SIZE + "]</p>";
                x++;
                x = x % SIZE;
                let z = input(x);
                n = document.getElementById(z);
                count++;

            }
            if (n.innerText === "" || n.innerText === 'x') {
                c.innerHTML = c.innerHTML + "<b>Placing element at position " + x + "</b>";
                res.innerHTML = "<b style=\"color:green\" >Placing element at position " + x + "</b>";
                n.innerText = num;
                n.style.backgroundColor = "green";
            }
            // else if (n.innerText === num) {
            //     n.style.backgroundColor = "red";
            //     c.innerHTML = c.innerHTML + "<b>Element Already Present at " + x + "</b>";
            //     res.innerHTML = "<b style=\"color:red\">Element Already Present at " + x + "</b>";
            // }

        }
    }
    else {
        c.innerHTML = "<b>Table is FULL</b>";
        res.innerHTML = "<b style=\"color:red\">Table is FULL</b>";
    }
}


function findLinear(c, num, input, res) {
    let SIZE = document.getElementById('size').innerText;
    c.innerHTML = "<p>position = " + num + " % " + SIZE + "</p> <p>position = " + (num % SIZE) + "</p>";
    let str = input(num % SIZE);

    let n = document.getElementById(str);


    let x = num % SIZE;
    n.style.backgroundColor = "yellow";
    let count = 0
    while (count <= (SIZE-1) && n.innerText !== "" && n.innerText !== num) {
        c.innerHTML = c.innerHTML + "<b>Collision Occured At Position " + x + "</b><p> [Next Position = (" + num + " + " + (count + 1) + ") % " + SIZE + "]</p>";
        x++;
        x = x % SIZE;
        let z = input(x);
        n = document.getElementById(z);
        count++;
    }
    if (n.innerText === num) {
        n.style.backgroundColor = "green";
        c.innerHTML = c.innerHTML + "<b>Element Found At Position " + x + "</b>";
        res.innerHTML = "<b style=\"color:green\">Element Found At Position " + x + "</b>";
    }
    else {
        n.style.backgroundColor = "red";
        c.innerHTML = c.innerHTML + "<b>Element Not Found</b>";
        res.innerHTML = "<b style=\"color:red\">Element Not Found</b>";
    }
}

function deleteLinear(c, num, input, res) {
    let SIZE = document.getElementById('size').innerText;
    c.innerHTML = "<p>position = " + num + " % " + SIZE + "</p> <p>position = " + (num % SIZE) + "</p>";
    let str = input(num % SIZE);

    let n = document.getElementById(str);


    let x = num % SIZE;
    n.style.backgroundColor = "yellow";
    let count = 0
    while (count <= (SIZE-1) && n.innerText !== "" && n.innerText !== num) {
        c.innerHTML = c.innerHTML + "<b>Collision Occured At Position " + x + "</b><p> [Next Position = (" + num + " + " + (count + 1) + ") % " + SIZE + "]</p>";
        x++;
        x = x % SIZE;
        let z = input(x);
        n = document.getElementById(z);
        count++;
    }
    if (n.innerText === num) {
        n.style.backgroundColor = "green";
        c.innerHTML = c.innerHTML + "<b>" + num + " Deleted Successfully</b>";
        res.innerHTML = "<b style=\"color:green\">" + num + " Deleted Successfully</b>";
        n.innerText = "x";
    }
    else {
        n.style.backgroundColor = "red";
        c.innerHTML = c.innerHTML + "<b>Element Not Found</b>";
        res.innerHTML = "<b style=\"color:red\">Element Not Found</b>";
    }
}
export { insertLinear, findLinear, deleteLinear };