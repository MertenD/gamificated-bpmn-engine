import React from "react"
import {Typography} from "@mui/material";
import ActivityContainer from "../style/ActivityContainer";
import {ChallengeNodeData} from "../../../model/NodeData";
import AlarmOffOutlinedIcon from '@mui/icons-material/AlarmOffOutlined';

export interface FailedChallengeEndActivityProps {
    data: ChallengeNodeData
    onConfirm: () => void
}

export default function FailedChallengeEndActivity(props: FailedChallengeEndActivityProps) {

    return (
        <ActivityContainer
            leadingIcon={<AlarmOffOutlinedIcon style={{ width: 40, height: 40 }} />}
            onConfirm={props.onConfirm}
        >
            <Typography variant="h5" style={{ marginLeft: 20, marginRight: 20, display: "flex", alignItems: "center" }}>
                The Challenge is over. <br />
                You did not complete all tasks in time or don't satisfy another condition for the reward.
            </Typography>
        </ActivityContainer>
    )
}