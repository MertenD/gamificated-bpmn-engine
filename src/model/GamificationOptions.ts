import {Comparison} from "./Comparison";

export interface GamificationOptions {
}

export interface PointsGamificationOptions extends GamificationOptions {
    pointType: string,
    pointsForSuccess: number,
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