import React, {useState} from "react"

export interface TextInputActivityProps {
    task: string,
    inputRegex: string,
    variableName: string,
    onConfirm: (input: string) => void
}

export default function TextInputActivity(props: TextInputActivityProps) {

    const [input, setInput] = useState("")

    const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        // TODO hier muss die Variable angespasst werden
        console.log("Task \"" + props.task + "\" updated", event.target.value)
        setInput(event.target.value)
    }

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
            <span style={{
                flexWrap: "wrap",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 10
            }}>
                { props.task + ":" }
                <input
                    style={{
                        marginLeft: 10
                    }}
                    type="text"
                    defaultValue={ input }
                    className="nodrag"
                    onChange={(event) => {
                        onInputChanged(event)
                    }}
                />
            </span>
            <button onClick={ _ => props.onConfirm(input) }>
                Confirm
            </button>
        </div>
    )
}