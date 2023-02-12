import create from 'zustand';

export type VariablesRFState = {
    variables: Record<string, any>
    getVariable: (name: string) => any
    setVariable: (name: string, value: any) => void
    addToVariable: (name: string, value: number) => void
    clearVariables: () => void
}

export const useVariablesStore = create<VariablesRFState>((set, get) => ({
    variables: {},
    getVariable: (name: string) => {
        name = name.replaceAll("{", "").replaceAll("}", "")
        return get().variables[name]
    },
    setVariable: (name: string, value: any) => {
        name = name.replaceAll("{", "").replaceAll("}", "")
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
    }
}))