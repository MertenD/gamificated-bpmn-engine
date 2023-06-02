import React from "react"
import {substituteVariables} from "../../util/Parser";
import ConfirmButton from "../controls/ConfirmButton";
import {Slide} from "@mui/material";
import {getOuterDivStyle} from "./style/ActivityStyleHelper";
import {useChallengeStore} from "../../stores/challengeStore";

export interface InfoActivityProps {
    infoText: string,
    onConfirm: () => void
}

export default function InfoActivity(props: InfoActivityProps) {

    const isChallengeRunning = useChallengeStore(state => state.isChallengeRunning)
    const isChallengeFailed = useChallengeStore(state => state.isChallengeTimeFailed)

    return (
        <Slide direction={"up"}  in mountOnEnter unmountOnExit timeout={0}>
            <div style={getOuterDivStyle(isChallengeRunning, isChallengeFailed)}>
                <div style={{ margin: 10 }}>
                    { substituteVariables(props.infoText) }
                </div>
                <ConfirmButton onConfirm={() => props.onConfirm()} />
            </div>
        </Slide>
    )
}