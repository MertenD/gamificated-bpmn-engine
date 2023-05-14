import React, {useRef} from "react";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import {BpmnDiagram} from "../../model/Bpmn";
import {loadBpmnDiagramFromXml} from "../../util/Importer";

export interface ProcessUploadButtonProps {
    onProcessUploaded: (processName: string, bpmnDiagram: BpmnDiagram) => void
}

export default function ProcessUploadButton(props: ProcessUploadButtonProps) {

    const inputFile = useRef<HTMLInputElement | null>(null);

    const onUploaded = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null && event.target.files.length > 0) {
            const bpmnDiagram = await loadBpmnDiagramFromXml(event)
            const processName = event.target.files[0].name.split(".")[0]
            props.onProcessUploaded(processName, bpmnDiagram)
        }
    }

    return (
        <div style={{
            width: 500,
            height: 80,
            borderRadius: 20,
            border: "3px dashed black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 20,
            cursor: "pointer",
            userSelect: "none"
        }} onClick={() => {
            if (inputFile.current !== null) {
                inputFile.current.click();
            } else {
                console.warn("Error while uploading")
            }
        }}>
            <input accept={".bpmn"} type='file' id='file' ref={inputFile} hidden onChange={(event) => {
                onUploaded(event)
            }}/>
            Upload a new Process<br />+
        </div>
    )
}