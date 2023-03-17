import create from "zustand";
import {NextNodeKey} from "../model/NextNodeKey";
import {NodeMap, NodeMapValue} from "../components/Engine";
import {useChallengeStore} from "./challengeStore";
import {NodeType} from "../model/NodeType";
import {useVariablesStore} from "./variablesStore";

export type FlowRFState = {
    isProcessReady: boolean
    nodeMap: NodeMap
    currentNode: NodeMapValue | null
    setIsProcessReady: (isReady: boolean) => void
    setNodeMap: (nodeMap: NodeMap) => void
    getFirstNode: () => NodeMapValue | null
    setCurrentNode: (newNode: NodeMapValue | null) => void
    nextNode: (nextNodeKey?: NextNodeKey) => void
}

export const useFlowStore = create<FlowRFState>((set, get) => ({
    isProcessReady: false,
    nodeMap: new Map(),
    currentNode: null,
    setIsProcessReady: (isReady: boolean) => {
        set({
            isProcessReady: isReady
        })
    },
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
                // Everytime a new node is loaded the system will check if a challenge should start or end and will
                // evaluate its results when it ended
                useChallengeStore.getState().handleChallengeStartAndStop(newNode.node.challenge)

                if (!useVariablesStore.getState().isBadgeDialogOpen) {
                    get().setCurrentNode(newNode)
                } else {
                    const waitForDialogCloseInterval = setInterval(() => {
                        if (!useVariablesStore.getState().isBadgeDialogOpen) {
                            get().setCurrentNode(newNode)
                            clearInterval(waitForDialogCloseInterval)
                        }
                    }, 10)
                }
            }
        }
    }
}))