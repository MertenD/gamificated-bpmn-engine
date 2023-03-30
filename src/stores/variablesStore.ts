import create from 'zustand';
import {useChallengeStore} from "./challengeStore";

export type VariablesRFState = {
    variables: Record<string, any>
    isBadgeDialogOpen: boolean
    unlockedBadgeName: string | undefined
    resetStoreValues: () => void
    getVariable: (name: string) => any
    setVariable: (name: string, value: any) => void
    addToVariable: (name: string, value: number) => void
    unlockBadge: (name: string) => void
    openBadgeDialog: (unlockedBadgeName: string) => void
    closeBadgeDialog: () => void
}

// TODO Das susbtitute Variables nur in den get/set und add variable Methoden ausführen

export const useVariablesStore = create<VariablesRFState>((set, get) => ({
    variables: {},
    isBadgeDialogOpen: false,
    unlockedBadgeName: undefined,
    resetStoreValues: () => {
        set({
            variables: {},
            isBadgeDialogOpen: false,
            unlockedBadgeName: undefined
        })
    },
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
    unlockBadge: (name: string) => {
        if (get().getVariable(name) !== undefined && get().getVariable(name) !== true) {
            get().setVariable(name, true)
            set({
                unlockedBadgeName: name
            })
            get().openBadgeDialog(name)
        }
    },
    openBadgeDialog: () => {
        set({
            isBadgeDialogOpen: true
        })
        useChallengeStore.getState().pauseChallenge()
    },
    closeBadgeDialog: () => {
        set({
            isBadgeDialogOpen: false
        })
        useChallengeStore.getState().resumeChallenge()
    }
}))