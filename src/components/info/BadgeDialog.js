import Dialog from '@mui/material/Dialog';
import {useVariablesStore} from "../../stores/variablesStore";
import {DialogContent, DialogTitle} from "@mui/material";
import React from "react";
import ConfirmButton from "../controls/ConfirmButton";

export function BadgeDialog() {

    const variableState = useVariablesStore()

    return (
        <Dialog
            open={variableState.isBadgeDialogOpen}
            onClose={variableState.closeBadgeDialog}
            style={{
                backgroundColor: "#99999930"
            }}
            PaperProps={{ sx: {
                border: 2,
                borderColor: "#22935B",
                borderRadius: 4,
                backgroundColor: "transparent"
            }}}
        >
            <div style={{
                backgroundColor: "#282c34"
            }}>
                <DialogTitle style={{
                    color: "white",
                    textAlign: "center"
                }}>You Received A Badge</DialogTitle>
                <DialogContent>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                        <div style={{
                            color: "#22935B",
                            fontWeight: "bold",
                            fontSize: 35,
                            marginBottom: 15
                        }}>
                            { variableState.unlockedBadgeName }
                        </div>
                        <ConfirmButton onConfirm={() => variableState.closeBadgeDialog()} />
                    </div>
                </DialogContent>
            </div>
        </Dialog>
    );
}
