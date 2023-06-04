import {SvgIcon, Tooltip} from "@mui/material";

export interface MultipleChoiceIconProps {
    tooltip?: string
    svgIconProps?: any
}

export function MultipleChoiceIcon(props: MultipleChoiceIconProps) {

    return (
        <Tooltip title={props.tooltip ? props.tooltip : "Multiple Choice Activity"}>
            <SvgIcon style={{ width: 40, height: "auto", ...props.svgIconProps }}>
                <image xlinkHref={"/icons/multipleChoiceIcon.png"} width="100%" height="100%" />
            </SvgIcon>
        </Tooltip>
    )
}