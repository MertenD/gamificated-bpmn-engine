import React from "react";
import {Typography} from "@mui/material";
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import ActivityContainer from "../style/ActivityContainer";

export interface StartActivityProps {
    onConfirm: () => void
}

export default function StartActivity(props: StartActivityProps) {

    return (
        <ActivityContainer
            leadingIcon={<PlayCircleFilledWhiteOutlinedIcon style={{ width: 40, height: 40}}/>}
            onConfirm={props.onConfirm}
            confirmButtonLabel={"Start Process"}
        >
            <Typography variant="body1" >
                This is the start of the process.
            </Typography>
        </ActivityContainer>
    )
}