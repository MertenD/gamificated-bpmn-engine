import {Comparison} from "../model/Comparison";
import {useVariablesStore} from "../stores/variablesStore";
import {substituteVariables} from "./Parser";

// TODO Test schreiben
export const evaluateCondition = (value1: string, comparison: Comparison, value2: string): boolean => {

    const variablesState = useVariablesStore.getState()

    let condition
    if (Array.isArray(variablesState.getVariable(value1)) || Array.isArray(variablesState.getVariable(value2))) {

        let sortedValue1String
        if (Array.isArray(variablesState.getVariable(value1))) {
            sortedValue1String = variablesState.getVariable(value1).sort().toString()
        } else {
            sortedValue1String = value1.split(",").map(value => value.trim()).sort().toString()
        }

        let sortedValue2String
        if (Array.isArray(variablesState.getVariable(value2))) {
            sortedValue2String = variablesState.getVariable(value2).sort().toString()
        } else {
            sortedValue2String = value2.split(",").map(value => value.trim()).sort().toString()
        }

        condition = "\"" + sortedValue1String + "\"" + comparison.valueOf() + "\"" + sortedValue2String + "\""

    } else {

        if (comparison !== Comparison.EQUALS && comparison !== Comparison.NOT_EQUALS && (value1 === "" || value2 == "")) {
            return false
        }

        if (comparison === Comparison.EQUALS || comparison === Comparison.NOT_EQUALS) {
            condition = "\"" + value1 + "\"" + comparison.valueOf() + "\"" + value2 + "\""
        } else {
            condition = value1 + comparison.valueOf() + value2
        }

    }

    return eval(substituteVariables(condition))
}