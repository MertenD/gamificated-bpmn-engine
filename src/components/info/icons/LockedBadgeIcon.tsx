import {SvgIcon, Tooltip} from "@mui/material";

export interface LockedBadgeIconProps {
    badgeName: string
    svgIconProps?: any
}

export function LockedBadgeIcon(props: LockedBadgeIconProps) {

    return (
        <Tooltip title={"Locked: " + props.badgeName}>
            <SvgIcon style={{ width: 40, height: "auto", ...props.svgIconProps}}>
                <image xlinkHref={"/icons/lockedBadgeIcon.png"} width="100%" height="100%" />
            </SvgIcon>
        </Tooltip>
    )
}