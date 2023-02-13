import React from "react"
import {substituteVariables} from "../../util/Parser";
import {useChallengeStore} from "../../stores/challengeStore";

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
            <button onClick={_ => props.onConfirm()} style={{
                margin: 20,
                paddingLeft: 60,
                paddingRight: 60,
                paddingTop: 10,
                paddingBottom: 10,
                borderRadius: 10,
                borderColor: "transparent",
                cursor: "pointer"
            }}>
                Confirm
            </button>
        </div>
    )
}