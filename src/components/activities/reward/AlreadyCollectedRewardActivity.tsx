import {useEffect} from "react";
import {useFlowStore} from "../../../stores/flowStore";
import ActivityContainer from "../style/ActivityContainer";

export function AlreadyCollectedRewardActivity() {

    // TODO Überlegen, ob ich dem benutzer hier etwas anzeigen möchte, oder ob ich es hier leer lasse

    useEffect(() => {
        useFlowStore.getState().nextNode()
    }, [])

    return (
        <ActivityContainer leadingIcon={<></>} onConfirm={() => {}} >
            <></>
        </ActivityContainer>
    )
}