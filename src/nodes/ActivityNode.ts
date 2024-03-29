import {BasicNode} from "./BasicNode";
import {ActivityNodeData} from "../model/NodeData";
import React, {useState} from "react";
import TextInputActivity from "../components/activities/tasks/TextInputActivity";
import {ActivityType} from "../model/ActivityType";
import SingleChoiceActivity from "../components/activities/tasks/SingleChoiceActivity";
import MultipleChoiceActivity from "../components/activities/tasks/MultipleChoiceActivity";
import {NodeType} from "../model/NodeType";
import {useVariablesStore} from "../stores/variablesStore";
import {useFlowStore} from "../stores/flowStore";
import {
    applyGamification,
    getGamificationConditionResult,
    isBadgeAlreadyUnlocked
} from "./util/ApplyGamificationHelper";
import CollectRewardActivity from "../components/activities/reward/CollectRewardActivity";

export class ActivityNode implements BasicNode {
    id: string
    nodeType: NodeType
    data: ActivityNodeData

    constructor(id: string, data: ActivityNodeData) {
        this.id = id
        this.nodeType = NodeType.ACTIVITY_NODE
        this.data = data
    }

    run(): React.ReactNode {

        // Two steps activity
        const ActivityComponent: React.FC<{ data: ActivityNodeData }> = ({ data}) => {
            const [confirmed, setConfirmed] = useState(false);

            const onConfirm = (input: string | string[]) => {
                const variablesState = useVariablesStore.getState()

                if (this.data.variableName !== undefined && this.data.variableName !== "") {
                    variablesState.setVariable(this.data.variableName, input)
                }

                if (getGamificationConditionResult(this.data.gamificationType, this.data.gamificationOptions) &&
                    !isBadgeAlreadyUnlocked(this.data.gamificationType, this.data.gamificationOptions)) {
                    setConfirmed(true);
                } else {
                    useFlowStore.getState().nextNode()
                }
            }

            if (confirmed) {
                return React.createElement(CollectRewardActivity, {
                    key: this.id + "collect",
                    gamificationType: this.data.gamificationType,
                    gamificationOptions: this.data.gamificationOptions,
                    onCollectClicked: () => {
                        applyGamification(this.data.gamificationType, this.data.gamificationOptions)
                        useFlowStore.getState().nextNode()
                    }
                })
            }

            switch (data.activityType) {
                case ActivityType.TEXT_INPUT:
                    return React.createElement(TextInputActivity, {
                        key: this.id + "text",
                        data: this.data,
                        onConfirm: (input: string) => { onConfirm(input) }
                    })
                case ActivityType.SINGLE_CHOICE:
                    return React.createElement(SingleChoiceActivity, {
                        key: this.id + "single",
                        data: this.data,
                        onConfirm: (input: string) => { onConfirm(input) }
                    })
                case ActivityType.MULTIPLE_CHOICE:
                    return React.createElement(MultipleChoiceActivity, {
                        key: this.id + "multiple",
                        data: this.data,
                        onConfirm: (input: string[]) => { onConfirm(input) }
                    })
                default:
                    return null;
            }
        }

        return React.createElement(ActivityComponent, {
            key: this.id,
            data: this.data,
        })
    }
}