// TODO ignore case
import {Comparison} from "../model/Comparison";
import {useVariablesStore} from "../stores/variablesStore";

export const evaluateCondition = (variableName: string, comparison: Comparison, valueToCompare: string): boolean => {
    const variablesState = useVariablesStore.getState()

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

    return eval(condition)
}