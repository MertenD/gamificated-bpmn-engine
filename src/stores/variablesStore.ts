import create from 'zustand';
import {getValue} from "@testing-library/user-event/dist/utils";

export type VariablesRFState = {
    variables: Record<string, any>
    isBadgeDialogOpen: boolean
    getVariable: (name: string) => any
    setVariable: (name: string, value: any) => void
    addToVariable: (name: string, value: number) => void
    clearVariables: () => void
    unlockBadge: (name: string) => void
    openBadgeDialog: () => void
    closeBadgeDialog: () => void
}

export const useVariablesStore = create<VariablesRFState>((set, get) => ({
    variables: {},
    isBadgeDialogOpen: false,
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
        }
    },
    openBadgeDialog: () => {
        set({
            isBadgeDialogOpen: true
        })
    },
    closeBadgeDialog: () => {
        set({
            isBadgeDialogOpen: false
        })
    }
}))