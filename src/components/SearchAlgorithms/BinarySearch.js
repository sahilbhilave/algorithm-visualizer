import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ScaleLoader from 'react-spinners/ScaleLoader';

import './css/Binary.css'

function BinarySearch() {
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

  function insertElement(event) {
    set();
    event.preventDefault();
    
    if (searchValue === '') {
      info.innerHTML = "<b style='color:red'>Please Enter Proper Number</b>";
    }
    else {
      const newElements = [...elements];
      newElements.push(searchValue);
      newElements.sort((a, b) => a - b);
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

  function searchElement() {
    set();
    if (searchValue === '') {
      info.innerHTML = "<b style='color:red'>Please Enter Proper Number</b>";

    }
    else {
      content.innerText = "";
      info.innerText = "";
      let low = 0;
      let high = elements.length - 1;

      let searchInterval = setInterval(() => {
        if (low > high) {
          clearInterval(searchInterval);
          setHighlightedIndices([]);
          content.innerText = content.innerText + `low > high \n Therefore Element Not Found`;
          info.innerHTML = "<b style='color:red'>Element Not Found</b>";
          return;
        }

        const mid = Math.floor((low + high) / 2);
        content.innerText = content.innerText + `mid = (${low} + ${high}) / 2 = ${mid}\n`;
        const currentIndices = [mid];
        setHighlightedIndices(currentIndices);

        if (parseInt(elements[mid]) === parseInt(searchValue)) {
          clearInterval(searchInterval);
          content.innerText = content.innerText + `Element Found At Index ${mid}`;

          info.innerHTML = `<b style='color:green'>Element Found At Index ${mid}</b>`;
          return;
        } else if (parseInt(elements[mid]) < parseInt(searchValue)) {
          low = mid + 1;
          content.innerText = content.innerText + `${searchValue} is larger than mid element ${elements[mid]}\n`;

        } else if (parseInt(elements[mid]) > parseInt(searchValue)) {
          high = mid - 1;
          content.innerText = content.innerText + `${searchValue} is smaller than mid element ${elements[mid]}\n`;
          content.innerText = content.innerText + "high = mid - 1 \n";
        }

        content.innerText = content.innerText + `low = ${low} high = ${high}\n`;
        content.innerText = content.innerText + "\n";

      }, 1500 / animationSpeed);
    }
  }

  function set() {
    info = document.getElementById('info');
    content = document.getElementById('content');
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
            <h1 id="head">Binary Search</h1>
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
                  type="number"
                  placeholder='Enter Key'
                  style={{ width: '80px', padding: '12px' }}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button type="submit">Insert</button>
              </form>
              <button onClick={deleteElement}>Delete</button>
              <button onClick={searchElement}>Search</button>
              <button style={{ backgroundColor: '#393E46', color: 'white' }} onClick={clear}>Clear</button>

            </div>
          </div>
      }
    </div>
  );
}

export default BinarySearch;
