import React from "react"
import {Typography} from "@mui/material";
import AlarmOnOutlinedIcon from '@mui/icons-material/AlarmOnOutlined';
import ActivityContainer from "../style/ActivityContainer";
import {ChallengeNodeData} from "../../../model/NodeData";
import RewardHint from "../../info/RewardHint";

export interface AlreadyUnlockedChallengeActivityProps {
    data: ChallengeNodeData
    onConfirm: () => void
}

export default function AlreadyUnlockedChallengeActivity(props: AlreadyUnlockedChallengeActivityProps) {

    return (
        <ActivityContainer
            leadingIcon={<AlarmOnOutlinedIcon style={{ width: 40, height: 40 }} />}
            onConfirm={props.onConfirm}
        >
            <Typography variant="h5" style={{ margin: 20, display: "flex", alignItems: "center" }}>
                Challenge successfully completed, but the reward is already unlocked.
            </Typography>
            <RewardHint
                gamificationType={props.data.rewardType}
                gamificationOptions={props.data.gamificationOptions}
                isUnlocked={true}
            />
        </ActivityContainer>
    )
}