import React from "react";
import {useChallengeStore} from "../../stores/challengeStore";
import {Typography} from "@mui/material";

export default function ChallengeInfo() {

    const challengeState = useChallengeStore()

    return (
        <div>
            { challengeState.isChallengeRunning && (
                (() => {
                    if (challengeState.isChallengeTimeFailed) {
                        return <Typography variant="h5" style={{marginTop: 30, color: "tomato", fontWeight: "bold"}}>
                            Challenge failed
                        </Typography>
                    } else if (challengeState.isChallengePaused) {
                        return <Typography variant="h5" style={{marginTop: 30, color: "gray", fontWeight: "bold"}}>
                            Challenge paused
                        </Typography>
                    } else {
                        return <Typography variant="h5" style={{ marginTop: 30, color: "#D9C5FF", fontWeight: "bold" }}>
                            You have { challengeState.remainingSeconds?.toFixed(2) } seconds left.
                        </Typography>
                    }
                })()
            ) }
        </div>
     )
}