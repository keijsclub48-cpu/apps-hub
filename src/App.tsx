import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Hub 自体は MenuPage しか持たない */}
        <Route path="/" element={<MenuPage />} />
      </Routes>
    </Router>
  );
}

export default App;