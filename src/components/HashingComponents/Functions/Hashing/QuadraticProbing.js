import {isFull} from '../basic'

function insertQuadratic(c,num,input,res)
{
    if (!isFull()) {
    let SIZE = parseInt(document.getElementById('size').innerText);

    c.innerHTML = "<p>position = " + num + " % "+SIZE+"</p> <p>position = " + (num % SIZE) + "</p>";
                let str = input(num % SIZE);

                let n = document.getElementById(str);
                if (n.innerText === '') {
                    n.innerText = num;
                    n.style.backgroundColor = "green";
                    res.innerHTML = "<b style=\"color:green\">Element Added at Position " + num % SIZE + "</b>";
                }
                else {
                    let x = 0;
                    
                    n.style.backgroundColor = "#D65A31";
                    let count = 0
                    //while (count <= 6 && n.innerText !== "" && n.innerText !== num && n.innerText !== 'x') {
                    while (count <= (SIZE-1) && n.innerText !== "" && n.innerText !== 'x') {
                        
                        c.innerHTML = c.innerHTML + "<b>Collision Occured At Position " + (parseInt(num) + count * count) % SIZE + "</b><p> [Next Position = (" + num + " + " + (count + 1) + "<sup>2</sup>) % "+SIZE+"]</p>";
                        count++;
                        x = (parseInt(num) + count * count) % SIZE;
                        let z = input(x);
                        n = document.getElementById(z);
                        


                    }
                    if (n.innerText === "" || n.innerText === 'x') {
                        c.innerHTML = c.innerHTML + "<b>Placing element at position " + x + "</b>";
                        res.innerHTML = "<b style=\"color:green\" >Placing element at position " + x + "</b>";
                        n.innerText = num;
                        n.style.backgroundColor = "green";
                    }
                    else if(count >= (SIZE-1) && !isFull())
                    {
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


function findQuadratic(c,num,input,res)
{
    let SIZE = parseInt(document.getElementById('size').innerText);

    c.innerHTML = "<p>position = " + num + " % "+SIZE+"</p> <p>position = " + (num % SIZE) + "</p>";
            let str = input(num % SIZE);

            let n = document.getElementById(str);


            let x = num % SIZE;
            n.style.backgroundColor = "#D65A31";
            let count = 0
            
            while (count <= (SIZE-1) && n.innerText !== "" && n.innerText !== num) {
                c.innerHTML = c.innerHTML + "<b>Collision Occured At Position " + (parseInt(num) + count * count) % SIZE + "</b><p> [Next Position = (" + num + " + " + (count + 1) + "<sup>2</sup>) % "+SIZE+"]</p>";
                
                x = (parseInt(num) + count * count) % SIZE;
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

function deleteQuadratic(c,num,input,res)
{
    let SIZE = parseInt(document.getElementById('size').innerText);

    c.innerHTML = "<p>position = " + num + " % "+SIZE+"</p> <p>position = " + (num % SIZE) + "</p>";
    let str = input(num % SIZE);

    let n = document.getElementById(str);


    let x = num % SIZE;
    n.style.backgroundColor = "#D65A31";
    let count = 0
    
    while (count <= (SIZE-1) && n.innerText !== "" && n.innerText !== num) {
        c.innerHTML = c.innerHTML + "<b>Collision Occured At Position " + (parseInt(num) + count * count) % SIZE + "</b><p> [Next Position = (" + num + " + " + (count + 1) + "<sup>2</sup>) % "+SIZE+"]</p>";
        
        x = (parseInt(num) + count * count) % SIZE;
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

export {insertQuadratic, findQuadratic, deleteQuadratic};