import React, {useState} from 'react';
import './App.css';
import {loadBpmnDiagram} from "./util/Importer";
import Engine from "./components/Engine";
import {getBadgeTypes, getPointTypes, transformDiagramToNodeMap} from "./util/Transformer";
import {useStore} from "./store";
import {BpmnDiagram} from "./model/Bpmn";

function App() {

    const [nodeMap, setNodeMap] = useState(new Map())
    const variables = useStore((state) => state.variables)
    const setVariable = useStore((state) => state.setVariable)
    const clearVariables = useStore((state) => state.clearVariables)

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
            <div style={{ margin: 20, height: "100vh"}}>
                <span style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                }}>
                    Upload process:
                    <input
                        style={{ marginBottom: 10, marginLeft: 10 }}
                        type="file"
                        onChange={event => onInputFileChanged((event))}
                    />
                </span>
                <Engine nodeMap={nodeMap}/>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left"
                }}>
                    { Object.keys(variables).map((name) => {
                        return <div style={{ marginTop: 10 }}>
                            { name + ": " + variables[name] }
                        </div>
                    }) }
                </div>
            </div>
        </div>
    );
}

export default App;
