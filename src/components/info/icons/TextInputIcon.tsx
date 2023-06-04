import {SvgIcon, Tooltip} from "@mui/material";

export interface TextInputIconProps {
    tooltip?: string
    svgIconProps?: any
}

export function TextInputIcon(props: TextInputIconProps) {

    return (
        <Tooltip title={props.tooltip ? props.tooltip : "Text Input Activity"}>
            <SvgIcon style={{ width: 40, height: "auto", ...props.svgIconProps }}>
                <image xlinkHref={"/icons/textInputIcon.png"} width="100%" height="100%" />
            </SvgIcon>
        </Tooltip>
    )
}