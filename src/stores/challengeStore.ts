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
    remainingSeconds: number | null
    isChallengeFailed: boolean
    addChallenge: (challenge: BpmnNode) => void
    setChallenges: (challenges: BpmnNode[]) => void
    getChallengeData: (id: string) => ChallengeNodeData | null
    handleChallengeStartAndStop: (challengeId: string | undefined) => void
    startChallenge: (challengeId: string) => void
    stopChallenge: () => void
    startUpdateChallengeStateInterval: () => void
}

export const useChallengeStore = create<ChallengeRFState>((set, get) => ({
    challenges: [],
    isChallengeRunning: false,
    runningChallengeData: null,
    startMillis: null,
    remainingSeconds: null,
    isChallengeFailed: false,
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
        get().startUpdateChallengeStateInterval()
    },
    stopChallenge: () => {
        const variablesState = useVariablesStore.getState()
        const challengeData = get().runningChallengeData

        if (challengeData !== null && !get().isChallengeFailed) {
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
    },
    startUpdateChallengeStateInterval: () => {
        const interval = setInterval(() => {
            const secondsToComplete = get().runningChallengeData?.secondsToComplete || 0
            const millisecondsToComplete = secondsToComplete * 1000
            const deltaTimeInMilliseconds = (Date.now() - (get().startMillis || 0))
            const remainingSeconds = (millisecondsToComplete - deltaTimeInMilliseconds) / 1000
            set({
                remainingSeconds: remainingSeconds,
                isChallengeFailed: get().isChallengeRunning && remainingSeconds < 0
            })
            if (!get().isChallengeRunning || get().isChallengeFailed) {
                clearInterval(interval)
            }
        }, 100)
    }
}))