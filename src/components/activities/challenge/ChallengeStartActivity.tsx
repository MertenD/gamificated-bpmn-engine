import React from "react"
import {Typography} from "@mui/material";
import AlarmOutlinedIcon from '@mui/icons-material/AlarmOutlined';
import ActivityContainer from "../style/ActivityContainer";
import {ChallengeNodeData} from "../../../model/NodeData";
import {GamificationType} from "../../../model/GamificationType";
import {PointsGamificationOptions} from "../../../model/GamificationOptions";
import RewardHint from "../../info/RewardHint";

export interface ChallengeStartProps {
    data: ChallengeNodeData
    onConfirm: () => void
}

export default function ChallengeStartActivity(props: ChallengeStartProps) {



    return (
        <ActivityContainer
            leadingIcon={<AlarmOutlinedIcon style={{ width: 40, height: 40 }} />}
            onConfirm={props.onConfirm}
        >
            <Typography variant="h5" style={{ marginLeft: 20, marginRight: 20, display: "flex", alignItems: "center" }}>
                A time challenge is about to start.<br/> You have to complete the following tasks in { props.data.secondsToComplete } seconds
                in order to receive a reward:
            </Typography>
            <Typography variant="caption" style={{ marginLeft: 20, marginRight: 20, marginBottom: 20, marginTop: 10 }} >
                (You can see the remaining in the bottom once the challenge started)
            </Typography>
            <RewardHint
                gamificationType={props.data.rewardType}
                gamificationOptions={props.data.gamificationOptions}
                isUnlocked={false}
            />
        </ActivityContainer>
    )
}