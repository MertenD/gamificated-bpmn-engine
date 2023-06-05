import {useChallengeStore} from "../../../stores/challengeStore";
import {getInnerDivStyle, getOuterDivStyle} from "./ActivityStyleHelper";
import React from "react";
import {Button} from "@mui/material";

export interface ActivityContainerProps {
    leadingIcon: React.ReactNode
    confirmButtonLabel?: string
    isConfirmButtonDisabled? : boolean
    isConfirmationButtonRemoved? : boolean
    onConfirm: () => void
    children: React.ReactNode
}

export default function ActivityContainer(props: ActivityContainerProps) {

    const isChallengeRunning = useChallengeStore(state => state.isChallengeRunning)
    const isChallengeFailed = useChallengeStore(state => state.isChallengeTimeFailed)

    return (
        <div style={getOuterDivStyle(isChallengeRunning, isChallengeFailed)}>
            <div style={{ width: 40, height: 40, color: "#5271ff" }}>
                { props.leadingIcon }
            </div>
            <div style={getInnerDivStyle()} >
                { props.children }
                { !props.isConfirmationButtonRemoved && <Button
                    variant="contained"
                    style={{ marginTop: 20 }}
                    disabled={props.isConfirmButtonDisabled ? props.isConfirmButtonDisabled : false}
                    onClick={() => {
                        props.onConfirm()
                    }}
                >{ props.confirmButtonLabel ? props.confirmButtonLabel : "Confirm" }</Button> }
            </div>
        </div>
    )
}