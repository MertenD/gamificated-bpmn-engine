import React, {useState} from "react"
import {substituteVariables} from "../../../util/Parser";
import {ActivityNodeData} from "../../../model/NodeData";
import {getOuterDivStyle} from "../style/ActivityStyleHelper";
import {useChallengeStore} from "../../../stores/challengeStore";
import {Button, Typography} from "@mui/material";
import ActivityContainer from "../style/ActivityContainer";
import {MultipleChoiceIcon} from "../../info/icons/MultipleChoiceActivity";

export interface MultipleChoiceActivityProps {
    data: ActivityNodeData
    onConfirm: (input: string[]) => void
}

export default function MultipleChoiceActivity(props: MultipleChoiceActivityProps) {

    const [selected, setSelected] = useState<string[]>([]);
    const isChallengeRunning = useChallengeStore(state => state.isChallengeRunning)
    const isChallengeFailed = useChallengeStore(state => state.isChallengeTimeFailed)

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelected([...selected, event.target.value]);
        } else {
            setSelected(selected.filter(item => item !== event.target.value));
        }
    };

    const handleClick = (event: any) => {
        const target = event.currentTarget.querySelector("input");
        console.log("Target", target)
        if (!selected.includes(target.value)) {
            setSelected([...selected, target.value]);
        } else {
            setSelected(selected.filter(item => item !== target.value));
        }
    };

    return (
        <ActivityContainer
            leadingIcon={<MultipleChoiceIcon />}
            onConfirm={() => props.onConfirm(selected)}
        >
            <Typography variant="h5" style={{ margin: 20 }}>
                { substituteVariables(props.data.task) }
            </Typography>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                justifyContent: "flex-start"
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
                        }} key={index} onClick={ handleClick }>
                            <input
                                type="checkbox"
                                id={option}
                                name={option}
                                value={option}
                                checked={selected.includes(option)}
                                onChange={ handleOptionChange }
                                style={{
                                    marginRight: 70,
                                    color: "black",
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
                    ))}
            </div>
        </ActivityContainer>
    )
}