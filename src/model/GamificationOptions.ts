import {Comparison} from "./Comparison";
import {PointsApplicationMethod} from "./PointsApplicationMethod";

export interface GamificationOptions {
}

export interface PointsGamificationOptions extends GamificationOptions {
    pointType: string,
    pointsApplicationMethod: PointsApplicationMethod
    pointsForSuccess: string,
    hasCondition: boolean
    value1: string,
    comparison: Comparison,
    value2: string
}

export interface BadgeGamificationOptions extends GamificationOptions {
    badgeType: string,
    hasCondition: boolean,
    value1: string
    comparison: Comparison,
    value2: string,
}