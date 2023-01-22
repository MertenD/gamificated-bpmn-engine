import React, {useState} from "react"

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
        // TODO hier muss die Variable angespasst werden
        console.log("Task \"" + props.task + "\" updated", event.target.value)
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
                { props.task }
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start"
            }}>
                {props.choices
                    .split(",")
                    .map((choice => choice.trim()))
                    .map((option, index) => (
                        <div style={{ margin: 5, alignSelf: "flex-start" }} key={index}>
                            <input
                                type="radio"
                                id={option}
                                name="options"
                                value={option}
                                checked={selected === option}
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