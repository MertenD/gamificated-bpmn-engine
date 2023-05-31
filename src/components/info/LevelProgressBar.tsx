import React, {useEffect, useState} from "react";
import {useVariablesStore} from "../../stores/variablesStore";
import {ProgressBar} from "./ProgressBar";
import {XPIcon} from "./icons/XPIcon";
import {Typography} from "@mui/material";

export interface LevelProgressBarProps {
    color: string,
}

export function LevelProgressBar(props: LevelProgressBarProps) {

    const variables = useVariablesStore((state) => state.variables)
    const getVariable = useVariablesStore((state) => state.getVariable)

    const variableName = "Experience"
    const [experience, setExperience] = useState(getVariable(variableName))
    const [level, setLevel] = useState(1)
    const [disableEasing, setDisableEasing] = useState(false)

    useEffect(() => {
        if (experience !== undefined) {
            const newExperience = getVariable(variableName).toFixed(2)
            const deltaExperience = (experience % 100) + (newExperience - experience)
            if (deltaExperience >= 100) {
                // TODO Irgendeine Animation bei einem Level Up
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
                setLevel((Math.floor(newExperience / 100) || 0) + 1)
            }
        }
    }, [variables])

    return (
        <>
            { experience !== undefined && (<div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center"
            }}>
                <div style={{
                    marginBottom: 15,
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                        alignItems: "center",
                    }}>
                        <XPIcon isUnlocked={true} />
                        <div style={{
                            marginLeft: 10
                        }}>
                            <Typography variant="h5">
                                {experience}
                            </Typography>
                        </div>
                    </div>
                    <div style={{
                        marginRight: 2
                    }}>
                        <Typography variant="h5">
                            Level {level}
                        </Typography>
                    </div>
                </div>
                <div style={{width: 300}}>
                    <ProgressBar
                        color={props.color}
                        disableEasing={disableEasing}
                        completedPercent={
                            experience === 100 ? 100 : experience % 100
                        }
                    />
                </div>
            </div> )}
        </>
    )
}