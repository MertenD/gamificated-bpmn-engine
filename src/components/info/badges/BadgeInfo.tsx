import {useVariablesStore} from "../../../stores/variablesStore";
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
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        overflow: "visible"
    }}>
        { badges.map((badge) => {
            const iconPath = badge.isUnlocked ? "/icons/unlockedBadgeIcon.png" : "/icons/lockedBadgeIcon.png";
            const toolTipLock = badge.isUnlocked ? "🔓" : "🔒"
            return (
                <Tooltip title={toolTipLock + " " + badge.name}>
                    <SvgIcon style={{ width: 50, height: "auto", marginLeft: 5, marginRight: 5 }}>
                        <image xlinkHref={iconPath} width="100%" height="100%" />
                    </SvgIcon>
                </Tooltip>
            );
        }) }
    </div>
}