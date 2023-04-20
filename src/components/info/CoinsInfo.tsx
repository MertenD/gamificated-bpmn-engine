import {useVariablesStore} from "../../stores/variablesStore";

export default function CoinsInfo() {

    const coins = useVariablesStore((state) => state.getVariable("Coins"))

    const textStyle = {
        color: "white"
    }

    const coinStyle = {
        width: 25,
        height: 25,
        backgroundColor: "gold",
        borderRadius: "50%",
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
        }}>
            <div style={{
                ...textStyle,
                marginRight: 10
            }}>
                { (coins || 0).toLocaleString() }
            </div>
            <div style={{
                ...coinStyle,
                color: "black",
                fontWeight: "bolder"
            }}>
                $
            </div>
        </div>
    )
}