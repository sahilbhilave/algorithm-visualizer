

function insertHashing(c,num,input,res) {
    let SIZE = document.getElementById('size').innerText;
    c.innerHTML = "<p>position = " + num + " % "+SIZE+"</p> <p>position = " + (num % SIZE) + "</p>";
    let str = input(num % SIZE);

    let n = document.getElementById(str);
    if (n.innerText === '' || n.innerText === 'x') {
        n.innerText = num;
        n.style.backgroundColor = "green";
        res.innerHTML = "<b style=\"color:green\">Element Added at Position " + num % SIZE + "</b>";
    }
    else {
        n.style.backgroundColor = "red";
        c.innerHTML = c.innerHTML + "<b>Collision Occured At Position " + num % SIZE + "</b>";
        res.innerHTML = "<b style=\"color:red\">Collision Occured At Position " + num % SIZE + "</b>";
    }
}


function findHashing(c,num,input,res)
{
        let SIZE = document.getElementById('size').innerText;

            c.innerHTML = "<p>position = " + num + " % "+SIZE+"</p> <p>position = " + (num % SIZE) + "</p>";
            let str = input(num % SIZE);

            let n = document.getElementById(str);
            if (n.innerText === num) {
                n.style.backgroundColor = "green";
                c.innerHTML = c.innerHTML + "<b>Element found at position " + num % SIZE + "</b>";
                res.innerHTML = "<b style=\"color:green\">Element found at position " + num % SIZE + "</b>";
            }
            else {
                n.style.backgroundColor = "red";
                c.innerHTML = c.innerHTML + "<b>Element Not Found</b>";
                res.innerHTML = "<b style=\"color:red\">Element Not Found</b>";
            }
}

function deleteHashing(c,num,input,res)
{
    let SIZE = document.getElementById('size').innerText;

            c.innerHTML = "<p>position = " + num + " % "+SIZE+"</p> <p>position = " + (num % SIZE) + "</p>";
            let str = input(num % SIZE);

            let n = document.getElementById(str);
            if (n.innerText === num) {
                n.innerText = "x";
                n.style.backgroundColor = "green";
                c.innerHTML = c.innerHTML + "<b>" + num + " Deleted Successfully</b>";
                res.innerHTML = "<b style=\"color:green\">" + num + " Deleted Successfully</b>";
            }
            else {
                n.style.backgroundColor = "red";
                c.innerHTML = c.innerHTML + "<b>Element Not Found</b>";
                res.innerHTML = "<b style=\"color:red\">Element Not Found</b>";
            }
}

export{insertHashing, findHashing, deleteHashing};