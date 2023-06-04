import React, {useEffect, useState} from "react"
import {Typography} from "@mui/material";
import AlarmOnOutlinedIcon from '@mui/icons-material/AlarmOnOutlined';
import ActivityContainer from "../style/ActivityContainer";
import {GamificationType} from "../../../model/GamificationType";
import {
    BadgeGamificationOptions,
    GamificationOptions,
    PointsGamificationOptions
} from "../../../model/GamificationOptions";
import {PointType} from "../../../model/PointType";
import {XPIcon} from "../../info/icons/XPIcon";
import {BadgeIcon} from "../../info/icons/BadgeIcon";

export interface CollectChallengeRewardActivityProps {
    gamificationType: GamificationType
    gamificationOptions: GamificationOptions
    onCollect: () => void
}

export default function CollectChallengeRewardActivity(props: CollectChallengeRewardActivityProps) {

    const [leadingIcon, setLeadingIcon] = useState(<></>)

    useEffect(() => {
        switch (props.gamificationType) {
            case GamificationType.POINTS:
                switch ((props.gamificationOptions as PointsGamificationOptions).pointType) {
                    case PointType.EXPERIENCE:
                        setLeadingIcon(<XPIcon isUnlocked={false} />)
                        return
                    case PointType.COINS:
                        setLeadingIcon(<XPIcon isUnlocked={false} />)
                }
                return
            case GamificationType.BADGES:
                setLeadingIcon(<BadgeIcon
                    badgeName={(props.gamificationOptions as BadgeGamificationOptions).badgeType}
                    isUnlocked={false}
                />)
        }
    }, [])

    return (
        <ActivityContainer
            leadingIcon={<>
                <AlarmOnOutlinedIcon style={{ width: 40, height: 40 }} />
                { leadingIcon }
            </>}
            onConfirm={props.onCollect}
            confirmButtonLabel={"Collect"}
        >
            <Typography variant="body1" style={{ display: "flex", alignItems: "center" }}>
                Challenge successfully completed! Collect Reward: {props.gamificationType}
            </Typography>
        </ActivityContainer>
    )
}