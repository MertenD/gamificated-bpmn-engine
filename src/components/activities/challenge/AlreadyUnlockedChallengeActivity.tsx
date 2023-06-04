import React from "react"
import {Typography} from "@mui/material";
import AlarmOnOutlinedIcon from '@mui/icons-material/AlarmOnOutlined';
import ActivityContainer from "../style/ActivityContainer";
import {ChallengeNodeData} from "../../../model/NodeData";

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
            <Typography variant="body1" style={{ display: "flex", alignItems: "center" }}>
                Challenge successfully completed, but reward is already unlocked.
            </Typography>
        </ActivityContainer>
    )
}