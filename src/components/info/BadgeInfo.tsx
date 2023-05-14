import {useVariablesStore} from "../../stores/variablesStore";
import {useEffect, useState} from "react";


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
        marginBottom: 50,
        marginRight: 30,
        marginLeft: 30
    }}>
        { badges.map((badge) => {
            return <div key={badge.name} style={{
                padding: 10,
                borderRadius: 10,
                backgroundColor: badge.isUnlocked ? "green" : "gray",
                marginRight: 20
            }}>
                { badge.name }
            </div>
        }) }
    </div>
}