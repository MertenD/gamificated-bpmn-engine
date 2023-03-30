import {
    BadgeGamificationOptions,
    GamificationOptions,
    PointsGamificationOptions
} from "../../../model/GamificationOptions";
import {GamificationType} from "../../../model/GamificationType";
import {PointsApplicationMethod} from "../../../model/PointsApplicationMethod";

export function getPossibleRewardHint(gamificationType: GamificationType, gamificationOptions: GamificationOptions): string {

    switch (gamificationType) {
        case GamificationType.POINTS:
            const pointsGamificationOptions = gamificationOptions as PointsGamificationOptions
            switch (pointsGamificationOptions.pointsApplicationMethod) {
                case PointsApplicationMethod.INCREMENT_BY:
                    if (pointsGamificationOptions.hasCondition) {
                        return "Possible point change under condition: " + pointsGamificationOptions.pointType + " + " + pointsGamificationOptions.pointsForSuccess
                    } else {
                        return "Point change after completion: " + pointsGamificationOptions.pointType + " + " + pointsGamificationOptions.pointsForSuccess
                    }
                case PointsApplicationMethod.DECREMENT_BY:
                    if (pointsGamificationOptions.hasCondition) {
                       return "Possible point change under condition: " + pointsGamificationOptions.pointType + " - " + pointsGamificationOptions.pointsForSuccess
                    } else {
                        return "Point change after completion: " + pointsGamificationOptions.pointType + " - " + pointsGamificationOptions.pointsForSuccess
                    }
                case PointsApplicationMethod.SET_TO:
                    if (pointsGamificationOptions.hasCondition) {
                        return "Possible point change under condition: " + pointsGamificationOptions.pointType + " = " + pointsGamificationOptions.pointsForSuccess
                    } else {
                        return "Point change after completion: " + pointsGamificationOptions.pointType + " = " + pointsGamificationOptions.pointsForSuccess
                    }
            }
            break
        case GamificationType.BADGES:
            const badgeGamificationOptions = gamificationOptions as BadgeGamificationOptions
            if (badgeGamificationOptions.hasCondition) {
                return "Possible badge under condition: " + badgeGamificationOptions.badgeType
            } else {
                return "Unlock badge after completion: " + badgeGamificationOptions.badgeType
            }
    }

    return ""
}

