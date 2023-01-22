import create from 'zustand';
import {Comparison} from "./model/Comparison";
import {ChallengeNodeData} from "./model/NodeData";
import {BpmnNode} from "./model/Bpmn";
import {BadgeGamificationOptions, PointsGamificationOptions} from "./model/GamificationOptions";
import {GamificationType} from "./model/GamificationType";

export type RFState = {
    variables: Record<string, any>
    getVariable: (name: string) => any
    setVariable: (name: string, value: any) => void
    addToVariable: (name: string, value: number) => void
    clearVariables: () => void
    evaluateCondition: (variableName: string, comparison: Comparison, valueToCompare: string) => boolean
    handleChallengeStartAndStop: (challengeId: string | undefined, challengeState: ChallengeRFState) => void
}

export const useStore = create<RFState>((set, get) => ({
    variables: {},
    getVariable: (name: string) => {
        return get().variables[name]
    },
    setVariable: (name: string, value: any) => {
        const oldVariables = get().variables
        const newVariables = {
            ...oldVariables,
            [name]: value
        }
        set({
            variables: newVariables
        })
    },
    addToVariable: (name: string, value: number) => {
        get().setVariable(name, (get().getVariable(name) || 0) + value)
    },
    clearVariables: () => {
        set({
            variables: {}
        })
    },
    // TODO ignore case
    evaluateCondition: (variableName: string, comparison: Comparison, valueToCompare: string): boolean => {
        if (get().getVariable(variableName) === undefined) {
            return false
        }

        let condition
        // When the variable is an array both the variable and the valueToCompare converted to an array should be sorted
        // before creating the condition
        if (Array.isArray(get().getVariable(variableName))) {
            const sortedVariable = get().getVariable(variableName).sort().toString()
            const sortedValueToCompare = valueToCompare.split(",").map(value => value.trim()).sort().toString()
            condition = "\"" + sortedVariable + "\"" + comparison.valueOf() + "\"" + sortedValueToCompare + "\""
        } else {
            if (comparison === Comparison.EQUALS || comparison === Comparison.NOT_EQUALS) {
                condition = "\"" + get().getVariable(variableName) + "\"" + comparison.valueOf() + "\"" + valueToCompare + "\""
            } else {
                condition = get().getVariable(variableName) + comparison.valueOf() + valueToCompare
            }
        }

        console.log("Evaluating condition", condition)
        if (eval(condition)) {
            console.log("Condition is true")
        } else {
            console.log("Condition is false")
        }
        return eval(condition)
    },
    handleChallengeStartAndStop: (challengeId: string | undefined, challengeState: ChallengeRFState) => {
        const isChallenge = challengeId !== undefined
        if (challengeId !== undefined && !challengeState.isChallengeRunning) {
            console.log("Start Challenge")
            challengeState.startChallenge(challengeId)
        } else if (!isChallenge && challengeState.isChallengeRunning) {
            console.log("Stop challenge")
            challengeState.stopChallenge(get())
        }
    }
}))

export type ChallengeRFState = {
    challenges: BpmnNode[]
    addChallenge: (challenge: BpmnNode) => void
    setChallenges: (challenges: BpmnNode[]) => void
    getChallengeData: (id: string) => ChallengeNodeData | null
    isChallengeRunning: boolean
    runningChallengeData: ChallengeNodeData | null
    startMillis: number | null
    startChallenge: (challengeId: string) => void
    stopChallenge: (state: RFState) => void
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
    stopChallenge: (state: RFState) => {
        const deltaTimeInSeconds = (Date.now() - (get().startMillis || 0)) / 1000
        console.log("Delta Time in Seconds", deltaTimeInSeconds)
        const challengeData = get().runningChallengeData
        if (challengeData !== null && deltaTimeInSeconds <= challengeData.secondsToComplete) {
            console.log("Challenge successfully completed")
            if (get().runningChallengeData?.rewardType === GamificationType.POINTS) {
                const gamificationOptions = get().runningChallengeData?.gamificationOptions as PointsGamificationOptions
                state.addToVariable(gamificationOptions.pointType, gamificationOptions.pointsForSuccess)
            } else if (get().runningChallengeData?.rewardType === GamificationType.BADGES) {
                state.setVariable((get().runningChallengeData?.gamificationOptions as BadgeGamificationOptions).badgeType, true)
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