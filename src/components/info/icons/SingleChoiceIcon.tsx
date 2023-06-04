import {SvgIcon, Tooltip} from "@mui/material";

export interface SingleChoiceIconProps {
    tooltip?: string
    svgIconProps?: any
}

export function SingleChoiceIcon(props: SingleChoiceIconProps) {

    return (
        <Tooltip title={props.tooltip ? props.tooltip : "Single Choice Activity"}>
            <SvgIcon style={{ width: 40, height: "auto", ...props.svgIconProps }}>
                <image xlinkHref={"/icons/singleChoiceIcon.png"} width="100%" height="100%" />
            </SvgIcon>
        </Tooltip>
    )
}