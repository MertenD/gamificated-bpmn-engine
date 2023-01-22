import {ActivityType} from "./ActivityType";
import {GamificationType} from "./GamificationType";
import {GamificationOptions} from "./GamificationOptions";
import {ChallengeType} from "./ChallengeType";
import {Comparison} from "./Comparison";

export interface NodeData {
}

export interface ActivityNodeData extends NodeData {
    task: string
    activityType: ActivityType,
    choices: string,
    inputRegex: string,
    variableName: string,
    gamificationType: GamificationType,
    gamificationOptions: GamificationOptions,
}

export interface GatewayNodeData extends NodeData {
    variableName: string,
    comparison: Comparison,
    valueToCompare: string
}

export interface ChallengeNodeData extends NodeData {
    challengeType: ChallengeType
    secondsToComplete: number
    rewardType: GamificationType
    gamificationOptions: GamificationOptions
    children: string[]
}

export interface InfoNodeData extends NodeData {
    infoText: string
}
