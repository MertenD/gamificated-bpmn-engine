import React, {useState} from "react"
import {substituteVariables} from "../../util/Parser";

export interface MultipleChoiceActivityProps {
    task: string,
    choices: string,
    variableName: string,
    onConfirm: (input: string[]) => void
    isChallenge: boolean
}

export default function MultipleChoiceActivity(props: MultipleChoiceActivityProps) {

    const [selected, setSelected] = useState<string[]>([]);

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelected([...selected, event.target.value]);
        } else {
            setSelected(selected.filter(item => item !== event.target.value));
        }
    };

    const handleClick = (event: any) => {
        const target = event.currentTarget.querySelector("input");
        if (!target.checked) {
            setSelected([...selected, target.value]);
        } else {
            setSelected(selected.filter(item => item !== target.value));
        }
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
            <div style={{ margin: 10, color: "white" }}>
                { substituteVariables(props.task) }
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                justifyContent: "flex-start"
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
                        }} key={index} onClick={ handleClick }>
                            <input
                                type="checkbox"
                                id={option}
                                name={option}
                                value={option}
                                checked={selected.includes(option)}
                                onChange={ handleOptionChange }
                                style={{
                                    marginRight: 70,
                                    color: "black"
                                }}
                            />
                            <label htmlFor={option} style={{
                                color: "white"
                            }}>
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