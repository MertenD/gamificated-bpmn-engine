import {SvgIcon, Tooltip} from "@mui/material";

export interface CoinsIconProps {
    isUnlocked: boolean
    tooltip?: string
    svgIconProps?: any
}

export function CoinsIcon(props: CoinsIconProps) {

    return (
        <Tooltip title={props.tooltip ? props.tooltip : "Coins"}>
            <SvgIcon style={{ width: 40, height: "auto", ...props.svgIconProps }}>
                <image xlinkHref={props.isUnlocked ? "/icons/coinsIcon.png" : "/icons/grayCoinsIcon.png"} width="100%" height="100%" />
            </SvgIcon>
        </Tooltip>
    )
}