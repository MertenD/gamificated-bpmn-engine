import React, {useState} from 'react';
import './App.css';
import {loadBpmnDiagram} from "./util/Importer";
import Engine from "./components/Engine";
import {getBadgeTypes, getPointTypes, transformDiagramToNodeMap} from "./util/Transformer";
import {useStore} from "./store";
import {BpmnDiagram} from "./model/Bpmn";

function App() {

    const [nodeMap, setNodeMap] = useState(new Map())
    const clearVariables = useStore((state) => state.clearVariables)
    const setVariable = useStore((state) => state.setVariable)

    const onInputFileChanged = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const bpmnDiagram = await loadBpmnDiagram(event)
        if (bpmnDiagram !== undefined) {
            const nodeMap = transformDiagramToNodeMap(bpmnDiagram)
            setNodeMap(nodeMap)
            clearVariables()
            loadPointTypes(bpmnDiagram)
            loadBadgeTypes(bpmnDiagram)
        }
    }

    const loadPointTypes = (bpmnDiagram: BpmnDiagram) => {
        const pointTypes = getPointTypes(bpmnDiagram)
        pointTypes.forEach((pointType) => {
            setVariable(pointType, 0)
        })
    }

    const loadBadgeTypes = (bpmnDiagram: BpmnDiagram) => {
        const badgeTypes = getBadgeTypes(bpmnDiagram)
        badgeTypes.forEach((badgeType) => {
            setVariable(badgeType, false)
        })
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
