import {Comparison} from "../model/Comparison";
import {useVariablesStore} from "../stores/variablesStore";

export const evaluateCondition = (variableName: string, comparison: Comparison, valueToCompare: string): boolean => {
    const variablesState = useVariablesStore.getState()
    const value = variablesState.getVariable(variableName)

    if (variablesState.getVariable(variableName) === undefined) {
        return false
    }

    let condition
    // When the variable is an array both the variable and the valueToCompare converted to an array should be sorted
    // before creating the condition
    if (Array.isArray(value)) {

        const sortedVariable = value.sort().toString()
        const sortedValueToCompare = valueToCompare.split(",").map(value => value.trim()).sort().toString()

        condition = "\"" + sortedVariable + "\"" + comparison.valueOf() + "\"" + sortedValueToCompare + "\""
    } else {

        // Return false for >,<,>=,<= when one of the inputs is empty
        if (comparison !== Comparison.EQUALS && comparison !== Comparison.NOT_EQUALS && (value === "" || valueToCompare == "")) {
            return false
        }

        if (comparison === Comparison.EQUALS || comparison === Comparison.NOT_EQUALS) {
            condition = "\"" + value + "\"" + comparison.valueOf() + "\"" + valueToCompare + "\""
        } else {
            condition = value + comparison.valueOf() + valueToCompare
        }
    }

    return eval(condition.toLowerCase())
}