import create from 'zustand';
import {useChallengeStore} from "./challengeStore";
import {useMinimapStore} from "./MinimapStore";

export type VariablesRFState = {
    variables: Record<string, any>
    isBadgeDialogOpen: boolean
    unlockedBadgeName: string | undefined
    resetStoreValues: () => void
    getVariable: (name: string) => any
    setVariable: (name: string, value: any) => void
    addToVariable: (name: string, value: number) => void
    unlockBadge: (name: string) => void
    getAllBadges: () => {name: string, isUnlocked: boolean}[]
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
        useMinimapStore.getState().setCurrentNodeRewardUnlocked()
        if (get().getVariable(name) !== undefined && get().getVariable(name) !== true) {
            get().setVariable(name, true)
            set({
                unlockedBadgeName: name
            })
            //get().openBadgeDialog(name)
        }
    },
    getAllBadges: (): {name: string, isUnlocked: boolean}[] => {
        return Object.entries(get().variables)
            .filter(([, value]) => typeof value === "boolean")
            .map(([name, value]) => ({name: name, isUnlocked: value}))
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