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
        return;
      });

      
      if (i === arr.length - 1) {
        clearInterval(sortInterval);
        setHighlightedIndices([]);
        info.innerHTML = `<b style='color:green'>Array sorted successfully</b>`;
        setElements(arr); // update the state with sorted array
        return;
      }

      if (j === arr.length) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        content.innerText += `Swapping elements ${arr[i]} and ${arr[minIndex]}\n`;
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

      content.innerText = `Minimum element found: ${arr[minIndex]}\n`;
      content.innerText += `Comparing with element: ${arr[j]}\n`;
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
          return;
        });
        
        if (isSorted) {
          clearInterval(sortInterval);
          setHighlightedIndices([]);
          info.innerHTML = `<b style='color:green'>Array sorted successfully</b>`;
          setElements(arr); // update the state with sorted array
          return;
        }
    
        if (j === arr.length - i - 1) {
          j = 0;
          i++;
        }
    
        if (parseInt(arr[j]) > parseInt(arr[j+1])) {
          [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
          content.innerText += `Swapping elements ${arr[j]} and ${arr[j+1]}\n`;
          setHighlightedIndices([j, j+1]);
          setElements(arr); // update the state with sorted array
        }
        
        content.innerText = `Comparing elements: ${arr[j]} and ${arr[j+1]}\n`;
        setHighlightedIndices([j, j+1]);
        
        j++;
    
        if (i === arr.length-1) {
          isSorted = true;
        }
    
      }, 2000 / animationSpeed);
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
    let newElements = [...elements];
    newElements = [];
    setElements(newElements);
    setSearchValue('');
    info.innerHTML = "";
    content.innerHTML = "";

  }


  function sort()
  {
    const dfsType = document.getElementById("sortType").value;
      switch (dfsType) {
        case "selection":
            SelectionSort();
          break;
          case "bubble":
            BubbleSort();
          break;
          case "selection":
            SelectionSort();
          break;
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
            <input type="checkbox" id="toggle"></input>
            <label for="toggle">Toggle Steps</label>
            <div id="content"></div>

            <div id="info" style={{ color: 'white', padding: '20px' }}></div>


            <div id="scroll" style={{}}>
              <table className="binary-search-table" ref={tableRef}>
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
                  id = "speed"
                  type="range"
                  min="1"
                  max="10"
                  value={animationSpeed}
                  onChange={handleAnimationSpeedChange}
                  className="slider"
                />
              </div>
              <input
                type="number"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button onClick={insertElement}>Insert</button>
              <button onClick={deleteElement}>Delete</button>
              <select id="sortType">
                <option value="selection">Selection Sort</option>
                <option value="bubble">Bubble Sort</option>
                <option value="quick">Quick Sort</option>
              </select>
              <button onClick={sort}>Sort</button> 
              <button onClick={randomize}>Shuffle Elements</button>
              <button id='stop' onClick={stopSorting}>Stop Sorting</button>
              <button style={{ backgroundColor: '#393E46', color: 'white' }} onClick={clear}>Clear</button>

            </div>
          </div>
      }
    </div>
  );
}

export default Selection;
