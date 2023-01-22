import {BpmnNode} from "../model/Bpmn";
import {ChallengeNodeData} from "../model/NodeData";
import create from "zustand";
import {GamificationType} from "../model/GamificationType";
import {BadgeGamificationOptions, PointsGamificationOptions} from "../model/GamificationOptions";
import {VariablesRFState} from "./variablesStore";

export type ChallengeRFState = {
    challenges: BpmnNode[]
    addChallenge: (challenge: BpmnNode) => void
    setChallenges: (challenges: BpmnNode[]) => void
    getChallengeData: (id: string) => ChallengeNodeData | null
    isChallengeRunning: boolean
    runningChallengeData: ChallengeNodeData | null
    startMillis: number | null
    startChallenge: (challengeId: string) => void
    stopChallenge: (variablesState: VariablesRFState) => void
    handleChallengeStartAndStop: (challengeId: string | undefined, variablesState: VariablesRFState) => void
}

export const useChallengeStore = create<ChallengeRFState>((set, get) => ({
    challenges: [],
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
    isChallengeRunning: false,
    runningChallengeData: null,
    startMillis: null,
    startChallenge: (id: string) => {
        console.log("running challenge data", get().getChallengeData(id))
        set({
            isChallengeRunning: true,
            runningChallengeData: get().getChallengeData(id),
            startMillis: Date.now()
        })
    },
    stopChallenge: (variablesState: VariablesRFState) => {
        const deltaTimeInSeconds = (Date.now() - (get().startMillis || 0)) / 1000
        console.log("Delta Time in Seconds", deltaTimeInSeconds)
        const challengeData = get().runningChallengeData
        if (challengeData !== null && deltaTimeInSeconds <= challengeData.secondsToComplete) {
            console.log("Challenge successfully completed")
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
    handleChallengeStartAndStop: (challengeId: string | undefined, variablesState: VariablesRFState) => {
        const isChallenge = challengeId !== undefined
        if (challengeId !== undefined && !get().isChallengeRunning) {
            console.log("Start Challenge")
            get().startChallenge(challengeId)
        } else if (!isChallenge && get().isChallengeRunning) {
            console.log("Stop challenge")
            get().stopChallenge(variablesState)
        }
    }
}))