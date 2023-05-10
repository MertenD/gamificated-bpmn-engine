import {create} from "zustand";
import {BpmnDiagram} from "../model/Bpmn";

export type MenuRFState = {
    uploadedProcesses: {name: string, bpmnDiagram: BpmnDiagram}[]
    addUploadedProcess: (name: string, bpmnDiagram: BpmnDiagram) => void
    removeUploadedProcess: (name: string) => void
}

export const useMenuStore = create<MenuRFState>((set, get) => ({
    uploadedProcesses: [],
    addUploadedProcess: (name: string, bpmnDiagram: BpmnDiagram) => {
        // Replace old one with the same name with new one if it already exists
        if (get().uploadedProcesses.filter((process => process.name === name)).length > 0) {
            get().removeUploadedProcess(name)
        }
        set({
            uploadedProcesses: [...get().uploadedProcesses, {
                name: name,
                bpmnDiagram: bpmnDiagram
            }]
        })
    },
    removeUploadedProcess: (name: string) => {
        set({
            uploadedProcesses: get().uploadedProcesses.filter((process) =>
                process.name !== name
            )
        })
    }
}))