
function input(n) {
    if (n === 0)
        return "one";
    else if (n === 1)
        return "two";
    else if (n === 2)
        return "three";
    else if (n === 3)
        return "four";
    else if (n === 4)
        return "five";
    else if (n === 5)
        return "six";
    else if (n === 6)
        return "seven";
    else if (n === 7)
        return "eight";
    else if (n === 8)
        return "nine";
    else if (n === 9)
        return "ten";
    else if (n === 10)
        return "eleven";
    else if (n === 11)
        return "twelve";
    else if (n === 12)
        return "thirteen";
    else if (n === 13)
        return "fourteen";
    else if (n === 14)
        return "fifteen";
    else
        return "null";
}

function clearColor() {
    let SIZE = parseInt(document.getElementById('size').innerText);
    for (let i = 0; i < SIZE; i++) {
        let a = document.getElementById(input(i));
        a.style.backgroundColor = "#222831";
    }
}

function Reset() {
    // document.getElementById("dela").disabled = false;

    if(document.getElementById("title").innerText !== "Chaining"){
        hideChain();
    }
    // else if(document.getElementById("title").innerText === "Chaining")
    // {
    //     document.getElementById("dela").disabled = true;
    // }

    
   

    clearColor();
    let c = document.getElementById('calc');
    let res = document.getElementById('result');
    c.innerHTML = "";
    res.innerHTML = "";
    let SIZE = parseInt(document.getElementById('size').innerText);
    for (let i = 0; i < SIZE; i++) {
        let a = document.getElementById(input(i));
        let b = document.getElementById("d"+i);
        a.innerText = "";
        b.innerText = "";
    }
}

function hideChain(){
    let SIZE = parseInt(document.getElementById('size').innerText);
        for(let i=0;i<SIZE;i++)
        {
            document.getElementById("d"+parseInt(i)).style.display = "none";
        }
}


function showChain(){
    let SIZE = parseInt(document.getElementById('size').innerText);
        for(let i=0;i<SIZE;i++)
        {
            document.getElementById("d"+parseInt(i)).style.display = "";
        }
}

function isFull() {
    let SIZE = parseInt(document.getElementById('size').innerText);
    for (let i = 0; i < SIZE; i++) {
        let a = document.getElementById(input(i));
        if (a.innerText === '' || a.innerText === 'x') {
            return false;
        }
    }

    return true;
}

export { input, clearColor, isFull, Reset, showChain, hideChain};