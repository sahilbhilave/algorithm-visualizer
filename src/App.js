import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Tree from './pages/TreeDraw'
import NoPage from './pages/NoPage';
import Hashing from './components/HashingComponents/HashTable'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/tree" element={<Tree/>} />
          <Route path="/hashing" element={<Hashing/>} />
          <Route path="*" element={<NoPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;