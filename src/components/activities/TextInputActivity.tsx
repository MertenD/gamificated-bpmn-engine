import React, {useEffect, useState} from "react"
import {substituteVariables} from "../../util/Parser";

export interface TextInputActivityProps {
    task: string,
    inputRegex: string,
    variableName: string,
    onConfirm: (input: string) => void
    isChallenge: boolean
}

export default function TextInputActivity(props: TextInputActivityProps) {

    const [input, setInput] = useState("")
    const [isInputNumber, setIsInputNumber] = useState(false)
    const [showRegexHint, setShowRegexHint] = useState(false)

    useEffect(() => {
        setIsInputNumber(
            props.inputRegex === "[0-9]" ||
            props.inputRegex === "[0-9]+" ||
            props.inputRegex === "[0-9]*" ||
            props.inputRegex === "\d+" ||
            props.inputRegex === "\d*" ||
            props.inputRegex === "\d"
        )
    }, [props.inputRegex])

    const checkRegex = (value: string): boolean => {
        if (props.inputRegex === "") {
            return true
        }
        return new RegExp("^" + props.inputRegex + "$").test(value)
    }

    const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value)
    }

    return (
        <div style={{
            margin: 10,
            borderRadius: 10,
            padding: 16,
            background: props.isChallenge ? "#22935B44" : "#363638",
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
                { substituteVariables(props.task) + ":" }
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
                    { "Expected input format: " + props.inputRegex }
                </div>
            ) }
            <button onClick={ _ => {
                if (checkRegex(input)) {
                    props.onConfirm(input)
                } else {
                    setShowRegexHint(true)
                }
            } } style={{
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