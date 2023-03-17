import React, {useState} from "react"
import {substituteVariables} from "../../util/Parser";
import {useChallengeStore} from "../../stores/challengeStore";
import ConfirmButton from "../controls/ConfirmButton";
import {Slide} from "@mui/material";

export interface MultipleChoiceActivityProps {
    task: string,
    choices: string,
    variableName: string,
    onConfirm: (input: string[]) => void
}

export default function MultipleChoiceActivity(props: MultipleChoiceActivityProps) {

    const [selected, setSelected] = useState<string[]>([]);
    const isChallenge = useChallengeStore((state) => state.isChallengeRunning)
    const isChallengeFailed = useChallengeStore((state) => state.isChallengeFailed)

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
        <Slide direction={"left"} in mountOnEnter unmountOnExit >
            <div style={{
                margin: 10,
                borderRadius: 10,
                padding: 16,
                background: isChallenge ? (isChallengeFailed ? "tomato" : "#22935B44") : "#363638",
                border: "3px solid #616163",
                display: "flex",
                flexDirection: "column",
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div style={{ margin: 20, color: "white", fontSize: 30 }}>
                    { substituteVariables(props.task) }
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    justifyContent: "flex-start"
                }}>
                    { Array.from(new Set(
                        substituteVariables(props.choices)
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
                                backgroundColor: "#22935B",
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
                <ConfirmButton onConfirm={() => props.onConfirm(selected)} />
            </div>
        </Slide>
    )
}