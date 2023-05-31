import {useVariablesStore} from "../../stores/variablesStore";
import {useEffect, useState} from "react";
import {BadgeIcon} from "./icons/BadgeIcon";

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
        { badges.length !== 0 && badges.map((badge) => {
            return <BadgeIcon badgeName={badge.name} isUnlocked={badge.isUnlocked} svgIconProps={{
                width: 50, marginRight: 5, marginLeft: 5
            }} />
        }) }
    </div>
}