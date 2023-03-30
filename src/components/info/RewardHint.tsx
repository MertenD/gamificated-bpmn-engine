import {useEffect, useState} from "react";
import {getPossibleRewardHint} from "./util/RewardHintHelper";
import {GamificationType} from "../../model/GamificationType";
import {GamificationOptions} from "../../model/GamificationOptions";

export interface RewardHintProps {
    gamificationType: GamificationType,
    gamificationOptions: GamificationOptions
}

export default function RewardHint(props: RewardHintProps) {

    const [hint, setHint] = useState("")

    useEffect(() => {
        setHint(getPossibleRewardHint(props.gamificationType, props.gamificationOptions))
    }, [])

    return (
        <>
            { hint !== "" && <> ({ hint }) </> }
        </>
    )
}