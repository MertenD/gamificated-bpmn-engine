import {Comparison} from "../model/Comparison";
import {useVariablesStore} from "../stores/variablesStore";
import {substituteVariables} from "./Parser";

// TODO Test schreiben
// TODO Hier nochmal prüfen, ob bei Array Vergleich der != Operator korrekt funktioniert
export const evaluateCondition = (value1: string, comparison: Comparison, value2: string): boolean => {

    const variablesState = useVariablesStore.getState()

    let condition
    if (Array.isArray(variablesState.getVariable(value1)) || Array.isArray(variablesState.getVariable(value2))) {

        if (comparison !== Comparison.EQUALS && comparison !== Comparison.NOT_EQUALS) {
            return false
        }

        let array1: string[]
        if (Array.isArray(variablesState.getVariable(value1))) {
            array1 = variablesState.getVariable(value1).map((value: string) => {
                return substituteVariables(value)
            }).sort()
        } else {
            array1 = substituteVariables(value1)
                .replaceAll("[", "")
                .replaceAll("]", "")
                .split(",")
                .map(value => value.trim())
                .sort()
        }

        let array2: string[]
        if (Array.isArray(variablesState.getVariable(value2))) {
            array2 = variablesState.getVariable(value2).map((value: string) => {
                return substituteVariables(value)
            }).sort()
        } else {
            array2 = substituteVariables(value2)
                .replaceAll("[", "")
                .replaceAll("]", "")
                .split(",")
                .map(value => value.trim())
                .sort()
        }

        const isArray1InArray2 =  array1.every(a => array2.some(b => a === b))
        const isArray2InArray1 =  array2.every(b => array1.some(a => b === a))

        return isArray1InArray2 && isArray2InArray1

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

    console.log("Eval condition", substituteVariables(condition))
    return eval(substituteVariables(condition))
}