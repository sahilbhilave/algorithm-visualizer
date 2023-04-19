import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Tree from './pages/TreeDraw'
import NoPage from './pages/NoPage';
import Hashing from './components/HashingComponents/HashTable'
import Graphs from './pages/Graphs'
function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/tree" element={<Tree/>} />
          <Route path="/hashing" element={<Hashing/>} />
          <Route path="/graph" element={<Graphs/>} />
          <Route path="*" element={<NoPage/>} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;