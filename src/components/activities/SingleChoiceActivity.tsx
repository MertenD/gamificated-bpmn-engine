import React, {useState} from "react"
import {substituteVariables} from "../../util/Parser";
import {useChallengeStore} from "../../stores/challengeStore";
import ConfirmButton from "../controls/ConfirmButton";
import {Slide} from "@mui/material";

export interface SingleChoiceActivityProps {
    task: string,
    choices: string,
    variableName: string,
    onConfirm: (input: string) => void
}

export default function SingleChoiceActivity(props: SingleChoiceActivityProps) {

    const [selected, setSelected] = useState('');
    const isChallenge = useChallengeStore((state) => state.isChallengeRunning)
    const isChallengeFailed = useChallengeStore((state) => state.isChallengeFailed)

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
                    justifyContent: "flex-start",
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
                <ConfirmButton onConfirm={() => {
                    props.onConfirm(selected)
                }} disabled={selected === "" || selected === undefined || selected === null}/>
            </div>
        </Slide>
    )
}