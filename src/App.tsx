import React from 'react';
import './App.css';
import Engine from "./components/Engine";
import {useVariablesStore} from "./stores/variablesStore";
import ProcessUploader from "./components/controls/ProcessUploader";
import {BadgeDialog} from "./components/info/BadgeDialog";

// TODO Bug: Wenn man direkt nach dem Start in eine Challenge startet gibt es einen Promise Fehler
// TODO Es wäre bestimmt sinnvoll bei einer Aufgabe bereits im Vorfeld anzuzeigen, welche Belohnung auf den User wartet
// TODO Anzeigen, welche Auszeichungen im Prozess freischaltbar sind

function App() {

    const variables = useVariablesStore((state) => state.variables)

    return (
        <>
            <div className="App">
                <div style={{ margin: 20, height: "100vh"}}>
                    <ProcessUploader />
                    <Engine />
                    <BadgeDialog />
                    <div style={{
                        color: "white",
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                        marginTop: 100
                    }}>
                        Debug:
                        { Object.keys(variables).map((name) => {
                            return <div key={name} style={{ marginTop: 10, color: "white" }}>
                                { name + ": " + variables[name] }
                            </div>
                        }) }
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
