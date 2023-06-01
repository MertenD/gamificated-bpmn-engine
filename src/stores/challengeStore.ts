import {ChallengeNodeData} from "../model/NodeData";
import create from "zustand";
import {GamificationType} from "../model/GamificationType";
import {BadgeGamificationOptions, PointsGamificationOptions} from "../model/GamificationOptions";
import {useVariablesStore} from "./variablesStore";
import {evaluateCondition} from "../util/ConditionHelper";
import {substituteVariables} from "../util/Parser";

export type ChallengeRFState = {
    isChallengeRunning: boolean
    runningChallengeData: ChallengeNodeData | null
    startMillis: number | null
    pauseStartMillis: number | null
    remainingSeconds: number | null
    isChallengeFailed: boolean
    isChallengePaused: boolean
    totalPausedMillis: number
    resetStoreValues: () => void
    startChallenge: (challengeData: ChallengeNodeData) => void
    stopChallenge: () => void
    evaluateChallenge: () => void
    startUpdateChallengeStateInterval: () => void
    pauseChallenge: () => void
    resumeChallenge: () => void
}

export const useChallengeStore = create<ChallengeRFState>((set, get) => ({
    isChallengeRunning: false,
    runningChallengeData: null,
    startMillis: null,
    pauseStartMillis: null,
    remainingSeconds: null,
    isChallengeFailed: false,
    isChallengePaused: false,
    totalPausedMillis: 0,
    resetStoreValues: () => {
        set({
            isChallengeRunning: false,
            runningChallengeData: null,
            startMillis: null,
            remainingSeconds: null,
            isChallengeFailed: false,
            isChallengePaused: false,
            totalPausedMillis: 0,
        })
    },
    startChallenge: (challengeData: ChallengeNodeData) => {
        set({
            isChallengeRunning: true,
            runningChallengeData: challengeData,
            startMillis: Date.now()
        })
        get().startUpdateChallengeStateInterval()
    },
    stopChallenge: () => {
        set({
            isChallengeRunning: false,
            startMillis: null,
            isChallengePaused: false,
            totalPausedMillis: 0
        })
    },
    evaluateChallenge: () => {
        const variablesState = useVariablesStore.getState()
        const challengeData = get().runningChallengeData

        if (challengeData !== null && !get().isChallengeFailed) {

            if (get().runningChallengeData?.rewardType === GamificationType.POINTS) {
                const gamificationOptions = get().runningChallengeData?.gamificationOptions as PointsGamificationOptions

                if (!gamificationOptions.hasCondition || evaluateCondition(gamificationOptions.value1, gamificationOptions.comparison, gamificationOptions.value2)) {
                    variablesState.addToVariable(gamificationOptions.pointType, Number(substituteVariables(gamificationOptions.pointsForSuccess)))
                }
            } else if (get().runningChallengeData?.rewardType === GamificationType.BADGES) {
                const gamificationOptions = get().runningChallengeData?.gamificationOptions as BadgeGamificationOptions

                if (!gamificationOptions.hasCondition || evaluateCondition(gamificationOptions.value1, gamificationOptions.comparison, gamificationOptions.value2)) {
                    variablesState.unlockBadge((get().runningChallengeData?.gamificationOptions as BadgeGamificationOptions).badgeType)
                }
            }
        } else {
            console.log("Challenge failed")
        }

        set({
            isChallengeFailed: false,
            runningChallengeData: null
        })
    },
    startUpdateChallengeStateInterval: () => {
        const interval = setInterval(() => {
            if (!get().isChallengePaused) {
                const secondsToComplete = get().runningChallengeData?.secondsToComplete || 0
                const millisecondsToComplete = secondsToComplete * 1000
                const deltaTimeInMilliseconds = (Date.now() - (get().startMillis || 0))
                const remainingMilliseconds = (millisecondsToComplete - deltaTimeInMilliseconds)
                const remainingSeconds = remainingMilliseconds / 1000

                set({
                    remainingSeconds: remainingSeconds,
                    isChallengeFailed: get().isChallengeRunning && remainingSeconds < 0
                })
                if (!get().isChallengeRunning || get().isChallengeFailed) {
                    clearInterval(interval)
                }
            }
        }, 10)
    },
    pauseChallenge: () => {
        set({
            isChallengePaused: true,
            pauseStartMillis: Date.now()
        })
    },
    resumeChallenge: () => {
        set({
            isChallengePaused: false,
        })
        const startMillis = get().startMillis
        const pauseStartMillis = get().pauseStartMillis
        if (startMillis !== null && pauseStartMillis !== null) {
            set({
                startMillis: startMillis + (Date.now() - pauseStartMillis)
            })
        }
    }
}))