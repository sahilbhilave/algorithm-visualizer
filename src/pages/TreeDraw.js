import './css/TreeDesign.css'

import { useState, useEffect, useRef } from "react";
// eslint-disable-next-line
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ScaleLoader from "react-spinners/ScaleLoader";

function TreeNode(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

function TreeDraw() {
  let [root, setRoot] = useState(null);
  let canvasRef = useRef(null);
  let visitOrder = [];

  function insertNode(node, value, info) {
    document.getElementById("info").innerHTML = "";

    if (node === null) {
      setRoot(new TreeNode(value));
      document.getElementById("info").innerHTML = `<br>Inserting Root Element : ${value}`;
    } else if (value < node.value) {

      if (node.left === null) {
        node.left = new TreeNode(value);
        setRoot({ ...root });
        document.getElementById("info").innerHTML = `<br>Inserting ${value} At Left of ${node.value}`;

      } else {
        // document.getElementById("info").innerHTML =  `<br>Compare key with ${node.right.value}, Going Left`;

        insertNode(node.left, value);
      }
    } else if (value > node.value) {
      if (node.right === null) {
        node.right = new TreeNode(value);
        setRoot({ ...root });
        document.getElementById("info").innerHTML = `<br>Inserting ${value} At Right of ${node.value}`;
      } else {
        // document.getElementById("info").innerHTML =  `<br>Compare key with ${node.value}, Going Right`;

        insertNode(node.right, value);
      }
    }
    else if (value === node.value) {
      document.getElementById("info").innerHTML = `<br><b style="color:red">${value} Already Present</b>`;

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


  function inorderTraversal(node) {
    if (node !== null) {
      inorderTraversal(node.left);
      visitOrder.push(node.value);
      inorderTraversal(node.right);
    }
  }

  function DFS() {
    if (root === null) {
      document.getElementById("info").innerHTML = '<b style="color:red">Root is Null!</b>';
    }
    else {
      visitOrder = [];
      inorderTraversal(root);
      document.getElementById("info").innerHTML = `<br>DFS traversal order: ${visitOrder}`;
    }
  }

  function BFS() {
    if (root === null) {
      document.getElementById("info").innerHTML = '<b style="color:red">Root is Null!</b>';
    }
    else {
      visitOrder = [];
      let queue = [root];
      while (queue.length > 0) {
        let node = queue.shift();
        visitOrder.push(node.value);
        if (node.left !== null) {
          queue.push(node.left);
        }
        if (node.right !== null) {
          queue.push(node.right);
        }
      }
      document.getElementById("info").innerHTML = `<br>BFS traversal order: ${visitOrder}`;
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
        let color = "#D65A31";
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
            <canvas ref={canvasRef}></canvas>

            <div id="info"></div>

            <div id="buttons" className='footer'>
              <form onSubmit={handleInsert}>
                <label htmlFor="insertValue"><b>Key : </b></label>
                <input type="number" id="Value" />
                <button type="submit">Insert</button>
              </form>
              <form onSubmit={handleDelete}>
                <button type="submit">Delete</button>
              </form>

              <button onClick={DFS}>DFS</button>
              <button onClick={BFS}>BFS</button>
              <button id="clear" onClick={Clear}>Clear</button>

            </div>
          </div>
      }
    </div>
  );
}

export default TreeDraw;