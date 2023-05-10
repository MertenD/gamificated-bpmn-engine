import {BpmnDiagram} from "../model/Bpmn";
import {getBadgeTypes, getChallenges, getNodeMap, getPointTypes} from "./Transformer";
import {useChallengeStore} from "../stores/challengeStore";
import {useFlowStore} from "../stores/flowStore";
import {useVariablesStore} from "../stores/variablesStore";

const resetChallengeStore = useChallengeStore.getState().resetStoreValues
const resetFlowStore = useFlowStore.getState().resetStoreValues
const resetVariableStore = useVariablesStore.getState().resetStoreValues
const setIsProcessUploaded = useFlowStore.getState().setIsProcessReady
const setVariable = useVariablesStore.getState().setVariable
const setNodeMap = useFlowStore.getState().setNodeMap
const setChallenges = useChallengeStore.getState().setChallenges

export const loadProcess = async (bpmnDiagram: BpmnDiagram) => {
    setIsProcessUploaded(false)
    if (bpmnDiagram !== undefined) {
        resetChallengeStore()
        resetFlowStore()
        resetVariableStore()
        loadNodeMapIntoStore(bpmnDiagram)
        loadChallengesIntoStore(bpmnDiagram)
        loadPointTypesIntoStore(bpmnDiagram)
        loadBadgeTypesIntoStore(bpmnDiagram)
        setIsProcessUploaded(true)
    } else {
        // TODO Meldung ausgeben
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