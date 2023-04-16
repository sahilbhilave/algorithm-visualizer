import { isFull } from '../basic'

function hash1(n) {
    let SIZE = parseInt(document.getElementById('size').innerText);
    return (n % SIZE);
}

function hash2(n) {
    return (5 - (n % 5));
}

function final(count, num) {
    let SIZE = parseInt(document.getElementById('size').innerText);
    return (parseInt(hash1(num)) + count * parseInt(hash2(num))) % SIZE;
}

function insertDouble(c, num, input, res) {
    if (!isFull()) {
    let SIZE = parseInt(document.getElementById('size').innerText);

    c.innerHTML = "<p>position = " + num + " % "+SIZE+"</p> <p>position = " + (hash1(num)) + "</p>";
    let str = input(hash1(num));

    let n = document.getElementById(str);
    if (n.innerText === '') {
        n.innerText = num;
        n.style.backgroundColor = "green";
        res.innerHTML = "<b style=\"color:green\">Element Added at Position " + num % SIZE + "</b>";
    }
    else {
        let x = 0;

        n.style.backgroundColor = "yellow";
        let count = 0
        //while (count <= 9 && n.innerText !== "" && n.innerText !== num && n.innerText !== 'x') {
        while (count <= (SIZE-1) && n.innerText !== "" && n.innerText !== 'x') {
            count++;
            c.innerHTML = c.innerHTML + "<b>Collision Occured At Position " + final(count - 1, num) + "</b><p> [Next Position = (" + num + " % "+SIZE+" + " + (count + 1) + " * (5 - (" + num + " % 5))) % "+SIZE+"]</p>";
        c.innerHTML = c.innerHTML + "<p>Next Position = (" + hash1(num) + " + " + (count) + " * " + hash2(num) + ") % "+SIZE+" = " + final(count, num) + "</p>";
        x = final(count, num);
            let z = input(x);
            n = document.getElementById(z);

        }
        if (n.innerText === "" || n.innerText === 'x') {
            c.innerHTML = c.innerHTML + "<b>Placing element at position " + x + "</b>";
            res.innerHTML = "<b style=\"color:green\" >Placing element at position " + x + "</b>";
            n.innerText = num;
            n.style.backgroundColor = "green";
        }
        else if (count >= (SIZE-1) && !isFull()) {
            c.innerHTML = c.innerHTML + "<b>Table is Not FULL</b>";
            res.innerHTML = "<b style=\"color:red\">Function value cannot be hashed in current table</b>";
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

function findDouble(c, num, input, res) {
    
    let SIZE = parseInt(document.getElementById('size').innerText);

    c.innerHTML = "<p>position = " + num + " % "+SIZE+"</p> <p>position = " + (num % SIZE) + "</p>";
    let str = input(num % SIZE);

    let n = document.getElementById(str);


    let x = num % SIZE;
    n.style.backgroundColor = "yellow";
    let count = 0

    while (count <= (SIZE-1) && n.innerText !== "" && n.innerText !== num) {
        count++;
        c.innerHTML = c.innerHTML + "<b>Collision Occured At Position " + final(count - 1, num) + "</b><p> [Next Position = (" + num + " % "+SIZE+" + " + (count + 1) + " * (5 - (" + num + " % 5))) % "+SIZE+"]</p>";
        c.innerHTML = c.innerHTML + "<p>Next Position = (" + hash1(num) + " + " + (count) + " * " + hash2(num) + ") % "+SIZE+" = " + final(count, num) + "</p>";
        x = final(count, num);
        let z = input(x);
        n = document.getElementById(z);
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

function deleteDouble(c, num, input, res) {
    let SIZE = parseInt(document.getElementById('size').innerText);

    c.innerHTML = "<p>position = " + num + " % "+SIZE+"</p> <p>position = " + (num % SIZE) + "</p>";
    let str = input(num % SIZE);

    let n = document.getElementById(str);


    let x = num % SIZE;
    n.style.backgroundColor = "yellow";
    let count = 0

    while (count <= (SIZE-1) && n.innerText !== "" && n.innerText !== num) {
        count++;
        c.innerHTML = c.innerHTML + "<b>Collision Occured At Position " + final(count - 1, num) + "</b><p> [Next Position = (" + num + " % "+SIZE+" + " + (count + 1) + " * (5 - (" + num + " % 5))) % "+SIZE+"]</p>";
        c.innerHTML = c.innerHTML + "<p>Next Position = (" + hash1(num) + " + " + (count) + " * " + hash2(num) + ") % "+SIZE+" = " + final(count, num) + "</p>";
        x = final(count, num);
        let z = input(x);
        n = document.getElementById(z);
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

export { insertDouble, findDouble, deleteDouble };