import ProcessUploadButton from "./ProcessUploadButton";
import {loadProcess} from "../../util/ProcessLoadingUtils";
import {useMenuStore} from "../../stores/menuStore";
import {Typography} from "@mui/material";

export interface MenuProps {
    onProcessStarted: () => void
}

export default function Menu(props: MenuProps) {

    const uploadedProcesses = useMenuStore((state) => state.uploadedProcesses)
    const addUploadedProcess = useMenuStore((state) => state.addUploadedProcess)
    const removeUploadedProcess = useMenuStore((state) => state.removeUploadedProcess)

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
        }}>
            <Typography variant="h2" style={{ margin: 100 }} >
                Gamificated BPMN Engine
            </Typography>
            { uploadedProcesses.map((process) => {
                return <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 40
                }}>
                    <div style={{
                        width: 500,
                        height: 80,
                        borderRadius: 20,
                        border: "3px solid #5271ff",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 20,
                        cursor: "pointer",
                        marginBottom: 20,
                        backgroundColor: "#DCE2FF",
                        userSelect: "none"
                    }} onClick={() => {
                        loadProcess(process).then(() => {
                            props.onProcessStarted()
                        })
                    }}>
                        <Typography variant="h5" >
                            { process.name }
                        </Typography>
                    </div>
                    <div style={{
                        marginLeft: 20,
                        fontSize: 40,
                        width: 20,
                        height: 80,
                        marginBottom: 20,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        userSelect: "none",
                        color: "tomato"
                    }} onClick={() => {
                        removeUploadedProcess(process.name)
                    }}>
                        <Typography variant="h3" >
                            x
                        </Typography>
                    </div>
                </div>
            }) }
            <ProcessUploadButton onProcessUploaded={(processName, bpmnDiagram) => {
                addUploadedProcess(processName, bpmnDiagram)
            }}/>
        </div>
    )
}