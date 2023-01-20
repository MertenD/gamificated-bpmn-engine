import React, {useEffect, useState} from "react"

export interface MultipleChoiceActivityProps {
    task: string,
    choices: string,
    variableName: string,
    onConfirm: () => void
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

    useEffect(() => {
        // TODO hier muss die Variable angespasst werden
        console.log("Task \"" + props.task + "\" updated", selected)
    }, [selected])

    return (
        <div style={{
            margin: 10,
            borderRadius: 10,
            padding: 16,
            background: "white",
            border: "1px solid black",
            display: "flex",
            flexDirection: "column",
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            { props.task }
            <div>
                {props.choices
                    .split(",")
                    .map((choice => choice.trim()))
                    .map((option, index) => (
                        <div key={index}>
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
            <button onClick={event => props.onConfirm()}>
                Confirm
            </button>
        </div>
    )
}