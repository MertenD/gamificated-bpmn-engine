import React from 'react';
import './App.css';
import {onLoad} from "./util/Importer";
import BasicActivity from "./components/BasicActivity";

function App() {
  return (
    <div className="App">
        <div style={{ height: "100vh"}}>
            <input style={{ width: "100%", marginBottom: 10 }} type="file" onChange={event => onLoad(event)} />
            <BasicActivity />
        </div>
    </div>
  );
}

export default App;
