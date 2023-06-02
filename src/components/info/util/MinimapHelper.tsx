import {NodeMapValue} from "../../Engine";
import {NodeType} from "../../../model/NodeType";
import {ActivityNodeData, ChallengeNodeData} from "../../../model/NodeData";
import React from "react";
import RewardHint from "../RewardHint";
import {SvgIcon} from "@mui/material";
import {ActivityType} from "../../../model/ActivityType";

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
        backgroundColor: isNodeCurrent ? "#DCE2FF" : isNodeVisited ? "#A9E58F" : "#d9d9d9"
    } as React.CSSProperties
}

const commonChallengeStyle = (isNodeLast: boolean) => {
    return {
        width: 180,
        height: 140,
        backgroundColor: "#D9C5FF",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: isNodeLast ? 25 : 0,
        borderRadius: 10,
    } as React.CSSProperties
}

const commonChallengeBorderStyle = (isNodeLast: boolean) => {
    return {
        ...commonChallengeStyle(false),
        position: "absolute",
        backgroundColor: "#D9C5FF",
        zIndex: -2,
        boxShadow: isNodeLast ? "-2px -2px 0px 0px #000000, 2px -2px 0px 0px #000000" : "0px 0px 0px 2px #000000",
        height: 175,
        borderRadius: 10
    } as React.CSSProperties
}

const commonChallengeBackgroundStyle = () => {
    return {
        ...commonChallengeStyle(false),
        position: "absolute",
        backgroundColor: "#D9C5FF",
        zIndex: -1,
        height: 175,
        borderRadius: 10
    } as React.CSSProperties
}

export function getMapPoint(node: NodeMapValue, index: number, isNodeCurrent: boolean, isNodeVisited: boolean, isRewardUnlocked: boolean, isNodeInChallenge: boolean): JSX.Element {
    switch (node.node.nodeType) {
        case NodeType.ACTIVITY_NODE:
            return getActivityMapPoint(node, index, isNodeCurrent, isNodeVisited, isRewardUnlocked, isNodeInChallenge)
        case NodeType.START_NODE:
            return getStartMapPoint(node, index, isNodeCurrent, isNodeVisited)
        case NodeType.END_NODE:
            return getEndMapPoint(node, index, isNodeCurrent, isNodeVisited)
        case NodeType.INFO_NODE:
            return getInfoMapPoint(node, index, isNodeCurrent, isNodeVisited, isNodeInChallenge)
        case NodeType.CHALLENGE_NODE:
            return (node.node.data as ChallengeNodeData).isStart
                ? getChallengeStartMapPoint(node, index, isNodeCurrent, isNodeVisited)
                : getChallengeEndMapPoint(node, index, isNodeCurrent, isNodeVisited, isRewardUnlocked)
        case NodeType.GAMIFICATION_EVENT_NODE:
            return getGamificationEventMapPoint(node, index, isNodeCurrent, isNodeVisited, isRewardUnlocked, isNodeInChallenge)
        default:
            return <></>
    }
}

function getActivityMapPoint(node: NodeMapValue, index: number, isNodeCurrent: boolean, isNodeVisited: boolean, isRewardUnlocked: boolean, isNodeInChallenge: boolean): JSX.Element {
    const activityNodeData = node.node.data as ActivityNodeData
    let iconPath = ""
    switch (activityNodeData.activityType) {
        case ActivityType.TEXT_INPUT:
            iconPath = "/icons/textInputIcon.png"
            break
        case ActivityType.SINGLE_CHOICE:
            iconPath = "/icons/singleChoiceIcon.png"
            break
        case ActivityType.MULTIPLE_CHOICE:
            iconPath = "/icons/multipleChoiceIcon.png"
    }

    const mapPoint = <div id={node.node.id + index} style={{
        position: "relative",
        zIndex: 2,
        ...commonMapPointStyle(isNodeCurrent, isNodeVisited)
    }}>
        <SvgIcon style={{ width: 60, height: "auto", position: "absolute" }}>
            <image xlinkHref={iconPath} width="100%" height="100%" />
        </SvgIcon>
        <div style={{ position: "relative", bottom: 40, left: 40, zIndex: 10 }}>
            <RewardHint
                gamificationType={activityNodeData.gamificationType}
                gamificationOptions={activityNodeData.gamificationOptions}
                isUnlocked={isRewardUnlocked}
            />
        </div>
    </div>

    if (isNodeInChallenge) {
        return<div style={ commonChallengeStyle(!isNodeVisited) }>
            <div style={commonChallengeBorderStyle(!isNodeVisited)} />
            <div style={commonChallengeBackgroundStyle()} />
            { mapPoint }
        </div>
    } else {
        return mapPoint
    }
}

function getGamificationEventMapPoint(node: NodeMapValue, index: number, isNodeCurrent: boolean, isNodeVisited: boolean, isRewardUnlocked: boolean, isNodeInChallenge: boolean): JSX.Element {

    const mapPoint = <div id={node.node.id + index} style={{
        ...commonMapPointStyle(isNodeCurrent, isNodeVisited)
    }}>
        <RewardHint
            gamificationType={(node.node.data as ActivityNodeData).gamificationType}
            gamificationOptions={(node.node.data as ActivityNodeData).gamificationOptions}
            isUnlocked={isRewardUnlocked}
        />
    </div>

    if (isNodeInChallenge) {
        return<div style={ commonChallengeStyle(!isNodeVisited) }>
            <div style={commonChallengeBorderStyle(!isNodeVisited)} />
            <div style={commonChallengeBackgroundStyle()} />
            { mapPoint }
        </div>
    } else {
        return mapPoint
    }
}

function getStartMapPoint(node: NodeMapValue, index: number, isNodeCurrent: boolean, isNodeVisited: boolean): JSX.Element {
    return <div id={node.node.id + index} style={{
        ...commonMapPointStyle(isNodeCurrent, isNodeVisited)
    }}>{ "Start" }</div>
}

function getEndMapPoint(node: NodeMapValue, index: number, isNodeCurrent: boolean, isNodeVisited: boolean): JSX.Element {
    return <div id={node.node.id + index} style={{
        ...commonMapPointStyle(isNodeCurrent, isNodeVisited)
    }}>{ "End" }</div>
}

function getInfoMapPoint(node: NodeMapValue, index: number, isNodeCurrent: boolean, isNodeVisited: boolean, isNodeInChallenge: boolean): JSX.Element {

    const mapPoint = <div id={node.node.id + index} style={{
        ...commonMapPointStyle(isNodeCurrent, isNodeVisited)
    }}>{ "Info" }</div>

    if (isNodeInChallenge) {
        return<div style={ commonChallengeStyle(!isNodeVisited) }>
            <div style={commonChallengeBorderStyle(!isNodeVisited)} />
            <div style={commonChallengeBackgroundStyle()} />
            { mapPoint }
        </div>
    } else {
        return mapPoint
    }
}

function getChallengeStartMapPoint(node: NodeMapValue, index: number, isNodeCurrent: boolean, isNodeVisited: boolean): JSX.Element {
    return <div style={{
        backgroundColor: isNodeVisited ? "#D9C5FF" : "transparent",
        height: 115,
        width: 180,
        top: 40,
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: "0px 0px 10px 10px"
    }}>
        <div style={{
            height: 115,
            width: 180,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            borderRadius: "0px 0px 10px 10px",
            position: "absolute",
            backgroundColor: "transparent",
            zIndex: -2,
            boxShadow: isNodeVisited ? "0px 0px 0px 2px #000000" : undefined
        }} />
        <div id={node.node.id + index} style={{
            ...commonMapPointStyle(isNodeCurrent, isNodeVisited),
            width: 180,
            height: 45,
            position: "absolute",
            top: -40,
            marginLeft: 0,
            marginRight: 0,
        }}>{ "Challenge Start" }</div>
    </div>
}

function getChallengeEndMapPoint(node: NodeMapValue, index: number, isNodeCurrent: boolean, isNodeVisited: boolean, isRewardUnlocked: boolean): JSX.Element {
    return <div style={{
        backgroundColor: "#D9C5FF",
        height: 40,
        width: 180,
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 60,
        borderRadius: "10px 10px 0px 0px",
        bottom: 10
    }}>
        <div style={{
            height: 50,
            width: 180,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            borderRadius: "10px 10px 0px 0px",
            position: "absolute",
            backgroundColor: "transparent",
            zIndex: -2,
            boxShadow: "0px 0px 0px 2px #000000"
        }} />
        <div id={node.node.id + index} style={{
            ...commonMapPointStyle(isNodeCurrent, isNodeVisited),
            position: "absolute",
            width: 180,
            height: 46,
            marginLeft: 0,
            marginRight: 0,
            top: 10
        }}>
            <span style={{ position: "absolute" }}>Challenge End</span>
            <div style={{ position: "relative", bottom: 18, left: 85 }}>
                <RewardHint
                    gamificationType={(node.node.data as ChallengeNodeData).rewardType}
                    gamificationOptions={(node.node.data as ChallengeNodeData).gamificationOptions}
                    isUnlocked={isRewardUnlocked}
                />
            </div>
        </div>
    </div>
}