import {NodeMapValue} from "../../Engine";
import {NodeType} from "../../../model/NodeType";
import {ActivityNodeData} from "../../../model/NodeData";
import {GamificationType} from "../../../model/GamificationType";
import {useFlowStore} from "../../../stores/flowStore";
import React from "react";
import RewardHint from "../RewardHint";

const commonMapPointStyle = (isNodeCurrent: boolean, isNodeVisited: boolean) => {
    return {
        display: "flex",
        flexDirection: "column",
        color: "white",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 50,
        border: isNodeCurrent ? "4px solid black" : undefined,
        backgroundColor: isNodeVisited ? "green" : "gray"
    } as React.CSSProperties
}

export function getMapPoint(node: NodeMapValue, index: number, isNodeCurrent: boolean, isNodeVisited: boolean): JSX.Element {
    switch (node.node.nodeType) {
        case NodeType.ACTIVITY_NODE:
            return getActivityMapPoint(node, index, isNodeCurrent, isNodeVisited)
        case NodeType.START_NODE:
            return getStartMapPoint(node, index, isNodeCurrent, isNodeVisited)
        case NodeType.END_NODE:
            return getEndMapPoint(node, index, isNodeCurrent, isNodeVisited)
        case NodeType.INFO_NODE:
            return getInfoMapPoint(node, index, isNodeCurrent, isNodeVisited)
        default:
            return <></>
    }
}

function getActivityMapPoint(node: NodeMapValue, index: number, isNodeCurrent: boolean, isNodeVisited: boolean): JSX.Element {
    const nodeMap = useFlowStore.getState().nodeMap
    const hasOwnGamification = (node.node.data as ActivityNodeData).gamificationType !== GamificationType.NONE
    // @ts-ignore
    const hasGamificationEventNext = Object.values(node.next).map(next => nodeMap.get(next).node.nodeType).includes(NodeType.GAMIFICATION_EVENT_NODE)
    const hasGamification = hasOwnGamification || hasGamificationEventNext

    return <div id={node.node.id + index} style={{
        height: isNodeCurrent ? 110: 30,
        width: isNodeCurrent ? 130 : 100,
        borderRadius: "10px",
        ...commonMapPointStyle(isNodeCurrent, isNodeVisited)
    }}>
        { "Activity" + (!isNodeCurrent && hasGamification ? " (G)" : "") }
        { hasOwnGamification && isNodeCurrent && <RewardHint
            gamificationType={(node.node.data as ActivityNodeData).gamificationType}
            gamificationOptions={(node.node.data as ActivityNodeData).gamificationOptions}
        /> }
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