import React, { useState, useEffect } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';
import './css/Home.css';
import { motion, AnimatePresence } from 'framer-motion';
import ScaleLoader from 'react-spinners/ScaleLoader';

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const pageVariants = {
    initial: { opacity: 0, x: '-100vw' },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: '100vw' },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  return (
    <div id="home" className='home'>
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto',
            width: '100%',
            height: '100vh',
          }}
        >
          <ScaleLoader loading={loading} color={'white'} size={30} aria-label="Loading Spinner" data-testid="loader" />
        </div>
      ) : (
        <AnimatePresence mode='wait'>
          <motion.div
            className="page-container"
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={pageTransition}
          >
            <h1 id="head">Algorithm Visualizer</h1>
            <p id="title">Searching Algorithms</p>
            <div className="row">
              
              <Link to="/hashing">
                <div className="column">
                  <h2>Hashing Techniques</h2>
                  <p>Open Addressing</p>
                </div>
              </Link>
            </div>

            <p id="title">Tree Algorithms</p>
            <div className="row">
              <Link to="/tree">
                <div className="column">
                  <h2>Binary Search Tree</h2>
                  <p>Insertion/Deletion | DFS | BFS</p>
                </div>
              </Link>
            </div>

            <p id="title">Graph Algorithms</p>
            <div className="row">
              <Link to="/graph-traversal">
                <div className="column">
                  <h2>Graph Traversal</h2>
                  <p>Insertion/Deletion | DFS | BFS</p>
                </div>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default App;
