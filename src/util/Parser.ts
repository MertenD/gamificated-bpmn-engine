import {NodeType} from "../model/NodeType";
import {ActivityNodeData, ChallengeNodeData, GatewayNodeData, NodeData} from "../model/NodeData";
import {ActivityType} from "../model/ActivityType";
import {GamificationType} from "../model/GamificationType";
import {Comparison} from "../model/Comparison";
import {ChallengeType} from "../model/ChallengeType";
import {BadgeGamificationOptions, GamificationOptions, PointsGamificationOptions} from "../model/GamificationOptions";
import {useVariablesStore} from "../stores/variablesStore";

export function parseNodeData(type: NodeType, data: any): NodeData {
    switch (type) {
        case NodeType.ACTIVITY_NODE:
            return parseActivityNodeData(data)
        case NodeType.GATEWAY_NODE:
            return parseGatewayNodeData(data)
        case NodeType.CHALLENGE_NODE:
            return parseChallengeNodeData(data)
        case NodeType.INFO_NODE:
            return parseInfoNodeData(data)
        case NodeType.START_NODE:
        case NodeType.END_NODE:
            return {}
    }
}

export function parseActivityNodeData(data: any): ActivityNodeData {
    return {
        task: data.task,
        activityType: data.activityType as ActivityType,
        choices: data.choices,
        inputRegex: data.inputRegex,
        variableName: data.variableName,
        gamificationType: data.gamificationType as GamificationType,
        gamificationOptions: parseGamificationOptions(data.gamificationType, data.gamificationOptions)
    } as ActivityNodeData
}

export function parseGatewayNodeData(data: any): GatewayNodeData {
    return {
        variableName: data.variableName,
        comparison: data.comparison as Comparison,
        valueToCompare: data.valueToCompare
    } as GatewayNodeData
}

export function parseChallengeNodeData(data: any): ChallengeNodeData {
    return {
        challengeType: data.challengeType as ChallengeType,
        secondsToComplete: data.secondsToComplete,
        rewardType: data.rewardType as GamificationType,
        gamificationOptions: parseGamificationOptions(data.rewardType, data.gamificationOptions),
    } as ChallengeNodeData
}

export function parseInfoNodeData(data: any) {
    return {
        infoText: data.infoText
    }
}

export function parseGamificationOptions(type: GamificationType, options: any): GamificationOptions {
    switch (type) {
        case GamificationType.POINTS:
            return parsePointsGamificationOptions(options)
        case GamificationType.BADGES:
            return parseBadgeGamificationOptions(options)
        case GamificationType.NONE:
            return {}
    }
}

export function parsePointsGamificationOptions(options: any): PointsGamificationOptions {
    return {
        pointType: options.pointType,
        pointsForSuccess: options.pointsForSuccess,
        hasCondition: options.hasCondition,
        variableName: options.variableName,
        comparison: options.comparison as Comparison,
        valueToCompare: options.valueToCompare
    } as PointsGamificationOptions
}

export function parseBadgeGamificationOptions(options: any): BadgeGamificationOptions {
    return {
        badgeType: options.badgeType,
        hasCondition: options.hasCondition,
        variableName: options.variableName,
        comparison: options.comparison as Comparison,
        valueToCompare: options.valueToCompare
    } as BadgeGamificationOptions
}

// Substitute all {variableName} values in a string with their corresponding values from the variablesStore.
// If there is no corresponding value in the store the {} will be removed, and it will substitute with just the variableName
export function substituteVariables(value: string): string {
    const regex = /\{(.+?)}/ig
    const variablesState = useVariablesStore.getState()
    return value.replaceAll(regex, (_: string, variableName: string) => {
        return variablesState.getVariable(variableName) || variableName
    })
}