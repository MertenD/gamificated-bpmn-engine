import React, {useEffect, useState} from "react";
import {useVariablesStore} from "../../stores/variablesStore";
import {ProgressBar} from "./ProgressBar";

export interface LevelProgressBarProps {
    color: string,
}

export function LevelProgressBar(props: LevelProgressBarProps) {

    const variables = useVariablesStore((state) => state.variables)
    const getVariable = useVariablesStore((state) => state.getVariable)

    const [experience, setExperience] = useState(getVariable("Experience"))
    const [level, setLevel] = useState(1)
    const [disableEasing, setDisableEasing] = useState(false)

    useEffect(() => {
        const newExperience = getVariable("Experience")
        const deltaExperience = (experience % 100) + (newExperience - experience)
        if (deltaExperience >= 100) {
            setExperience(100)
            setTimeout(() => {
                setDisableEasing(true)
                setExperience(0)
            }, 1000)
            setTimeout(() => {
                setDisableEasing(false)
                setExperience(newExperience)
                setLevel((Math.floor(newExperience / 100) || 0) + 1)
            }, 1100)
        } else {
            setExperience(newExperience)
        }
    }, [variables])

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            margin: 50
        }}>
            <div style={{
                marginRight: 10,
                color: "white"
            }}>
                Level { level }
            </div>
            <div style={{ width: 300 }}>
                <ProgressBar
                    color={props.color}
                    disableEasing={disableEasing}
                    completedPercent={
                        experience === 100 ?  100 : experience % 100
                    }
                />
            </div>
            <div style={{
                marginLeft: 13,
                color: "white"
            }}>
                Level { level + 1 }
            </div>
            <div style={{
                marginLeft: 20,
                color: "white"
            }}>
                (Total experience: { getVariable("Experience") })
            </div>
        </div>
    )
}