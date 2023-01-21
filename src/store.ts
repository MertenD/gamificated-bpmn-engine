import create from 'zustand';

export type RFState = {
    variables: Record<string, any>
    getVariable: (name: string) => any
    setVariable: (name: string, value: any) => void
    clearVariables: () => void
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
    clearVariables: () => {
        set({
            variables: {}
        })
    }
}))