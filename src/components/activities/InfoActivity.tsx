import React from "react"
import {substituteVariables} from "../../util/Parser";
import {useChallengeStore} from "../../stores/challengeStore";
import ConfirmButton from "../controls/ConfirmButton";

export interface InfoActivityProps {
    infoText: string,
    onConfirm: () => void
}

export default function InfoActivity(props: InfoActivityProps) {

    const isChallenge = useChallengeStore((state) => state.isChallengeRunning)
    const isChallengeFailed = useChallengeStore((state) => state.isChallengeFailed)

    return (
        <div style={{
            margin: 10,
            borderRadius: 10,
            padding: 16,
            background: isChallenge ? (isChallengeFailed ? "tomato" : "#22935B44") : "#363638",
            border: "3px solid #616163",
            display: "flex",
            flexDirection: "column",
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div style={{ margin: 10, color: "white" }}>
                { substituteVariables(props.infoText) }
            </div>
            <ConfirmButton onConfirm={() => props.onConfirm()} />
        </div>
    )
}