import {Comparison} from "./Comparison";
import {PointsApplicationMethod} from "./PointsApplicationMethod";
import {PointType} from "./PointType";

export interface GamificationOptions {
}

export interface PointsGamificationOptions extends GamificationOptions {
    pointType: PointType,
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