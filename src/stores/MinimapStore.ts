import {create} from "zustand";
import {NodeMapValue} from "../components/Engine";
import {NodeType} from "../model/NodeType";
import {ActivityNodeData, ChallengeNodeData, GamificationEventNodeData} from "../model/NodeData";
import {GamificationType} from "../model/GamificationType";
import {BadgeGamificationOptions} from "../model/GamificationOptions";
import {useVariablesStore} from "./variablesStore";

// TODO Das ganze Zeug mit dem isUnlocked kann auch direkt in die NodeMap eingebaut werden

export type StepType = {
    nodeMapValue: NodeMapValue,
    isRewardUnlocked: boolean,
    isPartOfChallenge: boolean
}

export type MinimapRFState = {
    steps: StepType[][]
    visitedNodes: NodeMapValue[]
    resetStoreValues: () => void
    addStep: (nodes: NodeMapValue[]) => void
    addVisitedNode: (newVisitedNode: NodeMapValue) => void
    setCurrentNodeRewardUnlocked: () => void
    updateBadgeUnlockedState: () => void
}

export const useMinimapStore = create<MinimapRFState>((set, get) => ({
    steps: [],
    visitedNodes: [],
    resetStoreValues: () => {
        set({
            steps: [],
            visitedNodes: []
        })
    },
    addStep: (nodes: NodeMapValue[]) => {
        set({
            steps: [...get().steps, nodes.map(node => {
                const prevStep = get().steps[get().steps.length - 1]
                let isPartOfChallenge = false

                if (prevStep !== undefined && prevStep.find(prevNode => {
                    const isVisited = get().visitedNodes.includes(prevNode.nodeMapValue)
                    const isChallengeStart = prevNode.nodeMapValue.node.nodeType === NodeType.CHALLENGE_NODE && (prevNode.nodeMapValue.node.data as ChallengeNodeData).isStart
                    const isChallengeEnd = prevNode.nodeMapValue.node.nodeType === NodeType.CHALLENGE_NODE && !(prevNode.nodeMapValue.node.data as ChallengeNodeData).isStart
                    return isVisited && !isChallengeEnd && (prevNode.isPartOfChallenge || isChallengeStart)
                })) {
                    isPartOfChallenge = true
                }

                return {
                    nodeMapValue: node,
                    isRewardUnlocked: false,
                    isPartOfChallenge: isPartOfChallenge
                } as StepType
            })]
        })
        get().updateBadgeUnlockedState()
    },
    addVisitedNode: (newVisitedNode: NodeMapValue) => {
        set({
            visitedNodes: [...get().visitedNodes, newVisitedNode]
        })
    },
    setCurrentNodeRewardUnlocked: () => {
        set({
            steps: get().steps.map((step: StepType[], index) => {
                return step.map((node: StepType) => {
                    const isNodeCurrent = index === get().steps.length - 2 && get().visitedNodes[get().visitedNodes.length - 1] === node.nodeMapValue
                    if (isNodeCurrent) {
                        return {
                            ...node,
                            isRewardUnlocked: true
                        }
                    } else {
                        return node
                    }
                })
            })
        })
    },
    updateBadgeUnlockedState: () => {
        set({
            steps: get().steps.map((step: StepType[]) => {
                return step.map((node: StepType) => {
                    let badgeType: null | string = null
                    switch (node.nodeMapValue.node.nodeType) {
                        case NodeType.ACTIVITY_NODE:
                            const activityNodeData = node.nodeMapValue.node.data as ActivityNodeData
                            if (activityNodeData.gamificationType === GamificationType.BADGES) {
                                badgeType = (activityNodeData.gamificationOptions as BadgeGamificationOptions).badgeType
                            }
                            break
                        case NodeType.CHALLENGE_NODE:
                            const challengeNodeData = node.nodeMapValue.node.data as ChallengeNodeData
                            if (challengeNodeData.rewardType === GamificationType.BADGES) {
                                badgeType = (challengeNodeData.gamificationOptions as BadgeGamificationOptions).badgeType
                            }
                            break
                        case NodeType.GAMIFICATION_EVENT_NODE:
                            const gamificationEventNodeData = node.nodeMapValue.node.data as GamificationEventNodeData
                            if (gamificationEventNodeData.gamificationType === GamificationType.BADGES) {
                                badgeType = (gamificationEventNodeData.gamificationOptions as BadgeGamificationOptions).badgeType
                            }
                    }
                    const badges = useVariablesStore.getState().getAllBadges()
                    if (badgeType !== null && badges.find(badge => badge.name === badgeType)?.isUnlocked) {
                        return {
                            ...node,
                            isRewardUnlocked: true
                        }
                    } else {
                        return node
                    }
                })
            })
        })
    }
}))