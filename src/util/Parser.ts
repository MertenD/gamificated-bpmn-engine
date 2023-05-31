import {NodeType} from "../model/NodeType";
import {
    ActivityNodeData,
    ChallengeNodeData,
    GamificationEventNodeData,
    GatewayNodeData,
    NodeData
} from "../model/NodeData";
import {ActivityType} from "../model/ActivityType";
import {GamificationType} from "../model/GamificationType";
import {Comparison} from "../model/Comparison";
import {ChallengeType} from "../model/ChallengeType";
import {BadgeGamificationOptions, GamificationOptions, PointsGamificationOptions} from "../model/GamificationOptions";
import {useVariablesStore} from "../stores/variablesStore";
import {PointType} from "../model/PointType";

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
        case NodeType.GAMIFICATION_EVENT_NODE:
            return parseGamificationEventNodeData(data)
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
        value1: data.value1,
        comparison: data.comparison as Comparison,
        value2: data.value2
    } as GatewayNodeData
}

export function parseChallengeNodeData(data: any): ChallengeNodeData {
    return {
        isStart: data.isStart,
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

export function parseGamificationEventNodeData(data: any): GamificationEventNodeData {
    return {
        gamificationType: data.gamificationType as GamificationType,
        gamificationOptions: parseGamificationOptions(data.gamificationType, data.gamificationOptions)
    } as GamificationEventNodeData
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
        pointType: options.pointType as PointType,
        pointsApplicationMethod: options.pointsApplicationMethod,
        pointsForSuccess: options.pointsForSuccess,
        hasCondition: options.hasCondition,
        value1: options.value1,
        comparison: options.comparison as Comparison,
        value2: options.value2
    } as PointsGamificationOptions
}

export function parseBadgeGamificationOptions(options: any): BadgeGamificationOptions {
    return {
        badgeType: options.badgeType,
        hasCondition: options.hasCondition,
        value1: options.value1,
        comparison: options.comparison as Comparison,
        value2: options.value2
    } as BadgeGamificationOptions
}

// Substitute all {variableName} values in a string with their corresponding values from the variablesStore.
// If there is no corresponding value in the store the {} will be removed, and it will substitute with just the variableName
export function substituteVariables(value: string): string {
    const regex = /\{(.+?)}/ig
    const variablesState = useVariablesStore.getState()
    return value.replaceAll(regex, (_: string, variableName: string) => {
        const variableValue = variablesState.getVariable(variableName)
        console.log("variableValue", variableValue)
        if (variableValue === undefined) {
            return variableName
        }
        return variableValue
    })
}