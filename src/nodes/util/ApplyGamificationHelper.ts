import {useVariablesStore} from "../../stores/variablesStore";
import {GamificationType} from "../../model/GamificationType";
import {
    BadgeGamificationOptions,
    GamificationOptions,
    PointsGamificationOptions
} from "../../model/GamificationOptions";
import {evaluateCondition} from "../../util/ConditionHelper";
import {PointsApplicationMethod} from "../../model/PointsApplicationMethod";
import {substituteVariables} from "../../util/Parser";
import {useMinimapStore} from "../../stores/MinimapStore";

export const applyGamification = (gamificationType: GamificationType, gamificationOptions: GamificationOptions) => {
    switch (gamificationType) {
        case GamificationType.NONE:
            break
        case GamificationType.POINTS:
            applyPointsGamification(gamificationOptions)
            break
        case GamificationType.BADGES:
            applyBadgeGamification(gamificationOptions)
            break
    }
}

const applyPointsGamification = (gamificationOptions: GamificationOptions) => {
    const variablesState = useVariablesStore.getState()
    const {
        pointType, pointsApplicationMethod, pointsForSuccess, hasCondition, value1, comparison, value2
    } = gamificationOptions as PointsGamificationOptions

    const addPoints = () => {
        useMinimapStore.getState().setCurrentNodeRewardUnlocked()
        switch (pointsApplicationMethod) {
            case PointsApplicationMethod.INCREMENT_BY:
                variablesState.addToVariable(pointType, Number(substituteVariables(pointsForSuccess)))
                break
            case PointsApplicationMethod.SET_TO:
                variablesState.setVariable(pointType, Number(substituteVariables(pointsForSuccess)))
                break
            case PointsApplicationMethod.DECREMENT_BY:
                variablesState.addToVariable(pointType, Number(substituteVariables(pointsForSuccess)) * -1)
        }
    }

    if (hasCondition as boolean) {
        if (evaluateCondition(value1, comparison, value2)) {
            addPoints()
        }
    } else {
        addPoints()
    }
}

const applyBadgeGamification = (gamificationOptions: GamificationOptions) => {
    const variablesState = useVariablesStore.getState()
    const {
        badgeType, hasCondition, value1, comparison, value2
    } = gamificationOptions as BadgeGamificationOptions

    if (hasCondition as boolean) {
        if (evaluateCondition(value1, comparison, value2)) {
            variablesState.unlockBadge(badgeType)
        }
    } else {
        variablesState.unlockBadge(badgeType)
    }
}

export const getGamificationConditionResult = (gamificationType: GamificationType, gamificationOptions: GamificationOptions): boolean => {
    switch (gamificationType) {
        case GamificationType.NONE:
            return false
        case GamificationType.POINTS:
        case GamificationType.BADGES:
            const { hasCondition, value1, value2, comparison } = gamificationOptions
            if (hasCondition as boolean) {
                return evaluateCondition(value1, comparison, value2)
            } else {
                return true
            }
    }
}