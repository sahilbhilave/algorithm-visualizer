import React, { useState, useRef, useEffect } from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './css/Graph.css';

function App() {
    const [vertices, setVertices] = useState(3);
    const [edges, setEdges] = useState(3);
    const [clicked, setClicked] = useState(false);
    const [graph, setGraph] = useState([]);
    const [startVertex, setStartVertex] = useState(0);
    const [traversal, setTraversal] = useState([]);
    const canvasRef = useRef(null);
    const radius = 20; // Increase the node radius
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const width = canvas.width;
        const height = canvas.height;

        // // Set the new dimensions of the canvas
        // canvas.width = 500;
        // canvas.height = 500;

        // // Set the CSS dimensions of the canvas to the original values
        // canvas.style.width = `${width}px`;
        // canvas.style.height = `${height}px`;


        // const margin = radius * 2.5; // Increase the margin
        const margin = 10;
        // Add color array
        const colors = ["#D65A31", "#6CB1A6", "#EBD56B", "#8A357B", "#EBB76B", "#EB8B6B", "#D2AEBF", "#B1D2E6", "#DAAD6B", "#8CBED6"];
        // const colors = ["#D65A31"];
        // Generate random graph
        const graph = [];
        const usedCoords = new Set(); // Set of used coordinates
        if(clicked === true){
            for (let i = 0; i < vertices; i++) {
                let x, y;
                do {
                  x = margin + Math.random() * (width - margin * 2);
                  y = margin + Math.random() * (height - margin * 2);
                } while (usedCoords.has(`${x},${y}`) || x < margin || y < margin || x > width - margin || y > height - margin); // Check if coordinate is already used and ensure it is within the bounds of the rectangular area
                usedCoords.add(`${x},${y}`);
                graph.push({ x, y });
              }
        // Ensure minimum distance between nodes
        for (let i = 0; i < vertices; i++) {
            for (let j = 0; j < vertices; j++) {
                if (i !== j) {
                    const dx = graph[j].x - graph[i].x;
                    const dy = graph[j].y - graph[i].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < radius * 4) {
                        const offsetX = (dx / distance) * radius * 4;
                        const offsetY = (dy / distance) * radius * 4;
                        graph[j].x = graph[i].x + offsetX;
                        graph[j].y = graph[i].y + offsetY;


                        if (graph[j].x < 0) {
                            graph[j].x = 0;
                          } else if (graph[j].x > width) {
                            graph[j].x = width;
                          }
                          
                          if (graph[j].y < 0) {
                            graph[j].y = 0;
                          } else if (graph[j].y > height) {
                            graph[j].y = height;
                          }
                    }
                }
            }
        }
        for (let i = 0; i < edges; i++) {
            const source = Math.floor(Math.random() * vertices);
            let target = Math.floor(Math.random() * vertices);
            while (target === source) {
                target = Math.floor(Math.random() * vertices);
            }
            graph[source].neighbors = graph[source].neighbors || [];
            graph[source].neighbors.push(target);
            graph[target].neighbors = graph[target].neighbors || [];
            graph[target].neighbors.push(source);
        }
        setGraph(graph);

        // Draw graph
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < vertices; i++) {
            ctx.beginPath();
            ctx.arc(graph[i].x, graph[i].y, radius, 0, 2 * Math.PI);
            // Use color from array
            ctx.fillStyle = colors[i % colors.length];
            ctx.fill(); // Fill the node
            ctx.strokeStyle = "white"; // Set node stroke color
            ctx.stroke(); // Draw the node
            ctx.fillStyle = "black"; // Set text color
            ctx.font = "16px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.strokeStyle = "#ffffff";
            ctx.fillText(i, graph[i].x, graph[i].y);
            if (graph[i].neighbors) {
                for (let j = 0; j < graph[i].neighbors.length; j++) {
                    const neighbor = graph[i].neighbors[j];
                    if (i < neighbor) {
                        const dx = graph[neighbor].x - graph[i].x;
                        const dy = graph[neighbor].y - graph[i].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        // const radius = 20; // Radius of the nodes
                        const lineLength = distance - radius; // Decrease the line length with the node radius
                        const offsetX = (dx / distance) * radius;
                        const offsetY = (dy / distance) * radius;
                        const controlX = (graph[i].x + graph[neighbor].x) / 2;
                        const controlY =
                            (graph[i].y + graph[neighbor].y) / 2 - lineLength / 4;
                        ctx.beginPath();
                        ctx.moveTo(graph[i].x + offsetX, graph[i].y + offsetY);
                        ctx.quadraticCurveTo(
                            controlX,
                            controlY,
                            graph[neighbor].x - offsetX,
                            graph[neighbor].y - offsetY
                        );
                        ctx.strokeStyle = colors[i % colors.length]; // Set line color
                        ctx.lineWidth = 1.5; // Increase line width
                        ctx.stroke(); // Draw the line
                    }
                }
            }
        }
        setClicked(false);
    }
    }, [ canvasRef, clicked]);

    // Depth-first search algorithm
    const dfs = (vertex, visited) => {
        visited[vertex] = true;
        traversal.push(vertex);
        if (graph[vertex].neighbors) {
            for (let i = 0; i < graph[vertex].neighbors.length; i++) {
                const neighbor = graph[vertex].neighbors[i];
                if (!visited[neighbor]) {
                    dfs(neighbor, visited);
                }
            }
        }
    };

    // Breadth-first search algorithm
    const bfs = (vertex, visited) => {
        const queue = [];
        visited[vertex] = true;
        queue.push(vertex);
        while (queue.length > 0) {
            const current = queue.shift();
            traversal.push(current);
            if (graph[current].neighbors) {
                for (let i = 0; i < graph[current].neighbors.length; i++) {
                    const neighbor = graph[current].neighbors[i];
                    if (!visited[neighbor]) {
                        visited[neighbor] = true;
                        queue.push(neighbor);
                    }
                }
            }
        }
    };

    // Handle start vertex selection
    const handleStartVertexChange = (event) => {
        setStartVertex(parseInt(event.target.value));
    };

    // Handle DFS traversal
    const handleDFS = () => {
        const visited = Array(vertices).fill(false);
        traversal.length = 0;
        dfs(startVertex, visited);
        setTraversal([...traversal]);
    };

    // Handle BFS traversal
    const handleBFS = () => {
        const visited = Array(vertices).fill(false);
        traversal.length = 0;
        bfs(startVertex, visited);
        setTraversal([...traversal]);
    };
    const handleButtonClick = () => {
        setClicked(true);
      };
    return (
        <div className="graph">
            <h1 id="head">Graph Traversal</h1>
            <Link to="/home">
                <div id="nav">

                    Back

                </div>
            </Link>
            <canvas ref={canvasRef}  height={500} />
            <div id="info">
                Traversal: {traversal.join(", ")}
            </div>
            <div className='footer'>
                    <div>
                        <label>
                            Vertices:
                            <input
                                min="2"
                                max="10"
                                type="number"
                                value={vertices}
                                onChange={(event) => setVertices(parseInt(event.target.value))}
                            />
                        </label>
                        <label>
                            Max-Edges:
                            <input
                                min="0"
                                max="10"
                                type="number"
                                value={edges}
                                onChange={(event) => setEdges(parseInt(event.target.value))}
                            />
                        </label>
                        <button onClick={handleButtonClick}>Generate Graph</button>
                    </div>


                    <div>
                        <label>
                            Start Vertex:
                            <select value={startVertex} onChange={handleStartVertexChange}>
                                {graph.map((vertex, index) => (
                                    <option key={index} value={index}>
                                        {index}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <button onClick={handleDFS}>DFS</button>
                        <button onClick={handleBFS}>BFS</button>
                    </div>
                </div>
            </div>
            );
}

            export default App;