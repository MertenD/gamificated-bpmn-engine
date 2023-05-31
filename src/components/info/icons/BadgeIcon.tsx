import {SvgIcon, Tooltip} from "@mui/material";

export interface UnlockedBadgeIconProps {
    badgeName: string
    isUnlocked: boolean
    svgIconProps?: any
}

export function BadgeIcon(props: UnlockedBadgeIconProps) {

    return (
        <Tooltip title={(props.isUnlocked ? "Unlocked: " : "Locked: ") + props.badgeName}>
            <SvgIcon style={{ width: 40, height: "auto", ...props.svgIconProps }}>
                <image xlinkHref={props.isUnlocked ? "/icons/badgeIcon.png" : "/icons/grayBadgeIcon.png"} width="100%" height="100%" />
            </SvgIcon>
        </Tooltip>
    )
}