import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import UserPanel from './components/userPanel';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="panel-wrapper align-middle" style={{
        padding: "50px"
      }}><UserPanel/></div>
    </div>
  );
}

export default App;
