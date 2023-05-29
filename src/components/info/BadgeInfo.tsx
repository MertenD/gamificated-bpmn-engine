import {useVariablesStore} from "../../stores/variablesStore";
import {useEffect, useState} from "react";
import {SvgIcon, Tooltip} from "@mui/material";

export default function BadgeInfo() {

    const variables = useVariablesStore((state) => state.variables)
    const getAllBadges = useVariablesStore((state) => state.getAllBadges)
    const [badges, setBadges] = useState<{name: string, isUnlocked: boolean}[]>([])

    useEffect(() => {
        setBadges(getAllBadges())
    }, [variables])

    return <div style={{
        display: "flex",
        flexDirection: "row",
        overflow: "visible"
    }}>
        { badges.map((badge) => {
            const iconPath = badge.isUnlocked ? "/icons/unlockedBadgeIcon.png" : "/icons/lockedBadgeIcon.png";
            const tooltip = badge.isUnlocked ? "Unlocked: " + badge.name : "Locked: " + badge.name
            return (
                <Tooltip title={tooltip}>
                    <SvgIcon style={{ width: 50, height: "auto", marginRight: 5, marginLeft: 5 }}>
                        <image xlinkHref={iconPath} width="100%" height="100%" />
                    </SvgIcon>
                </Tooltip>
            );
        }) }
    </div>
}