import { isFull } from '../basic';

function insertChaining(c, num, input, res) {
    if (!isFull()) {
        let SIZE = document.getElementById('size').innerText;
        c.innerHTML = "<p>position = " + num + " % " + SIZE + "</p> <p>position = " + (num % SIZE) + "</p>";
        let str = input(num % SIZE);

        let n = document.getElementById(str);
        let original_pos = num % SIZE;
        let put_pos = original_pos;
        if (n.innerText === '') {
            n.innerText = num;
            n.style.backgroundColor = "green";
            res.innerHTML = "<b style=\"color:green\">Element Added at Position " + num % SIZE + "</b>";
        }
        else {
            let x = num % SIZE;
            n.style.backgroundColor = "yellow";
            let count = 0
            let chain = document.getElementById("d" + x);
            let ctr = chain.innerText;
            while (count <= (SIZE - 1) && n.innerText !== "" && n.innerText !== 'x' && n.innerText !== num) {
                if (ctr === "") {
                    c.innerHTML = c.innerHTML + "<b>Collision Occured At Position " + x + "</b><p> [Next Position = (" + num + " + " + parseInt(x) + ") % " + SIZE + "]</p>";
                    x++;
                    x = x % SIZE;
                    let z = input(x);
                    n = document.getElementById(z);
                    put_pos = x % SIZE;
                    count++;
                }
                else {

                    c.innerHTML = c.innerHTML + "<b>Collision Occured At Position " + x + "</b><p> [Next Position = " + ctr + "]</p>";

                    let z = input(parseInt(ctr));
                    n = document.getElementById(z);
                    put_pos = ctr;
                    x = ctr;
                    count++;
                    chain = document.getElementById("d" + ctr);
                    ctr = chain.innerText;
                }
            }
            if (n.innerText === "" || n.innerText === 'x') {
                c.innerHTML = c.innerHTML + "<b>Placing element at position " + x + "</b>";
                res.innerHTML = "<b style=\"color:green\" >Placing element at position " + x + "</b>";
                n.innerText = num;

                let put = document.getElementById("d" + original_pos);
                let ctr = original_pos;
                while (put.innerText !== "") {
                    ctr = put.innerText;
                    put = document.getElementById("d" + ctr);
                }

                let z = input(parseInt(ctr));
                n = document.getElementById(z);
                if(n.innerText !== num)
                {
                    put.innerText = put_pos;
                    let z = input(put_pos);
                    n = document.getElementById(z);
                    n.style.backgroundColor = "green";
                }
            }

            else if(n.innerText === num)
            {
                c.innerHTML = c.innerHTML + "<b>Element Already Present At Position " + x + "</b>";
                res.innerHTML = "<b style=\"color:red\" >Element Already Present At Position " + x + "</b>";
            }

        }
    }
    else {
        c.innerHTML = "<b>Table is FULL</b>";
        res.innerHTML = "<b style=\"color:red\">Table is FULL</b>";
    }
}



function findChaining(c, num, input, res) {
    let SIZE = document.getElementById('size').innerText;
    c.innerHTML = "<p>position = " + num + " % " + SIZE + "</p> <p>position = " + (num % SIZE) + "</p>";
    let str = input(num % SIZE);

    let n = document.getElementById(str);
    let x = num % SIZE;
    n.style.backgroundColor = "yellow";
    let count = 0
    let ctr = "";
    let chain = document.getElementById("d" + x);
    ctr = chain.innerText;
    while (count <= (SIZE - 1) && ctr !== "" && n.innerText !== num) {
        let z = input(parseInt(ctr));
        n = document.getElementById(z);

        c.innerHTML = c.innerHTML + "<b>Not Found At Position " + x + "</b><p> [Next Position = " + ctr + "]</p>";
        x = ctr;

        chain = document.getElementById("d" + ctr);
        ctr = chain.innerText;

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


function deleteChaining(c, num, input, res) {
    let SIZE = document.getElementById('size').innerText;
    c.innerHTML = "<p>position = " + num + " % " + SIZE + "</p> <p>position = " + (num % SIZE) + "</p>";
    let str = input(num % SIZE);

    let n = document.getElementById(str);


    let x = num % SIZE;
    n.style.backgroundColor = "yellow";
    let count = 0
    let ctr = "";
    let chain = document.getElementById("d" + x);
    ctr = chain.innerText;
    let prev_ctr = "";

    while (count <= (SIZE - 1) && ctr !== "" && n.innerText !== num) {
        if(ctr!=="" || n.innerText !== num)
        {
            prev_ctr = ctr;
        }
        
        let z = input(parseInt(ctr));
        n = document.getElementById(z);
        c.innerHTML = c.innerHTML + "<b>Not Found At Position " + x + "</b><p> [Next Position = " + ctr + "]</p>";
        x = ctr;
        chain = document.getElementById("d" + ctr);
        ctr = chain.innerText;
        count++;

        
    }
    if (n.innerText === num) {
        if (ctr === "") {
            n.style.backgroundColor = "green";
            c.innerHTML = c.innerHTML + "<b>" + num + " Deleted Successfully</b>";
            res.innerHTML = "<b style=\"color:green\">" + num + " Deleted Successfully</b>";
            n.innerText = "x";

            let x = parseInt(num % SIZE);
            chain = document.getElementById("d"+x);
            ctr = chain.innerText;

            console.log("prev_Ctr" + prev_ctr);
            while(ctr !== prev_ctr)
            {
                chain = document.getElementById("d"+ctr);
                ctr = chain.innerText;
            }
            chain.innerText = "";
        }
        else {
            document.getElementById("d"+prev_ctr).innerText = ctr;
            chain.innerText = "";
            n.innerText = "x";
            // while (ctr !== "") {
            //     chain.innerText = "";
            //     n.style.backgroundColor = "green";
            //     c.innerHTML = c.innerHTML + "<b>" + n.innerText + " Deleted Successfully</b>";
            //     res.innerHTML = "<b style=\"color:green\">" + num + " Deleted Successfully</b>";
            //     n.innerText = "x";

            //     chain = document.getElementById("d"+ctr);
            //     ctr = chain.innerText;
            //     let z = input(parseInt(ctr));
            //     n = document.getElementById(z);
            // }
        }

    }
    else {
        n.style.backgroundColor = "red";
        c.innerHTML = c.innerHTML + "<b>Element Not Found</b>";
        res.innerHTML = "<b style=\"color:red\">Element Not Found</b>";
    }
}


export { insertChaining, findChaining, deleteChaining };