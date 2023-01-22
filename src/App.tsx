import React from 'react';
import './App.css';
import Engine from "./components/Engine";
import {useVariablesStore} from "./stores/variablesStore";
import ProcessUploader from "./components/controls/ProcessUploader";

function App() {

    const variables = useVariablesStore((state) => state.variables)

    return (
        <div className="App">
            <div style={{ margin: 20, height: "100vh"}}>
                <ProcessUploader />
                <Engine />
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left"
                }}>
                    { Object.keys(variables).map((name) => {
                        return <div key={name} style={{ marginTop: 10 }}>
                            { name + ": " + variables[name] }
                        </div>
                    }) }
                </div>
            </div>
        </div>
    );
}

export default App;
