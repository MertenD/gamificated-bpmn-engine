import {useVariablesStore} from "../../stores/variablesStore";
import {GamificationType} from "../../model/GamificationType";
import {
    BadgeGamificationOptions,
    GamificationOptions,
    PointsGamificationOptions
} from "../../model/GamificationOptions";
import {evaluateCondition} from "../../util/ConditionHelper";
import {PointsApplicationMethod} from "../../model/PointsApplicationMethod";

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
        switch (pointsApplicationMethod) {
            case PointsApplicationMethod.CHANGE_BY:
                variablesState.addToVariable(pointType, pointsForSuccess)
                break
            case PointsApplicationMethod.SET_TO:
                variablesState.setVariable(pointType, pointsForSuccess)
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