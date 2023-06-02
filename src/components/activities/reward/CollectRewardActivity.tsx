import React, {useEffect} from "react";
import {useChallengeStore} from "../../../stores/challengeStore";
import {getOuterDivStyle} from "../style/ActivityStyleHelper";
import {Button} from "@mui/material";
import {GamificationType} from "../../../model/GamificationType";
import {GamificationOptions} from "../../../model/GamificationOptions";

export interface CollectRewardActivityProps {
    onCollectClicked: () => void
    gamificationType: GamificationType
    gamificationOptions: GamificationOptions
}

export default function CollectRewardActivity(props: CollectRewardActivityProps) {

    const isChallengeRunning = useChallengeStore(state => state.isChallengeRunning)
    const isChallengeFailed = useChallengeStore(state => state.isChallengeTimeFailed)

    useEffect(() => {
        if (useChallengeStore.getState().isChallengeRunning) {
            useChallengeStore.getState().pauseChallenge()
            return () => {
                useChallengeStore.getState().resumeChallenge()
            }
        }
    }, [])

    return (
        <div style={getOuterDivStyle(isChallengeRunning, isChallengeFailed)}>
            Collect Reward: {props.gamificationType}
            <Button variant="contained" onClick={() => {
                props.onCollectClicked()
            }}>Collect</Button>
        </div>
    )
}