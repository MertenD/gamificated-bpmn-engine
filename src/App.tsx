import React, {useState} from 'react';
import './App.css';
import {loadBpmnDiagram} from "./util/Importer";
import Engine from "./components/Engine";
import {transformDiagramToNodeMap} from "./util/Transformer";
import {useStore} from "./store";

function App() {

    const [nodeMap, setNodeMap] = useState(new Map())
    const clearVariables = useStore((state) => state.clearVariables)

    const onInputFileChanged = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const bpmnDiagram = await loadBpmnDiagram(event)
        if (bpmnDiagram !== undefined) {
            const nodeMap = transformDiagramToNodeMap(bpmnDiagram)
            setNodeMap(nodeMap)
            clearVariables()
        }
    }

    return (
        <div className="App">
            <div style={{ height: "100vh"}}>
                <input
                    style={{ width: "100%", marginBottom: 10 }}
                    type="file"
                    onChange={event => onInputFileChanged((event))}
                />
                <Engine nodeMap={nodeMap}/>
            </div>
        </div>
    );
}

export default App;
