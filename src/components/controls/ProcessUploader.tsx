import React from "react"
import {parseBpmnDiagramFromJson} from "../../util/Importer";
import {getBadgeTypes, getChallenges, getNodeMap, getPointTypes} from "../../util/Transformer";
import {BpmnDiagram} from "../../model/Bpmn";
import {useVariablesStore} from "../../stores/variablesStore";
import {useFlowStore} from "../../stores/flowStore";
import {useChallengeStore} from "../../stores/challengeStore";

export default function ProcessUploader() {

    const setVariable = useVariablesStore((state) => state.setVariable)
    const clearVariables = useVariablesStore((state) => state.clearVariables)
    const setNodeMap = useFlowStore((state) => state.setNodeMap)
    const setChallenges = useChallengeStore((state) => state.setChallenges)

    const onInputFileChanged = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const bpmnDiagram = await parseBpmnDiagramFromJson(event)
        if (bpmnDiagram !== undefined) {
            clearVariables()
            loadNodeMapIntoStore(bpmnDiagram)
            loadChallengesIntoStore(bpmnDiagram)
            loadPointTypesIntoStore(bpmnDiagram)
            loadBadgeTypesIntoStore(bpmnDiagram)
        }
    }

    const loadNodeMapIntoStore = (bpmnDiagram: BpmnDiagram) => {
        const nodeMap = getNodeMap(bpmnDiagram)
        setNodeMap(nodeMap)
    }

    const loadChallengesIntoStore = (bpmnDiagram: BpmnDiagram) => {
        const challenges = getChallenges(bpmnDiagram)
        setChallenges(challenges)
    }

    const loadPointTypesIntoStore = (bpmnDiagram: BpmnDiagram) => {
        const pointTypes = getPointTypes(bpmnDiagram)
        pointTypes.forEach((pointType) => {
            setVariable(pointType, 0)
        })
    }

    const loadBadgeTypesIntoStore = (bpmnDiagram: BpmnDiagram) => {
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
            color: "white"
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