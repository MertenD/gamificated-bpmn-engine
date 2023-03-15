import create from 'zustand';

export type VariablesRFState = {
    variables: Record<string, any>
    isBadgeDialogOpen: boolean
    unlockedBadgeName: string | undefined
    getVariable: (name: string) => any
    setVariable: (name: string, value: any) => void
    addToVariable: (name: string, value: number) => void
    clearVariables: () => void
    unlockBadge: (name: string) => void
    openBadgeDialog: (unlockedBadgeName: string) => void
    closeBadgeDialog: () => void
}

export const useVariablesStore = create<VariablesRFState>((set, get) => ({
    variables: {},
    isBadgeDialogOpen: false,
    unlockedBadgeName: undefined,
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
    },
    unlockBadge: (name: string) => {
        if (get().getVariable(name) !== undefined) {
            get().setVariable(name, true)
            get().openBadgeDialog(name)
        }
    },
    openBadgeDialog: (unlockedBadgeName: string) => {
        set({
            isBadgeDialogOpen: true,
            unlockedBadgeName: unlockedBadgeName
        })
    },
    closeBadgeDialog: () => {
        set({
            isBadgeDialogOpen: false,
            unlockedBadgeName: undefined
        })
    }
}))