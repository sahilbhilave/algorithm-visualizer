import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { useState, useEffect, useRef } from "react";
import './css/Binary.css'

function Selection() {
  const [elements, setElements] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [highlightedIndices, setHighlightedIndices] = useState([]);
  const [animationSpeed, setAnimationSpeed] = useState(5);
  let info = document.getElementById('info');
  let content = document.getElementById('content');
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const tableRef = useRef();

  function set() {
    info = document.getElementById('info');
    content = document.getElementById('content');
  }

  function insertElement() {
    set();
    clearPanel();
    if (searchValue === '') {
      info.innerHTML = "<b style='color:red'>Please Enter Proper Number</b>";
    }
    else {
      const newElements = [...elements];
      newElements.push(searchValue);
      setElements(newElements);
      setSearchValue('');
    }
  }

  function deleteElement() {
    set();
    clearPanel();
    let newElements = [...elements];
    let index = newElements.indexOf(searchValue);
    if (searchValue === '') {
      info.innerHTML = "<b style='color:red'>Please Enter Proper Number</b>";

    }
    else {
      if (index !== -1) {
        newElements.splice(index, 1);
      }
      else {
        info.innerHTML = "<b style='color:red'>Element not present in the Array</b>";
      }
    }
    setElements(newElements);
    setSearchValue('');
  }

  function SelectionSort() {
    set();
    let currentIndex = 0;
    let minIndex = 0;

    let i = 0;
    let j = 0;
    let arr = [...elements];
    let min = arr[0];

    const sortInterval = setInterval(() => {

      const stopButton = document.getElementById('stop');
      stopButton.addEventListener('click', () => {
        clearInterval(sortInterval);
        setHighlightedIndices([]);
        document.getElementById('sort').disabled = false;
        document.getElementById('stop').disabled = true;
        document.getElementById('clear').disabled = false;
        return;
      });


      if (i === arr.length - 1) {
        clearInterval(sortInterval);
        setHighlightedIndices([]);
        info.innerHTML = `<b style='color:green'>Array sorted successfully</b>`;
        document.getElementById('sort').disabled = false;
        document.getElementById('stop').disabled = true;
        document.getElementById('clear').disabled = false;
        setElements(arr); // update the state with sorted array
        return;
      }

      if (j === arr.length) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        content.innerText += `Minimum element found in range ${i} - ${arr.length} is ${arr[minIndex]}\n`;
        info.innerText += `Swapping elements ${arr[i]} and ${arr[minIndex]}\n\n`;
        setHighlightedIndices([i]);
        i++;
        j = i;
        currentIndex = i;
        minIndex = i;
        setElements(arr); // update the state with sorted array
      }

      if (parseInt(arr[j]) < parseInt(arr[minIndex])) {
        minIndex = j;
      }

      // content.innerText += `Minimum element found: ${arr[minIndex]}\n`;
      // content.innerText += `Comparing with element: ${arr[j]}\n\n`;

      info.innerText = `Minimum element found: ${arr[minIndex]}\n`;
      info.innerText += `Comparing with element: ${arr[j]}\n`;
      setHighlightedIndices([j]);
      j++;
      currentIndex++;

    }, 2000 / animationSpeed);
  }



  function BubbleSort() {
    set();
    let i = 0;
    let j = 0;
    let arr = [...elements];
    let isSorted = false;

    const sortInterval = setInterval(() => {

      const stopButton = document.getElementById('stop');
      stopButton.addEventListener('click', () => {
        clearInterval(sortInterval);
        setHighlightedIndices([]);
        document.getElementById('sort').disabled = false;
        document.getElementById('stop').disabled = true;
        document.getElementById('clear').disabled = false;
        return;
      });

      if (isSorted) {
        clearInterval(sortInterval);
        setHighlightedIndices([]);
        info.innerHTML = `<b style='color:green'>Array sorted successfully</b>`;
        document.getElementById('sort').disabled = false;
        document.getElementById('stop').disabled = true;
        document.getElementById('clear').disabled = false;
        setElements(arr); // update the state with sorted array
        return;
      }

      if (j === arr.length - i - 1) {
        j = 0;
        i++;
      }
      info.innerText = `Comparing elements: ${arr[j]} and ${arr[j + 1]}\n`;
      if (parseInt(arr[j]) > parseInt(arr[j + 1])) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        content.innerText += `Swapping elements ${arr[j]} and ${arr[j + 1]} as ${arr[j]} is smaller\n\n`;
        info.innerText += `Swapping elements ${arr[j]} and ${arr[j + 1]} as ${arr[j]} is smaller\n\n`;
        setHighlightedIndices([j, j + 1]);
        setElements(arr); // update the state with sorted array
      }
      
      // content.innerText += `Comparing elements: ${arr[j]} and ${arr[j + 1]}\n`;
      

      setHighlightedIndices([j, j + 1]);

      j++;

      if (i === arr.length - 1) {
        isSorted = true;
      }

    }, 2000 / animationSpeed);
  }




  function QuickSort() {
    set();
    let arr = [...elements];
    let stack = [];
    let left = 0;
    let right = arr.length - 1;
    stack.push(left);
    stack.push(right);
  
    const sortInterval = setInterval(() => {
      const stopButton = document.getElementById('stop');
      stopButton.addEventListener('click', () => {
        clearInterval(sortInterval);
        setHighlightedIndices([]);
        document.getElementById('sort').disabled = false;
        document.getElementById('stop').disabled = true;
        document.getElementById('clear').disabled = false;
        return;
      });
  
      if (stack.length == 0) {
        clearInterval(sortInterval);
        setHighlightedIndices([]);
        info.innerHTML = "<b style='color:green'>Array Sorted Successfully!</b>";
        document.getElementById('sort').disabled = false;
        document.getElementById('stop').disabled = true;
        document.getElementById('clear').disabled = false;
        setElements(arr); // update the state with sorted array
        return;
      }
  
      let high = stack.pop();
      let low = stack.pop();
      let pivotIndex = partition(arr, low, high);
      if (parseInt(pivotIndex) - 1 > parseInt(low)) {
        stack.push(low);
        stack.push(pivotIndex - 1);
      }
      if (parseInt(pivotIndex) + 1 < parseInt(high)) {
        stack.push(pivotIndex + 1);
        stack.push(high);
      }
      setElements(arr);
    }, 2000 / animationSpeed);
  
    function partition(arr, low, high) {
      let pivot = arr[high];
      let i = low - 1;
      for (let j = parseInt(low); j <= parseInt(high) - 1; j++) {
        setHighlightedIndices([j, high]);
        if (parseInt(arr[j]) < parseInt(pivot)) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      setHighlightedIndices([i + 1, high]);
      return i + 1;
    }
  }
  
  





  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }


  function randomize() {
    set();
    info.innerHTML = "";
    content.innerHTML = "";
    let newElements = [...elements];
    shuffle(newElements);
    setElements(newElements);
  }

  function stopSorting() {


  }


  function clear() {
    set();
    clearInterval(intervalRef.current);
    let newElements = [...elements];
    newElements = [];
    setElements(newElements);
    setSearchValue('');
    info.innerHTML = "";
    content.innerHTML = "";
  }

  function clearPanel() {
    info.innerHTML = "";
    content.innerHTML = "";
  }


  function sort() {
    set();
    clearPanel();
    const newElements = [...elements];
    if (newElements.length > 1) {
      document.getElementById('sort').disabled = true;
      document.getElementById('clear').disabled = true;
      document.getElementById('stop').disabled = false;

      const dfsType = document.getElementById("sortType").value;
      switch (dfsType) {
        case "selection":
          SelectionSort();
          break;
        case "bubble":
          BubbleSort();
          break;
        case "selection":
          QuickSort();
          break;
      }
    }
    else {
      document.getElementById('info').innerHTML = "<b>Enter more elements to sort</b>";
    }
  }

  function handleAnimationSpeedChange(e) {
    setAnimationSpeed(e.target.value);
  }

  return (
    <div>
      {
        loading ?
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto', width: '100%', height: '100vh' }}>

            <ScaleLoader
              loading={loading}
              color={"white"}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>

          :
          <div className="binary">
            <h1 id="head">Sorting</h1>
            <Link to="/home">
              <div id="nav">

                Back

              </div>
            </Link>
            {/* <input type="checkbox" id="toggle"></input>
            <label for="toggle">Toggle Steps</label> */}
            <div style={{display:'none'}} id="content"></div>

            <div id="info" style={{ color: 'white', padding: '20px' , height:'20px'}}></div>


            <div id="scroll" style={{}}>
              <table style={{height:'100px'}} className="binary-search-table" ref={tableRef}>
                <thead>
                  <tr>
                    {elements.map((_, index) => (
                      <th key={index}>{index}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {elements.map((element, index) => (
                      <td
                        key={index}
                        style={{
                          backgroundColor: highlightedIndices.includes(index)
                            ? '#D65A31'
                            : undefined,
                        }}
                      >
                        {element}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>





            <div id="footer">
              <div className="slider-container">
                <label id="slider-label">Speed : </label>
                <input
                  id="speed"
                  type="range"
                  min="1"
                  max="10"
                  value={animationSpeed}
                  onChange={handleAnimationSpeedChange}
                  className="slider"
                />
              </div>

              <form onSubmit={insertElement}>
              <input
                id = "input"
                type="number"
                style={{width:'60px', padding:'12px'}}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button type='submit' >Insert</button>
              </form>
              <button onClick={deleteElement}>Delete</button>
              <select id="sortType">
                <option value="selection">Selection Sort</option>
                <option value="bubble">Bubble Sort</option>
                {/* <option value="quick">Quick Sort</option> */}
              </select>
              <button id='sort' onClick={sort}>Sort</button>
              <button id='stop' onClick={stopSorting} disabled>Stop</button >
              <button onClick={randomize}>Shuffle</button>
              
              <button id='clear' style={{ backgroundColor: '#393E46', color: 'white' }} onClick={clear}>Clear</button>

            </div>
          </div>
      }
    </div>
  );
}

export default Selection;
