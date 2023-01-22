import {BpmnNode} from "../model/Bpmn";
import {ChallengeNodeData} from "../model/NodeData";
import create from "zustand";
import {GamificationType} from "../model/GamificationType";
import {BadgeGamificationOptions, PointsGamificationOptions} from "../model/GamificationOptions";
import {useVariablesStore} from "./variablesStore";

export type ChallengeRFState = {
    challenges: BpmnNode[]
    isChallengeRunning: boolean
    runningChallengeData: ChallengeNodeData | null
    startMillis: number | null
    addChallenge: (challenge: BpmnNode) => void
    setChallenges: (challenges: BpmnNode[]) => void
    getChallengeData: (id: string) => ChallengeNodeData | null
    handleChallengeStartAndStop: (challengeId: string | undefined) => void
    startChallenge: (challengeId: string) => void
    stopChallenge: () => void
}

export const useChallengeStore = create<ChallengeRFState>((set, get) => ({
    challenges: [],
    isChallengeRunning: false,
    runningChallengeData: null,
    startMillis: null,
    addChallenge: (challenge: BpmnNode) => {
        set({
            challenges: [...get().challenges, challenge]
        })
    },
    setChallenges: (challenges: BpmnNode[]) => {
        set({
            challenges: challenges
        })
    },
    getChallengeData: (id: string): ChallengeNodeData | null => {
        return get().challenges.find((challenge) => challenge.id === id)?.data as ChallengeNodeData || null
    },
    handleChallengeStartAndStop: (challengeId: string | undefined) => {
        const isChallenge = challengeId !== undefined
        if (challengeId !== undefined && !get().isChallengeRunning) {
            get().startChallenge(challengeId)
        } else if (!isChallenge && get().isChallengeRunning) {
            get().stopChallenge()
        }
    },
    startChallenge: (id: string) => {
        set({
            isChallengeRunning: true,
            runningChallengeData: get().getChallengeData(id),
            startMillis: Date.now()
        })
    },
    stopChallenge: () => {
        const variablesState = useVariablesStore.getState()

        const deltaTimeInSeconds = (Date.now() - (get().startMillis || 0)) / 1000
        const challengeData = get().runningChallengeData

        if (challengeData !== null && deltaTimeInSeconds <= challengeData.secondsToComplete) {
            if (get().runningChallengeData?.rewardType === GamificationType.POINTS) {
                const gamificationOptions = get().runningChallengeData?.gamificationOptions as PointsGamificationOptions
                variablesState.addToVariable(gamificationOptions.pointType, gamificationOptions.pointsForSuccess)
            } else if (get().runningChallengeData?.rewardType === GamificationType.BADGES) {
                variablesState.setVariable((get().runningChallengeData?.gamificationOptions as BadgeGamificationOptions).badgeType, true)
            }
        } else {
            console.log("Challenge failed")
        }

        set({
            isChallengeRunning: false,
            runningChallengeData: null,
            startMillis: null
        })
    }
}))