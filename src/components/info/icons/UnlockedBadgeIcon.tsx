import {SvgIcon, Tooltip} from "@mui/material";

export interface UnlockedBadgeIconProps {
    badgeName: string
    svgIconProps?: any
}

export function UnlockedBadgeIcon(props: UnlockedBadgeIconProps) {

    return (
        <Tooltip title={"Unlocked: " + props.badgeName}>
            <SvgIcon style={{ width: 40, height: "auto", ...props.svgIconProps }}>
                <image xlinkHref={"/icons/unlockedBadgeIcon.png"} width="100%" height="100%" />
            </SvgIcon>
        </Tooltip>
    )
}