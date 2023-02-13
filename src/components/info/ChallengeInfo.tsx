import React, {useEffect, useState} from "react";
import {useChallengeStore} from "../../stores/challengeStore";

export default function ChallengeInfo() {

    const challengeState = useChallengeStore()

    return (
        <div>
            { challengeState.isChallengeRunning && (
                <div style={{ marginTop: 30, color: challengeState.isChallengeFailed ? "tomato" : "#22935B", fontWeight: "bold" }}>
                    { "You are currently in a time Challenge. You have " +
                        challengeState.remainingSeconds?.toFixed(2)
                        + " Seconds to complete the green Tasks" }
                </div>
            ) }
        </div>
     )
}