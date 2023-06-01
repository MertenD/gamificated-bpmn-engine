import {BpmnDiagram} from "../model/Bpmn";
import {getBadgeTypes, getNodeMap, getPointTypes} from "./Transformer";
import {useChallengeStore} from "../stores/challengeStore";
import {useFlowStore} from "../stores/flowStore";
import {useVariablesStore} from "../stores/variablesStore";
import {useMinimapStore} from "../stores/MinimapStore";

const resetChallengeStore = useChallengeStore.getState().resetStoreValues
const resetFlowStore = useFlowStore.getState().resetStoreValues
const resetVariableStore = useVariablesStore.getState().resetStoreValues
const resetMinimapStore = useMinimapStore.getState().resetStoreValues
const setProcessName = useFlowStore.getState().setProcessName
const setIsProcessUploaded = useFlowStore.getState().setIsProcessReady
const setVariable = useVariablesStore.getState().setVariable
const setNodeMap = useFlowStore.getState().setNodeMap

export const loadProcess = async (process: {name: string, bpmnDiagram: BpmnDiagram}) => {
    setIsProcessUploaded(false)
    if (process.bpmnDiagram !== undefined) {
        resetChallengeStore()
        resetFlowStore()
        resetVariableStore()
        resetMinimapStore()
        loadNodeMapIntoStore(process.bpmnDiagram)
        loadPointTypesIntoStore(process.bpmnDiagram)
        loadBadgeTypesIntoStore(process.bpmnDiagram)
        setProcessName(process.name)
        setIsProcessUploaded(true)
    } else {
        // TODO Meldung ausgeben
    }
}

const loadNodeMapIntoStore = (bpmnDiagram: BpmnDiagram) => {
    const nodeMap = getNodeMap(bpmnDiagram)
    setNodeMap(nodeMap)
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