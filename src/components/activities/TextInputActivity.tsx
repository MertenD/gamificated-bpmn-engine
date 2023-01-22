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
            background: props.isChallenge ? "rgba(200,255,200)" : "white",
            border: "1px solid black",
            display: "flex",
            flexDirection: "column",
            alignItems: 'center',
            justifyContent: 'center',
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
            } }>
                Confirm
            </button>
        </div>
    )
}