import {SvgIcon, Tooltip} from "@mui/material";

export interface CoinsIconProps {
    svgIconProps?: any
}

export function CoinsIcon(props: CoinsIconProps) {

    return (
        <Tooltip title={"Coins"}>
            <SvgIcon style={{ width: 40, height: "auto", ...props.svgIconProps }}>
                <image xlinkHref={"/icons/coinsIcon.png"} width="100%" height="100%" />
            </SvgIcon>
        </Tooltip>
    )
}