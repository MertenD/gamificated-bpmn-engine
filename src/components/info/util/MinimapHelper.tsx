import {NodeMapValue} from "../../Engine";
import {NodeType} from "../../../model/NodeType";
import {ActivityNodeData, ChallengeNodeData} from "../../../model/NodeData";
import {GamificationType} from "../../../model/GamificationType";
import {useFlowStore} from "../../../stores/flowStore";
import React from "react";
import RewardHint from "../RewardHint";

const commonMapPointStyle = (isNodeCurrent: boolean, isNodeVisited: boolean) => {
    return {
        height: 90,
        width: 90,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 25,
        marginTop: 25,
        borderRadius: "10px",
        border: isNodeCurrent ? "2px solid #5271ff" : "2px solid black",
        backgroundColor: isNodeCurrent ? "#5271ff33" : isNodeVisited ? "#7ed957aa" : "#d9d9d9"
    } as React.CSSProperties
}

export function getMapPoint(node: NodeMapValue, index: number, isNodeCurrent: boolean, isNodeVisited: boolean, isRewardUnlocked: boolean): JSX.Element {
    switch (node.node.nodeType) {
        case NodeType.ACTIVITY_NODE:
            return getActivityMapPoint(node, index, isNodeCurrent, isNodeVisited, isRewardUnlocked)
        case NodeType.START_NODE:
            return getStartMapPoint(node, index, isNodeCurrent, isNodeVisited)
        case NodeType.END_NODE:
            return getEndMapPoint(node, index, isNodeCurrent, isNodeVisited)
        case NodeType.INFO_NODE:
            return getInfoMapPoint(node, index, isNodeCurrent, isNodeVisited)
        case NodeType.CHALLENGE_NODE:
            return (node.node.data as ChallengeNodeData).isStart
                ? getChallengeStartMapPoint(node, index, isNodeCurrent, isNodeVisited)
                : getChallengeEndMapPoint(node, index, isNodeCurrent, isNodeVisited, isRewardUnlocked)
        default:
            return <></>
    }
}

function getActivityMapPoint(node: NodeMapValue, index: number, isNodeCurrent: boolean, isNodeVisited: boolean, isRewardUnlocked: boolean): JSX.Element {
    const nodeMap = useFlowStore.getState().nodeMap
    const hasOwnGamification = (node.node.data as ActivityNodeData).gamificationType !== GamificationType.NONE
    // @ts-ignore
    const hasGamificationEventNext = Object.values(node.next).map(next => nodeMap.get(next).node.nodeType).includes(NodeType.GAMIFICATION_EVENT_NODE)

    // TODO Alle nachfolgenden Gamification Events einbinden

    console.log("Neu gerendert für " + index + " mit " + isRewardUnlocked)

    return <div id={node.node.id + index} style={{
        position: "relative",
        ...commonMapPointStyle(isNodeCurrent, isNodeVisited)
    }}>
        <span style={{ position: "absolute" }}>Activity</span>
        <div style={{ position: "relative", bottom: 40, left: 40 }}>
            <RewardHint
                gamificationType={(node.node.data as ActivityNodeData).gamificationType}
                gamificationOptions={(node.node.data as ActivityNodeData).gamificationOptions}
                isUnlocked={isRewardUnlocked}
            />
        </div>
    </div>
}

function getStartMapPoint(node: NodeMapValue, index: number, isNodeCurrent: boolean, isNodeVisited: boolean): JSX.Element {
    return <div id={node.node.id + index} style={{
        height: 40,
        width: 40,
        borderRadius: "50%",
        ...commonMapPointStyle(isNodeCurrent, isNodeVisited)
    }}>{ "Start" }</div>
}

function getEndMapPoint(node: NodeMapValue, index: number, isNodeCurrent: boolean, isNodeVisited: boolean): JSX.Element {
    return <div id={node.node.id + index} style={{
        height: 40,
        width: 40,
        borderRadius: "50%",
        ...commonMapPointStyle(isNodeCurrent, isNodeVisited)
    }}>{ "End" }</div>
}

function getInfoMapPoint(node: NodeMapValue, index: number, isNodeCurrent: boolean, isNodeVisited: boolean): JSX.Element {
    return <div id={node.node.id + index} style={{
        height: 30,
        width: 100,
        borderRadius: "10px",
        ...commonMapPointStyle(isNodeCurrent, isNodeVisited)
    }}>{ "Info" }</div>
}

function getChallengeStartMapPoint(node: NodeMapValue, index: number, isNodeCurrent: boolean, isNodeVisited: boolean): JSX.Element {
    return <div id={node.node.id + index} style={{
        height: 30,
        width: 120,
        borderRadius: "10px",
        ...commonMapPointStyle(isNodeCurrent, isNodeVisited)
    }}>{ "Challenge Start" }</div>
}

function getChallengeEndMapPoint(node: NodeMapValue, index: number, isNodeCurrent: boolean, isNodeVisited: boolean, isRewardUnlocked: boolean): JSX.Element {
    return <div id={node.node.id + index} style={{
        position: "relative",
        ...commonMapPointStyle(isNodeCurrent, isNodeVisited)
    }}>
        <span style={{ position: "absolute" }}>Challenge End</span>
        <div style={{ position: "relative", bottom: 40, left: 40 }}>
            <RewardHint
                gamificationType={(node.node.data as ChallengeNodeData).rewardType}
                gamificationOptions={(node.node.data as ChallengeNodeData).gamificationOptions}
                isUnlocked={isRewardUnlocked}
            />
        </div>
    </div>
}