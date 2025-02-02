
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginSignup from './pages/LoginSignup';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/my-account" element={<LoginSignup />} />
        </Routes>
    </Router>
  );
};

export default App;