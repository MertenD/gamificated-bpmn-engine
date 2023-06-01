import React, {useState} from "react"
import {substituteVariables} from "../../util/Parser";
import ConfirmButton from "../controls/ConfirmButton";
import {Slide} from "@mui/material";
import {ActivityNodeData} from "../../model/NodeData";
import {getOuterDivStyle} from "./style/ActivityStyleHelper";
import {useChallengeStore} from "../../stores/challengeStore";

export interface SingleChoiceActivityProps {
    data: ActivityNodeData
    onConfirm: (input: string) => void
}

export default function SingleChoiceActivity(props: SingleChoiceActivityProps) {

    const [selected, setSelected] = useState('');
    const isChallengeRunning = useChallengeStore(state => state.isChallengeRunning)
    const isChallengeFailed = useChallengeStore(state => state.isChallengeFailed)

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
        <Slide direction={"up"} in mountOnEnter unmountOnExit timeout={0}>
            <div style={getOuterDivStyle(isChallengeRunning, isChallengeFailed)}>
                <div style={{ margin: 20, fontSize: 30 }}>
                    { substituteVariables(props.data.task) }
                </div>
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