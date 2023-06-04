import React from "react";
import {Typography} from "@mui/material";
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import ActivityContainer from "../style/ActivityContainer";
import {useMenuStore} from "../../../stores/menuStore";
import {useFlowStore} from "../../../stores/flowStore";

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
            <Typography variant="h5" style={{ marginLeft: 20, marginRight: 20 }} >
                This is the start of "{useFlowStore.getState().processName}".
            </Typography>
        </ActivityContainer>
    )
}