export interface ProgressBarProps {
    color: string,
    completedPercent: number,
    disableEasing?: boolean
}

export function ProgressBar(props: ProgressBarProps) {

    const containerStyle = {
        height: 20,
        width: "100%",
        backgroundColor: "#363638",
        borderRadius: 50,
        border: "3px solid #616163"
    }

    const fillerStyle = {
        height: "100%",
        width: `${props.completedPercent}%`,
        backgroundColor: props.color,
        borderRadius: "inherit",
        transition: props.disableEasing ? undefined : "width 1000ms ease-in-out",
    }

    const labelStyle = {
        padding: 5,
        color: "white",
        fontWeight: "bold"
    }

    return (
        <div style={containerStyle}>
            <div style={{ ...fillerStyle, textAlign: "right"}}>
                <span style={labelStyle}>
                    { `${props.completedPercent}%` }
                </span>
            </div>
        </div>
    )
}