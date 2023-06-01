import React from "react";
import {getOuterDivStyle} from "../style/ActivityStyleHelper";
import {Button} from "@mui/material";
import {GamificationType} from "../../../model/GamificationType";
import {GamificationOptions} from "../../../model/GamificationOptions";

export interface CollectRewardAfterChallengeActivityProps {
    onCollectClicked: () => void
    gamificationType: GamificationType
    gamificationOptions: GamificationOptions
}

export default function CollectRewardAfterChallengeActivity(props: CollectRewardAfterChallengeActivityProps) {

    return (
        <div style={getOuterDivStyle(false, false)}>
            Challenge successfully completed! Collect Reward: {props.gamificationType}
            <Button variant="contained" onClick={() => {
                props.onCollectClicked()
            }}>Collect</Button>
        </div>
    )
}