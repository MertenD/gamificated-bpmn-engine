import React, {useState} from "react"

export interface SingleChoiceActivityProps {
    task: string,
    choices: string,
    variableName: string,
}

export default function SingleChoiceActivity(props: SingleChoiceActivityProps) {

    const [selected, setSelected] = useState('');

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelected(event.target.value);
        console.log("Task \"" + props.task + "\" updated", event.target.value)
    };

    return (
        <div style={{
            marginBottom: 10,
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
        </div>
    )
}