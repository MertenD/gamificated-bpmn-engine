import create from "zustand";
import {Comparison} from "../model/Comparison";
import {VariablesRFState} from "./variablesStore";

export type FlowRFState = {
    evaluateCondition: (variableName: string, comparison: Comparison, valueToCompare: string, variablesState: VariablesRFState) => boolean
}

export const useFlowStore = create<FlowRFState>((set, get) => ({
    // TODO ignore case
    evaluateCondition: (variableName: string, comparison: Comparison, valueToCompare: string, variablesState: VariablesRFState): boolean => {
        if (variablesState.getVariable(variableName) === undefined) {
            return false
        }

        let condition
        // When the variable is an array both the variable and the valueToCompare converted to an array should be sorted
        // before creating the condition
        if (Array.isArray(variablesState.getVariable(variableName))) {
            const sortedVariable = variablesState.getVariable(variableName).sort().toString()
            const sortedValueToCompare = valueToCompare.split(",").map(value => value.trim()).sort().toString()
            condition = "\"" + sortedVariable + "\"" + comparison.valueOf() + "\"" + sortedValueToCompare + "\""
        } else {
            if (comparison === Comparison.EQUALS || comparison === Comparison.NOT_EQUALS) {
                condition = "\"" + variablesState.getVariable(variableName) + "\"" + comparison.valueOf() + "\"" + valueToCompare + "\""
            } else {
                condition = variablesState.getVariable(variableName) + comparison.valueOf() + valueToCompare
            }
        }

        console.log("Evaluating condition", condition)
        if (eval(condition)) {
            console.log("Condition is true")
        } else {
            console.log("Condition is false")
        }
        return eval(condition)
    },
}))