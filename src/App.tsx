import React, {useState} from 'react';
import './App.css';
import Engine from "./components/Engine";
import {BadgeDialog} from "./components/info/BadgeDialog";
import Menu from "./components/menu/Menu";

// TODO Bug: Wenn man direkt nach dem Start in eine Challenge startet gibt es einen Promise Fehler
// TODO Es wäre bestimmt sinnvoll bei einer Aufgabe bereits im Vorfeld anzuzeigen, welche Belohnung auf den User wartet
// TODO Anzeigen, welche Auszeichungen im Prozess freischaltbar sind

function App() {

    const [isProcessRunning, setIsProcessRunning] = useState(false)

    return (
        <>
            <div className="App">
                <div style={{ margin: 20, height: "100vh"}}>
                    { isProcessRunning ? (
                        <>
                            <div style={{
                                width: 100,
                                height: 20,
                                userSelect: "none",
                                cursor: "pointer",
                                color: "white"
                            }} onClick={() => {
                                setIsProcessRunning(false)
                            }}>
                                Back to menu
                            </div>
                            <Engine />
                            <BadgeDialog />
                        </>
                    ) : (
                        <Menu onProcessStarted={() => {
                            setIsProcessRunning(true)
                        }}/>
                    )}
                </div>
            </div>
        </>
    );
}

export default App;
