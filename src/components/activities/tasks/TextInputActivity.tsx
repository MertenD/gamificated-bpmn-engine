import React, {useEffect, useState} from "react"
import {substituteVariables} from "../../../util/Parser";
import {ActivityNodeData} from "../../../model/NodeData";
import {TextField, Typography} from "@mui/material";
import ActivityContainer from "../style/ActivityContainer";
import {TextInputIcon} from "../../info/icons/TextInputIcon";

export interface TextInputActivityProps {
    data: ActivityNodeData,
    onConfirm: (input: string) => void
}

export default function TextInputActivity(props: TextInputActivityProps) {

    const [input, setInput] = useState("")
    const [isInputNumber, setIsInputNumber] = useState(false)
    const [showRegexHint, setShowRegexHint] = useState(false)

    useEffect(() => {
        setIsInputNumber(
            props.data.inputRegex === "[0-9]" ||
            props.data.inputRegex === "[0-9]+" ||
            props.data.inputRegex === "[0-9]*" ||
            props.data.inputRegex === "\d+" ||
            props.data.inputRegex === "\d*" ||
            props.data.inputRegex === "\d"
        )
    }, [props.data.inputRegex])

    const checkRegex = (value: string): boolean => {
        if (props.data.inputRegex === "") {
            return true
        }
        return new RegExp("^" + props.data.inputRegex + "$").test(value)
    }

    const onInputChanged = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setInput(event.target.value)
    }

    return (
        <ActivityContainer
            leadingIcon={<TextInputIcon />}
            onConfirm={() => {
                if (checkRegex(input)) {
                    props.onConfirm(input)
                } else {
                    setShowRegexHint(true)
                }
            }}
        >
            <Typography variant="h5" style={{ margin: 20 }}>
                { substituteVariables(props.data.task) }
            </Typography>
            <TextField
                id="outlined-multiline-flexible"
                label="Input"
                multiline
                maxRows={5}
                minRows={2}
                type={ isInputNumber ? "number" : "text" }
                value={ input }
                onChange={(event) => {
                    onInputChanged(event)
                }}
                error={showRegexHint}
                helperText={ showRegexHint ? "Expected input format: " + props.data.inputRegex : undefined }
                sx={{
                    width: 400
                }}
            />
        </ActivityContainer>
    )
}