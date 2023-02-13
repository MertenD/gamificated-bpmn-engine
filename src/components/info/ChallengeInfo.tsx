import React from "react";
import {useChallengeStore} from "../../stores/challengeStore";

export default function ChallengeInfo() {

    const challengeState = useChallengeStore()

    return (
        <div>
            { challengeState.isChallengeRunning && (
                <div style={{ marginTop: 30, color: "#22935B", fontWeight: "bold" }}>
                    { "You are currently in a time Challenge. You have " +
                        (challengeState.runningChallengeData?.secondsToComplete || 0)
                        + " Seconds to complete the green Tasks" }
                </div>
            ) }
        </div>
     )
}