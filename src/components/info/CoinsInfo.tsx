import {useVariablesStore} from "../../stores/variablesStore";
import {Typography} from "@mui/material";
import {CoinsIcon} from "./icons/CoinsIcon";

export default function CoinsInfo() {

    const coins = useVariablesStore((state) => state.getVariable("Coins"))

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center"
        }}>
            <CoinsIcon svgIconProps={{ width: 40 }} />
            <div style={{
                marginLeft: 10
            }}>
                <Typography variant="h5">
                    { (coins || 0).toLocaleString() }
                </Typography>
            </div>
        </div>
    )
}