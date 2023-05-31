import React from "react"
import {substituteVariables} from "../../util/Parser";
import {useChallengeStore} from "../../stores/challengeStore";
import ConfirmButton from "../controls/ConfirmButton";
import {Slide} from "@mui/material";
import {getOuterDivStyle} from "./ActivityStyleHelper";

export interface InfoActivityProps {
    infoText: string,
    onConfirm: () => void
}

export default function InfoActivity(props: InfoActivityProps) {

    const isChallenge = useChallengeStore((state) => state.isChallengeRunning)
    const isChallengeFailed = useChallengeStore((state) => state.isChallengeFailed)

    return (
        <Slide direction={"up"}  in mountOnEnter unmountOnExit timeout={0}>
            <div style={getOuterDivStyle(isChallenge, isChallengeFailed)}>
                <div style={{ margin: 10 }}>
                    { substituteVariables(props.infoText) }
                </div>
                <ConfirmButton onConfirm={() => props.onConfirm()} />
            </div>
        </Slide>
    )
}