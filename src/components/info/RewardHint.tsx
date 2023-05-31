import React, {useEffect, useState} from "react";
import {GamificationType} from "../../model/GamificationType";
import {
    BadgeGamificationOptions,
    GamificationOptions,
    PointsGamificationOptions
} from "../../model/GamificationOptions";
import {PointsApplicationMethod} from "../../model/PointsApplicationMethod";
import {PointType} from "../../model/PointType";
import {CoinsIcon} from "./icons/CoinsIcon";
import {XPIcon} from "./icons/XPIcon";
import {BadgeIcon} from "./icons/BadgeIcon";

export interface RewardHintProps {
    gamificationType: GamificationType,
    gamificationOptions: GamificationOptions,
    isUnlocked: boolean
}

export default function RewardHint(props: RewardHintProps) {

    const [hint, setHint] = useState(<></>)

    useEffect(() => {

        switch (props.gamificationType) {
            case GamificationType.POINTS:
                const pointsGamificationOptions = props.gamificationOptions as PointsGamificationOptions
                let tooltip = ""
                switch (pointsGamificationOptions.pointsApplicationMethod) {
                    case PointsApplicationMethod.INCREMENT_BY:
                        if (pointsGamificationOptions.hasCondition) {
                            tooltip = "+" + pointsGamificationOptions.pointsForSuccess + " " + pointsGamificationOptions.pointType + " under condition"
                        } else {
                            tooltip = "+" + pointsGamificationOptions.pointsForSuccess + " " + pointsGamificationOptions.pointType
                        }
                        break
                    case PointsApplicationMethod.DECREMENT_BY:
                        if (pointsGamificationOptions.hasCondition) {
                            tooltip = "-" + pointsGamificationOptions.pointsForSuccess + " " + pointsGamificationOptions.pointType + " under condition"
                        } else {
                            tooltip = "-" + pointsGamificationOptions.pointsForSuccess + " " + pointsGamificationOptions.pointType
                        }
                        break
                    case PointsApplicationMethod.SET_TO:
                        if (pointsGamificationOptions.hasCondition) {
                            tooltip = pointsGamificationOptions.pointType + " will be set to " + pointsGamificationOptions.pointsForSuccess + " under condition"
                        } else {
                            tooltip = pointsGamificationOptions.pointType + " will be set to " + pointsGamificationOptions.pointsForSuccess
                        }
                }
                switch (pointsGamificationOptions.pointType) {
                    case PointType.COINS:
                        setHint(<CoinsIcon isUnlocked={props.isUnlocked} tooltip={tooltip} />)
                        return
                    case PointType.EXPERIENCE:
                        console.log("Hier ist XP: " + props.isUnlocked)
                        setHint(<XPIcon isUnlocked={props.isUnlocked} tooltip={tooltip} />)
                        return
                }
                return
            case GamificationType.BADGES:
                const badgeGamificationOptions = props.gamificationOptions as BadgeGamificationOptions
                setHint(<BadgeIcon badgeName={badgeGamificationOptions.badgeType} isUnlocked={props.isUnlocked} />)
                return

            default:
                setHint(<></>)
                return
        }
    }, [props.gamificationType, props.gamificationOptions, props.isUnlocked])

    return (
        hint || <></>
    )
}