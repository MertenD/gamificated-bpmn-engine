import create from "zustand";
import {Comparison} from "../model/Comparison";
import {useVariablesStore, VariablesRFState} from "./variablesStore";
import {NextNodeKey} from "../model/NextNodeKey";
import {NodeMap, NodeMapValue} from "../components/Engine";
import {useChallengeStore} from "./challengeStore";
import {NodeType} from "../model/NodeType";

export type FlowRFState = {
    nodeMap: NodeMap
    currentNode: NodeMapValue | null,
    setNodeMap: (nodeMap: NodeMap) => void
    getFirstNode: () => NodeMapValue | null
    setCurrentNode: (newNode: NodeMapValue | null) => void
    nextNode: (nextNodeKey?: NextNodeKey) => void
    evaluateCondition: (variableName: string, comparison: Comparison, valueToCompare: string, variablesState: VariablesRFState) => boolean
}

export const useFlowStore = create<FlowRFState>((set, get) => ({
    nodeMap: new Map(),
    currentNode: null,
    // Sets the node map and the currentNode as the first node in the nodeMap
    setNodeMap: (nodeMap: NodeMap) => {
        set({
            nodeMap: nodeMap
        })
        get().setCurrentNode(get().getFirstNode())
    },
    setCurrentNode: (newNode: NodeMapValue | null) => {
        set({
            currentNode: newNode
        })
    },
    getFirstNode: (): NodeMapValue | null => {
        const firstNode = Array.from(get().nodeMap.values()).find(({node}) =>
            node.nodeType === NodeType.START_NODE
        );
        return firstNode || null
    },
    nextNode: (nextNodeKey: NextNodeKey = NextNodeKey.ONLY) => {
        if (!get().currentNode || get().currentNode?.next === null) {
            return
        }
        const nextNode = get().currentNode?.next
        if (nextNode !== null && nextNode !== undefined) {
            const newNode = get().nodeMap.get(nextNode[nextNodeKey])
            if (newNode) {
                get().setCurrentNode(newNode)
                useChallengeStore.getState().handleChallengeStartAndStop(newNode.node.challenge, useVariablesStore.getState())
            }
        }
    },
    // TODO ignore case
    evaluateCondition: (variableName: string, comparison: Comparison, valueToCompare: string, variablesState: VariablesRFState): boolean => {
        if (variablesState.getVariable(variableName) === undefined) {
            return false
        }

        let condition
        // When the variable is an array both the variable and the valueToCompare converted to an array should be sorted
        // before creating the condition
        if (Array.isArray(variablesState.getVariable(variableName))) {
            const sortedVariable = variablesState.getVariable(variableName).sort().toString()
            const sortedValueToCompare = valueToCompare.split(",").map(value => value.trim()).sort().toString()
            condition = "\"" + sortedVariable + "\"" + comparison.valueOf() + "\"" + sortedValueToCompare + "\""
        } else {
            if (comparison === Comparison.EQUALS || comparison === Comparison.NOT_EQUALS) {
                condition = "\"" + variablesState.getVariable(variableName) + "\"" + comparison.valueOf() + "\"" + valueToCompare + "\""
            } else {
                condition = variablesState.getVariable(variableName) + comparison.valueOf() + valueToCompare
            }
        }
        return eval(condition)
    },
}))