import {useVariablesStore} from "../../stores/variablesStore";
import {SvgIcon, Tooltip, Typography} from "@mui/material";

export default function CoinsInfo() {

    const coins = useVariablesStore((state) => state.getVariable("Coins"))
    const coinsIconPath = "/icons/coinsIcon.png"

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center"
        }}>
            <Tooltip title={"Earned coins"}>
                <SvgIcon style={{ width: 40, height: "auto"}}>
                    <image xlinkHref={coinsIconPath} width="100%" height="100%" />
                </SvgIcon>
            </Tooltip>
            <div style={{
                marginLeft: 10
            }}>
                <Typography variant="h4">
                    { (coins || 0).toLocaleString() }
                </Typography>
            </div>
        </div>
    )
}