import {Comparison} from "./Comparison";

export interface GamificationOptions {
}

export interface PointsGamificationOptions extends GamificationOptions {
    pointType: string,
    pointsForSuccess: number,
    hasCondition: boolean
    variableName: string,
    comparison: Comparison,
    valueToCompare: string
}

export interface BadgeGamificationOptions extends GamificationOptions {
    badgeType: string,
    hasCondition: boolean,
    variableName: string
    comparison: Comparison,
    valueToCompare: string,
}