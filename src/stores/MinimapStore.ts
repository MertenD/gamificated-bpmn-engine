import {create} from "zustand";
import {NodeMapValue} from "../components/Engine";
import {NodeType} from "../model/NodeType";
import {ActivityNodeData, ChallengeNodeData, GamificationEventNodeData} from "../model/NodeData";
import {GamificationType} from "../model/GamificationType";
import {BadgeGamificationOptions} from "../model/GamificationOptions";
import {useVariablesStore} from "./variablesStore";

// TODO Das ganze Zeug mit dem isUnlocked kann auch direkt in die NodeMap eingebaut werden

export type MinimapRFState = {
    steps: {nodeMapValue: NodeMapValue, isRewardUnlocked: boolean}[][]
    visitedNodes: NodeMapValue[]
    resetStoreValues: () => void
    addStep: (newStep: {nodeMapValue: NodeMapValue, isRewardUnlocked: boolean}[]) => void
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
    addStep: (newStep: {nodeMapValue: NodeMapValue, isRewardUnlocked: boolean}[]) => {
        set({
            steps: [...get().steps, newStep]
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
            steps: get().steps.map((step: {nodeMapValue: NodeMapValue, isRewardUnlocked: boolean}[], index) => {
                return step.map((node: {nodeMapValue: NodeMapValue, isRewardUnlocked: boolean}) => {
                    const isNodeCurrent = index === get().steps.length - 2 && get().visitedNodes[get().visitedNodes.length - 1] === node.nodeMapValue
                    console.log(isNodeCurrent)
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
            steps: get().steps.map((step: {nodeMapValue: NodeMapValue, isRewardUnlocked: boolean}[]) => {
                return step.map((node: {nodeMapValue: NodeMapValue, isRewardUnlocked: boolean}) => {
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