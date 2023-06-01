import {useEffect} from "react";
import {useFlowStore} from "../../../stores/flowStore";
import {getOuterDivStyle} from "../style/ActivityStyleHelper";
import {useChallengeStore} from "../../../stores/challengeStore";

export function AlreadyCollectedRewardActivity() {

    // TODO Überlegen, ob ich dem benutzer hier etwas anzeigen möchte, oder ob ich es hier leer lasse

    const isChallengeRunning = useChallengeStore(state => state.isChallengeRunning)
    const isChallengeFailed = useChallengeStore(state => state.isChallengeFailed)

    useEffect(() => {
        useFlowStore.getState().nextNode()
    }, [])

    return (
        <div style={getOuterDivStyle(isChallengeRunning, isChallengeFailed)}></div>
    )
}