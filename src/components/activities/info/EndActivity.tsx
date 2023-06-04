import SportsScoreOutlinedIcon from '@mui/icons-material/SportsScoreOutlined';
import React from "react";
import {Typography} from "@mui/material";
import ActivityContainer from "../style/ActivityContainer";
import {LevelProgressBar} from "../../info/LevelProgressBar";
import BadgeInfo from "../../info/BadgeInfo";
import CoinsInfo from "../../info/CoinsInfo";

export interface EndActivityProps {
}

export default function EndActivity(props: EndActivityProps) {

    return (
        <ActivityContainer
            leadingIcon={<SportsScoreOutlinedIcon style={{ width: 40, height: 40}}/>}
            onConfirm={() => console.log("TODO")}
            isConfirmationButtonRemoved={true}
        >
            <Typography variant="h5" style={{ marginLeft: 20, marginRight: 20 }}>
                This is the end of the process. Here are your stats:
            </Typography>
            <div style={{ marginTop: 30 }} />
            <LevelProgressBar color={"#7ed957"} />
            <div style={{ marginTop: 30, display: "flex", flexDirection: "row" }}>
                <BadgeInfo />
                <div style={{ marginRight: 30 }}/>
                <CoinsInfo />
            </div>
        </ActivityContainer>
    )
}