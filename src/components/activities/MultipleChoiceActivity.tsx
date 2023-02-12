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
            <div style={{ margin: 10 }}>
                { substituteVariables(props.task) }
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start"
            }}>
                { Array.from(new Set(
                    substituteVariables(props.choices)
                        .split(",")
                        .map((choice => choice.trim()))
                    ))
                    .map((option, index) => (
                        <div style={{ margin: 5, alignSelf: "flex-start" }} key={index}>
                            <input
                                type="checkbox"
                                id={option}
                                name={option}
                                value={option}
                                checked={selected.includes(option)}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor={option}>{option}</label>
                        </div>
                    ))}
            </div>
            <button style={{ margin: 10 }} onClick={_ => props.onConfirm(selected)}>
                Confirm
            </button>
        </div>
    )
}