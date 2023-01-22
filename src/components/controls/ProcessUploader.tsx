import React from "react"
import {loadBpmnDiagramFromJson} from "../../util/Importer";
import {getBadgeTypes, getNodeMap, getPointTypes} from "../../util/Transformer";
import {BpmnDiagram} from "../../model/Bpmn";
import {useVariablesStore} from "../../stores/variablesStore";
import {useFlowStore} from "../../stores/flowStore";

export default function ProcessUploader() {

    const setVariable = useVariablesStore((state) => state.setVariable)
    const clearVariables = useVariablesStore((state) => state.clearVariables)
    const setNodeMap = useFlowStore((state) => state.setNodeMap)

    const onInputFileChanged = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const bpmnDiagram = await loadBpmnDiagramFromJson(event)
        if (bpmnDiagram !== undefined) {
            clearVariables()
            loadPointTypes(bpmnDiagram)
            loadBadgeTypes(bpmnDiagram)
            setNodeMap(getNodeMap(bpmnDiagram))
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
    )
}