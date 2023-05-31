import {SvgIcon, Tooltip} from "@mui/material";

export interface XPIconProps {
    isUnlocked: boolean
    tooltip?: string
    svgIconProps?: any
}

export function XPIcon(props: XPIconProps) {

    return (
        <Tooltip title={props.tooltip ? props.tooltip : "Experience Points"}>
            <SvgIcon style={{ width: 40, height: "auto", ...props.svgIconProps }}>
                <image xlinkHref={props.isUnlocked ? "/icons/xpIcon.png" : "/icons/grayXPIcon.png"} width="100%" height="100%" />
            </SvgIcon>
        </Tooltip>
    )
}