import './css/TreeDesign.css'

import { useState, useEffect, useRef } from "react";
// eslint-disable-next-line
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ScaleLoader from "react-spinners/ScaleLoader";

function TreeNode(value) {
  this.value = value;
  this.left = null;
  this.right = null;
  this.color = '';
}

function TreeDraw() {
  let [root, setRoot] = useState(null);
  let canvasRef = useRef(null);
  let order = [];
  const [animationSpeed, setAnimationSpeed] = useState(5);


  function insertNode(node, value, info) {
    document.getElementById("info").innerHTML = "";

    if (node === null) {
      setRoot(new TreeNode(value));
      document.getElementById("info").innerHTML = `Inserting Root Element : ${value}`;
    } else if (value < node.value) {

      if (node.left === null) {
        node.left = new TreeNode(value);
        setRoot({ ...root });
        document.getElementById("info").innerHTML = `Inserting ${value} At Left of ${node.value}`;

      } else {
        // document.getElementById("info").innerHTML =  `Compare key with ${node.right.value}, Going Left`;

        insertNode(node.left, value);
      }
    } else if (value > node.value) {
      if (node.right === null) {
        node.right = new TreeNode(value);
        setRoot({ ...root });
        document.getElementById("info").innerHTML = `Inserting ${value} At Right of ${node.value}`;
      } else {
        // document.getElementById("info").innerHTML =  `Compare key with ${node.value}, Going Right`;

        insertNode(node.right, value);
      }
    }
    else if (value === node.value) {
      document.getElementById("info").innerHTML = `<b style="color:red">${value} Already Present</b>`;

    }
  }

  function deleteNode(node, value, parent = null) {
    document.getElementById("info").innerHTML = "";
    if (node === null) {
      document.getElementById("info").innerHTML = `<b style="color:red">Element Not Found!</b>`;
      return node;
    }
    if (value < node.value) {
      console.log("left");
      node.left = deleteNode(node.left, value, node);
      return node;
    } else if (value > node.value) {
      console.log("right");
      node.right = deleteNode(node.right, value, node);
      return node;
    } else {
      // Node to be deleted has been found
      if (node === root) {
        if (node.left === null && node.right === null) {
          // Node is the only node in the tree
          document.getElementById("info").innerHTML = `<b style="color:green">Root Node Deleted!</b>`;
          node = null;
          setRoot(null);
          return node;
        } else if (node.left === null) {
          // Node has only one child on the right
          node = node.right;
          setRoot(node);
          document.getElementById("info").innerHTML = `<b style="color:green">Node Deleted Successfully!</b>`;
          return node;
        } else if (node.right === null) {
          // Node has only one child on the left
          node = node.left;
          setRoot(node);
          document.getElementById("info").innerHTML = `<b style="color:green">Node Deleted Successfully!</b>`;

          return node;
        } else {
          // Node has two children
          let minRight = node.right;
          while (minRight.left !== null) {
            minRight = minRight.left;
          }
          node.value = minRight.value;
          node.right = deleteNode(node.right, minRight.value, node);
          return node;
        }
      } else {
        if (node.left === null && node.right === null) {
          // Node is a leaf node
          if (parent.left === node) {
            parent.left = null;
          } else {
            parent.right = null;
          }
          document.getElementById("info").innerHTML = `<b style="color:green">Node Deleted Successfully!</b>`;

          node = null;
          setRoot({ ...root });
          return node;
        } else if (node.left === null) {
          // Node has only one child on the right
          if (parent.left === node) {
            parent.left = node.right;
          } else {
            parent.right = node.right;
          }
          node = node.right;
          setRoot({ ...root });
          document.getElementById("info").innerHTML = `<b style="color:green">Node Deleted Successfully!</b>`;

          return node;
        } else if (node.right === null) {
          // Node has only one child on the left
          if (parent.left === node) {
            parent.left = node.left;
          } else {
            parent.right = node.left;
          }
          node = node.left;
          setRoot({ ...root });
          document.getElementById("info").innerHTML = `<b style="color:green">Node Deleted Successfully!</b>`;

          return node;
        } else {
          // Node has two children
          let minRight = node.right;
          while (minRight.left !== null) {
            minRight = minRight.left;
          }
          node.value = minRight.value;
          node.right = deleteNode(node.right, minRight.value, node);
          return node;
        }
      }
    }
  }


  function highlightNode(node, delayTime) {
    // Set the node's background color to yellow to highlight it
    node.color = 'green';
    setRoot({ ...root });

    // Wait for the specified delay time before removing the highlight
    setTimeout(() => {

      
      node.color = '';
      setRoot({ ...root });

    }, 1500/delayTime);
  }






  function inorderTraversal(node) {
    if (node !== null) {
      inorderTraversal(node.left);
      order.push(node);
      inorderTraversal(node.right);
    }
  }

  function preorderTraversal(node) {
    if (node !== null) {
      order.push(node);
      preorderTraversal(node.left);
      preorderTraversal(node.right);
    }
  }

  function postorderTraversal(node) {
    if (node !== null) {
      postorderTraversal(node.left);
      postorderTraversal(node.right);
      order.push(node);
    }
  }


  function colorNodes(displaySpeed) {
    let do_task = true;
    order.forEach((node, index) => {
      
      const ide = setTimeout(() => {

        const stopButton = document.getElementById('stop');
        stopButton.addEventListener('click', () => {
          clearTimeout(ide);
          document.getElementById('dfs').disabled = false;
          document.getElementById('bfs').disabled = false;
          document.getElementById('stop').disabled = true;
          document.getElementById('clear').disabled = false;
          do_task = false;
          return;
        });
        if(do_task === true){
          highlightNode(node, displaySpeed);
        
        document.getElementById('info').innerText = document.getElementById('info').innerText + "" + node.value;
        if(index !== order.length-1)
          document.getElementById('info').innerText = document.getElementById('info').innerText + "->";
        else if(index === order.length-1)
        {
          document.getElementById('dfs').disabled = false;
          document.getElementById('bfs').disabled = false;
          document.getElementById('clear').disabled = false;
          document.getElementById('stop').disabled = true;
        }
      }
      }, index * (1500/displaySpeed));
    });
    

  }

  function DFS() {
    if (root === null) {
      document.getElementById("info").innerHTML = '<b style="color:red">Root is Null!</b>';
    }
    else {

      document.getElementById('dfs').disabled = true;
      document.getElementById('bfs').disabled = true;
      document.getElementById('clear').disabled = true;
      document.getElementById('stop').disabled = false;

      order = [];
      const dfsType = document.getElementById("dfsType").value;
      switch (dfsType) {
        case "inorder":
          inorderTraversal(root);
          colorNodes(animationSpeed);
          document.getElementById("info").innerText = "Inorder Traversal Order\n";
          break;
          case "preorder":
          preorderTraversal(root,);
          colorNodes(animationSpeed);
          document.getElementById("info").innerText = "Preorder Traversal Order\n";
          break;
        case "postorder":
          postorderTraversal(root);
          colorNodes(animationSpeed);
          document.getElementById("info").innerText = "Postorder Traversal Order\n";

          break;
        default:
          console.log("Invalid DFS type selected");
      }


    }
  }



  function bfsTraversal(root)
  {
      order = [];

      let queue = [root];
      while (queue.length > 0) {

        let node = queue.shift();
        order.push(node);

        if (node.left !== null) {
          queue.push(node.left);
        }
        if (node.right !== null) {
          queue.push(node.right);
        }
      }

    }
  
  function BFS() {
    if (root === null) {
      document.getElementById("info").innerHTML = '<b style="color:red">Root is Null!</b>';
    }
    else {
      document.getElementById('dfs').disabled = true;
      document.getElementById('bfs').disabled = true;
      document.getElementById('clear').disabled = true;
      document.getElementById('stop').disabled = false;

      bfsTraversal(root);
      colorNodes(animationSpeed);
      document.getElementById("info").innerHTML = "BFS Traversal Order<br>";
    }
  }

  useEffect(() => {
    let canvas = canvasRef.current;
    let context = canvas.getContext("2d");
    
    canvas.width = window.innerWidth;
    canvas.height = 400;

    context.fillStyle = "#222831";
    context.fillRect(0, 0, canvas.width, canvas.height);



    if (root !== null) {
      let queue = [{ node: root, x: canvas.width / 2, y: 50 }];
      let circleRadius = 20;
      context.font = "16px Arial";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.strokeStyle = "#ffffff";

      while (queue.length > 0) {
        let { node, x, y } = queue.shift();
        let color;
        if (node.color === '')
          color = "#D65A31";
        else
          color = node.color;
        context.beginPath();
        context.arc(x, y, circleRadius, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
        context.stroke();
        context.fillStyle = "#000000";

        context.fillText(node.value, x, y);

        if (node.left !== null) {
          let leftX = (x - canvas.width / (2 ** (y / 50 + 2))) - 10;
          // let leftX = x - 70;
          let leftY = y + 70;
          queue.push({ node: node.left, x: leftX, y: leftY });
          context.beginPath();
          context.moveTo(x - 16, y + 10);
          context.lineTo(leftX, leftY);
          context.stroke();
          drawArrow(context, x - 16, y + 10, leftX, leftY, circleRadius);
        }

        if (node.right !== null) {
          let rightX = (x + canvas.width / (2 ** (y / 50 + 2))) + 20;
          // let rightX = x + 70;
          let rightY = y + 70;
          queue.push({ node: node.right, x: rightX, y: rightY });
          context.beginPath();
          context.moveTo(x + 16, y + 12);
          context.lineTo(rightX, rightY);
          context.stroke();
          drawArrow(context, x + 16, y + 12, rightX, rightY, circleRadius);
        }
      }
    }
  }, [root]);

  function handleInsert(e) {
    e.preventDefault();
    let value = parseInt(document.getElementById("Value").value);
    if (value > 0) {
      insertNode(root, value);
    }
    else {
      document.getElementById('info').innerHTML = '<b style="color:red">Enter Valid Number</b>'
    }
  }

  function handleDelete(e) {
    e.preventDefault();
    let value = parseInt(document.getElementById("Value").value);
    if (value > 0) {
      deleteNode(root, value);
    }
    else {
      document.getElementById('info').innerHTML = '<b style="color:red">Enter Valid Number</b>'
    }
  }


  function drawArrow(context, fromX, fromY, toX, toY, circleRadius) {
    const headLength = 20; // length of head in pixels
    const angle = Math.atan2(toY - fromY, toX - fromX);
    const distance = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
    const radius = circleRadius + headLength;

    if (distance > radius) {
      toX = fromX + Math.cos(angle) * radius;
      toY = fromY + Math.sin(angle) * radius;
    }

    const startX = fromX + Math.cos(angle) * circleRadius;
    const startY = fromY + Math.sin(angle) * circleRadius;

    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(toX, toY);
    context.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
    context.moveTo(toX, toY);
    context.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));

    context.stroke();
  }

  function handleAnimationSpeedChange(e) {
    setAnimationSpeed(e.target.value);
  }

  function Clear() {
    let canvas = canvasRef.current;
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    root = null;
    document.getElementById("info").innerHTML = "";
  }


  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000)
  }, [])

  return (
    <div id="tree">
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
          <div>
            <h1 id="head">Binary Search Tree</h1>
            <Link to="/home">
              <div id="nav">

                Back

              </div>
            </Link>
            <canvas width={400} height={400} className = 'canva' ref={canvasRef}></canvas>

            <div id="info"></div>
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
            <div id="buttons" className='footer'>
            
              <form onSubmit={handleInsert}>
                {/* <label htmlFor="insertValue"><b>Key : </b></label> */}
                <input type="number"
                       placeholder='Enter Key'
                       style={{ width: '80px', padding: '12px' }}

                id="Value" />
                <button type="submit">Insert</button>
              </form>
              <form onSubmit={handleDelete}>
                <button type="submit">Delete</button>
              </form>

              <br></br>
              <label htmlFor="dfsType">DFS:</label>

              <select id="dfsType">
                <option value="inorder">Inorder</option>
                <option value="preorder">Preorder</option>
                <option value="postorder">Postorder</option>
              </select>
              <button id='dfs' onClick={DFS}>DFS</button>              
              <button id='bfs' onClick={BFS}>BFS</button>
              <button id='stop' disabled>Stop</button >
              <button id="clear" onClick={Clear}>Clear</button>

            </div>
          </div>
      }
    </div>
  );
}

export default TreeDraw;