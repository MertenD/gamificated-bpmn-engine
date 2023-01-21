import React from "react"

export interface GatewayActivityProps {
    infoText: string,
    onTrue: () => void
    onFalse: () => void
}

export default function GatewayActivity(props: GatewayActivityProps) {

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
            { props.infoText }
            <button onClick={_ => props.onTrue()}>
                True
            </button>
            <button onClick={_ => props.onFalse()}>
                False
            </button>
        </div>
    )
}