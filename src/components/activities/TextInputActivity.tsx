import React, {useEffect, useState} from "react"
import {substituteVariables} from "../../util/Parser";
import {useChallengeStore} from "../../stores/challengeStore";
import ConfirmButton from "../controls/ConfirmButton";
import {Slide} from "@mui/material";
import {ActivityNodeData} from "../../model/NodeData";

export interface TextInputActivityProps {
    data: ActivityNodeData,
    onConfirm: (input: string) => void
}

export default function TextInputActivity(props: TextInputActivityProps) {

    const [input, setInput] = useState("")
    const [isInputNumber, setIsInputNumber] = useState(false)
    const [showRegexHint, setShowRegexHint] = useState(false)
    const isChallenge = useChallengeStore((state) => state.isChallengeRunning)
    const isChallengeFailed = useChallengeStore((state) => state.isChallengeFailed)

    useEffect(() => {
        setIsInputNumber(
            props.data.inputRegex === "[0-9]" ||
            props.data.inputRegex === "[0-9]+" ||
            props.data.inputRegex === "[0-9]*" ||
            props.data.inputRegex === "\d+" ||
            props.data.inputRegex === "\d*" ||
            props.data.inputRegex === "\d"
        )
    }, [props.data.inputRegex])

    const checkRegex = (value: string): boolean => {
        if (props.data.inputRegex === "") {
            return true
        }
        return new RegExp("^" + props.data.inputRegex + "$").test(value)
    }

    const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value)
    }

    return (
        <Slide direction={"left"} in mountOnEnter unmountOnExit >
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
                color: "white"
            }}>
                <span style={{
                    flexWrap: "wrap",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginBottom: 10
                }}>
                    { substituteVariables(props.data.task) + ":" }
                    <input
                        style={{
                            marginLeft: 10
                        }}
                        type={isInputNumber ? "number" : "text"}
                        value={ input }
                        className="nodrag"
                        onChange={(event) => {
                            onInputChanged(event)
                        }}
                    />
                </span>
                { showRegexHint && (
                    <div style={{
                        color: "tomato",
                        marginBottom: 10
                    }}>
                        { "Expected input format: " + props.data.inputRegex }
                    </div>
                ) }
                <ConfirmButton onConfirm={() => {
                    if (checkRegex(input)) {
                        props.onConfirm(input)
                    } else {
                        setShowRegexHint(true)
                    }
                }} />
            </div>
        </Slide>
    )
}