import React from "react"

export interface TextInputActivityProps {
    task: string,
    inputRegex: string,
    variableName: string,
}

export default function TextInputActivity(props: TextInputActivityProps) {

    const onValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Task \"" + props.task + "\" updated", event.target.value)
    }

    return (
        <div style={{
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
                    defaultValue={ "" }
                    className="nodrag"
                    onChange={(event) => {
                        onValueChanged(event)
                    }}
                />
            </span>
        </div>
    )
}