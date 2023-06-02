import {ChallengeNodeData} from "../model/NodeData";
import create from "zustand";
import {GamificationType} from "../model/GamificationType";
import {BadgeGamificationOptions, PointsGamificationOptions} from "../model/GamificationOptions";
import {useVariablesStore} from "./variablesStore";
import {evaluateCondition} from "../util/ConditionHelper";
import {substituteVariables} from "../util/Parser";
import {useMinimapStore} from "./MinimapStore";

export type ChallengeRFState = {
    isChallengeRunning: boolean
    runningChallengeData: ChallengeNodeData | null
    startMillis: number | null
    pauseStartMillis: number | null
    remainingSeconds: number | null
    isChallengeTimeFailed: boolean
    isChallengePaused: boolean
    totalPausedMillis: number
    resetStoreValues: () => void
    startChallenge: (challengeData: ChallengeNodeData) => void
    stopChallenge: () => void
    applyChallengeReward: () => void
    evaluateRewardCondition: () => boolean
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
    isChallengeTimeFailed: false,
    isChallengePaused: false,
    totalPausedMillis: 0,
    resetStoreValues: () => {
        set({
            isChallengeRunning: false,
            runningChallengeData: null,
            startMillis: null,
            remainingSeconds: null,
            isChallengeTimeFailed: false,
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
    applyChallengeReward: () => {
        const variablesState = useVariablesStore.getState()

        if (get().evaluateRewardCondition()) {
            if (get().runningChallengeData?.rewardType === GamificationType.POINTS) {
                const gamificationOptions = get().runningChallengeData?.gamificationOptions as PointsGamificationOptions
                variablesState.addToVariable(gamificationOptions.pointType, Number(substituteVariables(gamificationOptions.pointsForSuccess)))
                useMinimapStore.getState().setCurrentNodeRewardUnlocked()

            } else if (get().runningChallengeData?.rewardType === GamificationType.BADGES) {
                variablesState.unlockBadge((get().runningChallengeData?.gamificationOptions as BadgeGamificationOptions).badgeType)
            }
        } else {
            console.log("Challenge failed")
        }

        set({
            isChallengeTimeFailed: false,
            runningChallengeData: null
        })
    },
    evaluateRewardCondition: (): boolean => {
        const challengeData = get().runningChallengeData
        if (challengeData !== null && !get().isChallengeTimeFailed) {
            const gamificationOptions = challengeData.gamificationOptions

            if (get().runningChallengeData !== null && !gamificationOptions.hasCondition || evaluateCondition(gamificationOptions.value1, gamificationOptions.comparison, gamificationOptions.value2)) {
                return true
            }
        }
        return false
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
                    isChallengeTimeFailed: get().isChallengeRunning && remainingSeconds < 0
                })
                if (!get().isChallengeRunning || get().isChallengeTimeFailed) {
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