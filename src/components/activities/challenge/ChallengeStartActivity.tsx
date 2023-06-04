import React from "react"
import {Typography} from "@mui/material";
import AlarmOutlinedIcon from '@mui/icons-material/AlarmOutlined';
import ActivityContainer from "../style/ActivityContainer";
import {ChallengeNodeData} from "../../../model/NodeData";

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
            <Typography variant="body1" style={{ display: "flex", alignItems: "center" }}>
                { "Challenge is about to start" }
            </Typography>
        </ActivityContainer>
    )
}