import React from 'react';
import './App.css'
// import './styles/App.css';
import MainComponent from './components/MainComponent'
// import MainComponent from './components/MainComponets';
import Navbar from './pages/Navbar';


function App() {
  return (
    <div className="App">
      <Navbar />
    <MainComponent />
    </div>
  );
}

export default App;