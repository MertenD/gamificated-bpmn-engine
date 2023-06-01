import {CSSProperties} from "react";
import {useChallengeStore} from "../../stores/challengeStore";

export function getOuterDivStyle(): CSSProperties  {
    return {
        flexGrow: 1,
        borderRadius: "10px 0px 0px 10px",
        padding: 16,
        background: useChallengeStore.getState().isChallengeRunning && !useChallengeStore.getState().isChallengeFailed ? "#22935B44" : "#5271ff33",
        border: "3px solid #5271ff",
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
    };
}