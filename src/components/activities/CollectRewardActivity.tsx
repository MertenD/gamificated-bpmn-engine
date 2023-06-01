import ConfirmButton from "../controls/ConfirmButton";
import React, {useEffect} from "react";
import {useChallengeStore} from "../../stores/challengeStore";
import {getOuterDivStyle} from "./ActivityStyleHelper";

export interface CollectRewardActivityProps {
    onCollect: () => void
}

export default function CollectRewardActivity(props: CollectRewardActivityProps) {

    useEffect(() => {
        useChallengeStore.getState().pauseChallenge()
        return () => {
            useChallengeStore.getState().resumeChallenge()
        }
    })

    return (
        <div style={getOuterDivStyle()}>
            Collect Reward
            <ConfirmButton onConfirm={() => props.onCollect()} />
        </div>
    )
}