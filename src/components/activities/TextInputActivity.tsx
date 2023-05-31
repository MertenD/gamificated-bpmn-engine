import React, {useEffect, useState} from "react"
import {substituteVariables} from "../../util/Parser";
import {useChallengeStore} from "../../stores/challengeStore";
import ConfirmButton from "../controls/ConfirmButton";
import {Slide} from "@mui/material";
import {ActivityNodeData} from "../../model/NodeData";
import {getOuterDivStyle} from "./ActivityStyleHelper";

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
        <Slide direction={"up"} in mountOnEnter unmountOnExit timeout={0}>
            <div style={getOuterDivStyle(isChallenge, isChallengeFailed)}>
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