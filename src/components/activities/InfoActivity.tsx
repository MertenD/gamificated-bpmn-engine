import React from "react"

export interface InfoActivityProps {
    infoText: string,
    onConfirm: () => void
}

export default function InfoActivity(props: InfoActivityProps) {

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
            <div style={{ margin: 10 }}>
                { props.infoText }
            </div>
            <button onClick={_ => props.onConfirm()}>
                Confirm
            </button>
        </div>
    )
}