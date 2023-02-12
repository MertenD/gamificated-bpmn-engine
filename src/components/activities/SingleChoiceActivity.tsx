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

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelected(event.target.value);
    };

    return (
        <div style={{
            margin: 10,
            borderRadius: 10,
            padding: 16,
            background: props.isChallenge ? "rgba(200,255,200)" : "#363638",
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
                            flexDirection: "row"
                        }} key={index}>
                            <input
                                type="radio"
                                id={option}
                                name="options"
                                value={option}
                                checked={selected === option}
                                onChange={handleOptionChange}
                                style={{
                                    marginRight: 70
                                }}
                            />
                            <label htmlFor={option} style={{
                                color: "white"
                            }} >
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
            <button style={{
                margin: 20,
                paddingLeft: 60,
                paddingRight: 60,
                paddingTop: 10,
                paddingBottom: 10,
                borderRadius: 10,
                borderColor: "transparent"
            }} onClick={_ => props.onConfirm(selected)}>
                Confirm
            </button>
        </div>
    )
}