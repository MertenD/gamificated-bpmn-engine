import create from 'zustand';
import {Comparison} from "./model/Comparison";

export type RFState = {
    variables: Record<string, any>
    getVariable: (name: string) => any
    setVariable: (name: string, value: any) => void
    addToVariable: (name: string, value: number) => void
    clearVariables: () => void
    evaluateCondition: (variableName: string, comparison: Comparison, valueToCompare: string) => boolean
}

export const useStore = create<RFState>((set, get) => ({
    variables: {},
    getVariable: (name: string) => {
        return get().variables[name]
    },
    setVariable: (name: string, value: any) => {
        const oldVariables = get().variables
        const newVariables = {
            ...oldVariables,
            [name]: value
        }
        set({
            variables: newVariables
        })
    },
    addToVariable: (name: string, value: number) => {
        get().setVariable(name, (get().getVariable(name) || 0) + value)
    },
    clearVariables: () => {
        set({
            variables: {}
        })
    },
    // TODO Evaluierung von Listen wie etwa bei Multiple Choice Fragen
    evaluateCondition: (variableName: string, comparison: Comparison, valueToCompare: string): boolean => {
        if (get().getVariable(variableName) === undefined) {
            return false
        }
        let condition
        if (comparison === Comparison.EQUALS || comparison === Comparison.NOT_EQUALS) {
            condition = "\"" + get().getVariable(variableName) + "\"" + comparison.valueOf() + "\"" + valueToCompare + "\""
        } else {
            condition = get().getVariable(variableName) + comparison.valueOf() + valueToCompare
        }
        console.log("Evaluating condition", condition)
        if (eval(condition)) {
            console.log("Condition is true")
        } else {
            console.log("Condition is false")
        }
        return eval(condition)
    }
}))