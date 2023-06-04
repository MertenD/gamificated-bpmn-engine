import {CSSProperties} from "react";

export function getOuterDivStyle(isChallengeRunning: boolean, isChallengeFailed: boolean): CSSProperties  {
    return {
        flexGrow: 1,
        borderRadius: "10px 0px 0px 10px",
        padding: 16,
        background: "#DCE2FF",
        border: isChallengeRunning && !isChallengeFailed ? "30px solid #D9C5FF" : undefined,
        boxShadow: "inset 0 0 0 3px #5271ff",
        display: "flex",
        flexDirection: "column",
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    };
}

export function getInnerDivStyle(): CSSProperties {
    return {
        margin: 20,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
    }
}