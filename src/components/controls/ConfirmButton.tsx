import React from "react";

interface ConfirmButtonProps {
    onConfirm: () => void
    disabled?: boolean
}

export default function ConfirmButton(props: ConfirmButtonProps) {

    return (
        <button style={{
            margin: 20,
            paddingLeft: 60,
            paddingRight: 60,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 10,
            borderColor: "transparent",
            cursor: "pointer"
        }} onClick={_ => props.onConfirm()} disabled={props.disabled}>
            Confirm
        </button>
    )
}