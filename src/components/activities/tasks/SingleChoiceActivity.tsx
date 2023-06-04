import React, {useState} from "react"
import {substituteVariables} from "../../../util/Parser";
import {ActivityNodeData} from "../../../model/NodeData";
import {getOuterDivStyle} from "../style/ActivityStyleHelper";
import {useChallengeStore} from "../../../stores/challengeStore";
import {Button, Typography} from "@mui/material";
import ActivityContainer from "../style/ActivityContainer";
import {SingleChoiceIcon} from "../../info/icons/SingleChoiceIcon";

export interface SingleChoiceActivityProps {
    data: ActivityNodeData
    onConfirm: (input: string) => void
}

export default function SingleChoiceActivity(props: SingleChoiceActivityProps) {

    const [selected, setSelected] = useState('');

    const handleClick = (event: any) => {
        const input = event.currentTarget.querySelector("input");
        input.checked = !input.checked;
        if (input.checked) {
            setSelected(input.value)
        } else {
            setSelected("")
        }
    };

    return (
        <ActivityContainer
            leadingIcon={<SingleChoiceIcon />}
            isConfirmButtonDisabled={selected === "" || selected === undefined || selected === null}
            onConfirm={ () => props.onConfirm(selected) }
        >
            <Typography variant="h5" style={{ margin: 20 }}>
                { substituteVariables(props.data.task) }
            </Typography>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                justifyContent: "flex-start",
            }}>
                { Array.from(new Set(
                    substituteVariables(props.data.choices)
                        .split(",")
                        .map((choice => choice.trim()))
                ))
                    .map((option, index) => (
                        <div style={{
                            margin: 5,
                            paddingLeft: 10,
                            paddingRight: 100,
                            paddingTop: 15,
                            paddingBottom: 15,
                            borderRadius: 10,
                            backgroundColor: "#5271ff",
                            display: "flex",
                            flexDirection: "row",
                            cursor: "pointer"
                        }} key={index} onClick={handleClick}>
                            <input
                                type="radio"
                                id={option}
                                name="options"
                                value={option}
                                checked={selected === option}
                                onChange={ event => setSelected(event.target.value)}
                                style={{
                                    marginRight: 70,
                                    cursor: "pointer"
                                }}
                            />
                            <label htmlFor={option} style={{
                                color: "white",
                                cursor: "pointer"
                            }} onClick={ event => event.stopPropagation() }>
                                {option}
                            </label>
                        </div>
                    ))
                }
            </div>
        </ActivityContainer>
    )
}