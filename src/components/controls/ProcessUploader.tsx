import React from "react"
import {NodeMap} from "../Engine";
import {loadBpmnDiagramFromJson} from "../../util/Importer";
import {getBadgeTypes, getNodeMap, getPointTypes} from "../../util/Transformer";
import {BpmnDiagram} from "../../model/Bpmn";
import {useVariablesStore} from "../../stores/variablesStore";
import {useChallengeStore} from "../../stores/challengeStore";

export interface ProcessUploaderProps {
    onProcessLoaded: (nodeMap: NodeMap) => void
}

export default function ProcessUploader(props: ProcessUploaderProps) {

    const setVariable = useVariablesStore((state) => state.setVariable)
    const clearVariables = useVariablesStore((state) => state.clearVariables)
    const challengeState = useChallengeStore((state) => state)

    const onInputFileChanged = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const bpmnDiagram = await loadBpmnDiagramFromJson(event)
        if (bpmnDiagram !== undefined) {
            clearVariables()
            loadPointTypes(bpmnDiagram)
            loadBadgeTypes(bpmnDiagram)
            props.onProcessLoaded(getNodeMap(bpmnDiagram, challengeState))
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