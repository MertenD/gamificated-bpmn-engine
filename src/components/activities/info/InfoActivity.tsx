import React from "react"
import {substituteVariables} from "../../../util/Parser";
import {Button, Typography} from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ActivityContainer from "../style/ActivityContainer";

export interface InfoActivityProps {
    infoText: string,
    onConfirm: () => void
}

export default function InfoActivity(props: InfoActivityProps) {

    return (
        <ActivityContainer
            leadingIcon={<InfoOutlinedIcon style={{ width: 40, height: 40 }} />}
            onConfirm={props.onConfirm}
        >
            <Typography variant="h5" style={{ marginLeft: 20, marginRight: 20, display: "flex", alignItems: "center" }}>
                { substituteVariables(props.infoText) }
            </Typography>
        </ActivityContainer>
    )
}