import {SvgIcon, Tooltip} from "@mui/material";

export interface XPIconProps {
    svgIconProps?: any
}

export function XPIcon(props: XPIconProps) {

    return (
        <Tooltip title={"Experience Points"}>
            <SvgIcon style={{ width: 40, height: "auto", ...props.svgIconProps }}>
                <image xlinkHref={"/icons/xpIcon.png"} width="100%" height="100%" />
            </SvgIcon>
        </Tooltip>
    )
}