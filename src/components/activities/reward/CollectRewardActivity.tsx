import React, {useEffect, useState} from "react";
import {useChallengeStore} from "../../../stores/challengeStore";
import {Typography} from "@mui/material";
import {GamificationType} from "../../../model/GamificationType";
import {
    BadgeGamificationOptions,
    GamificationOptions,
    PointsGamificationOptions
} from "../../../model/GamificationOptions";
import ActivityContainer from "../style/ActivityContainer";
import {XPIcon} from "../../info/icons/XPIcon";
import {PointType} from "../../../model/PointType";
import {BadgeIcon} from "../../info/icons/BadgeIcon";

export interface CollectRewardActivityProps {
    onCollectClicked: () => void
    gamificationType: GamificationType
    gamificationOptions: GamificationOptions
}

export default function CollectRewardActivity(props: CollectRewardActivityProps) {

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

    useEffect(() => {
        if (useChallengeStore.getState().isChallengeRunning) {
            useChallengeStore.getState().pauseChallenge()
            return () => {
                useChallengeStore.getState().resumeChallenge()
            }
        }
    }, [])

    return (
        <ActivityContainer
            leadingIcon={leadingIcon}
            onConfirm={props.onCollectClicked}
            confirmButtonLabel={"Collect"}
        >
            <Typography variant="body1" style={{ margin: 10 }}>
                Collect Reward: {props.gamificationType}
            </Typography>
        </ActivityContainer>
    )
}