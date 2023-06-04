import SportsScoreOutlinedIcon from '@mui/icons-material/SportsScoreOutlined';
import React from "react";
import {Typography} from "@mui/material";
import ActivityContainer from "../style/ActivityContainer";

export interface EndActivityProps {
}

export default function EndActivity(props: EndActivityProps) {

    return (
        <ActivityContainer
            leadingIcon={<SportsScoreOutlinedIcon style={{ width: 40, height: 40}}/>}
            onConfirm={() => console.log("TODO")}
        >
            <Typography variant="body1" >
                This is the end of the process.
            </Typography>
        </ActivityContainer>
    )
}