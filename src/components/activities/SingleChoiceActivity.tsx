import React, {useState} from "react"
import {substituteVariables} from "../../util/Parser";

export interface SingleChoiceActivityProps {
    task: string,
    choices: string,
    variableName: string,
    onConfirm: (input: string) => void
    isChallenge: boolean
}

export default function SingleChoiceActivity(props: SingleChoiceActivityProps) {

    const [selected, setSelected] = useState('');

    const handleClick = (event: any) => {
        const input = event.currentTarget.querySelector("input");
        input.checked = !input.checked;
        if (input.checked) {
            setSelected(input.value)
        } else {
            setSelected("")
        }
    };

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
        }}>
            <div style={{ margin: 20, color: "white", fontSize: 30 }}>
                { substituteVariables(props.task) }
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                justifyContent: "flex-start",
            }}>
                { Array.from(new Set(
                    substituteVariables(props.choices)
                        .split(",")
                        .map((choice => choice.trim()))
                    ))
                    .map((option, index) => (
                        <div style={{
                            margin: 5,
                            paddingLeft: 10,
                            paddingRight: 100,
                            paddingTop: 15,
                            paddingBottom: 15,
                            borderRadius: 10,
                            backgroundColor: "#22935B",
                            display: "flex",
                            flexDirection: "row",
                            cursor: "pointer"
                        }} key={index} onClick={handleClick}>
                            <input
                                type="radio"
                                id={option}
                                name="options"
                                value={option}
                                checked={selected === option}
                                onChange={ event => setSelected(event.target.value)}
                                style={{
                                    marginRight: 70,
                                    cursor: "pointer"
                                }}
                            />
                            <label htmlFor={option} style={{
                                color: "white",
                                cursor: "pointer"
                            }} onClick={ event => event.stopPropagation() }>
                                {option}
                            </label>
                        </div>
                    ))
                }
            </div>
            <button style={{
                margin: 20,
                paddingLeft: 60,
                paddingRight: 60,
                paddingTop: 10,
                paddingBottom: 10,
                borderRadius: 10,
                borderColor: "transparent",
                cursor: "pointer"
            }} onClick={_ => props.onConfirm(selected) } disabled={selected === "" || selected === undefined || selected === null} >
                Confirm
            </button>
        </div>
    )
}