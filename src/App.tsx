import React, {useState} from 'react';
import './App.css';
import Engine from "./components/Engine";
import {BadgeDialog} from "./components/info/BadgeDialog";
import Menu from "./components/menu/Menu";
import {AppBar, createTheme, IconButton, ThemeProvider, Toolbar, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useFlowStore} from "./stores/flowStore";

// TODO Bug: Wenn man direkt nach dem Start in eine Challenge startet gibt es einen Promise Fehler
// TODO Es wäre bestimmt sinnvoll bei einer Aufgabe bereits im Vorfeld anzuzeigen, welche Belohnung auf den User wartet
// TODO Anzeigen, welche Auszeichungen im Prozess freischaltbar sind

function App() {

    const [isProcessRunning, setIsProcessRunning] = useState(false)
    const processName = useFlowStore((state) => state.processName)

    return (
        <ThemeProvider theme={appTheme}>
            <div className="App">
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    margin: 20,
                    height: "100vh"
                }}>
                    { isProcessRunning ? (
                        <>
                            <AppBar position="static">
                                <Toolbar color={"#38b6ff"}>
                                    <IconButton color="inherit" onClick={() => setIsProcessRunning(false)}>
                                        <ArrowBackIcon />
                                    </IconButton>
                                    <Typography style={{ marginLeft: 10 }} variant="h5">
                                        { processName }
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <div style={{ marginBottom: 20 }} />
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
        </ThemeProvider>
    );
}

export const appTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#5271ff',
        },

    },
});

export default App;