import Dialog from '@mui/material/Dialog';
import {useVariablesStore} from "../../stores/variablesStore";
import {Button, DialogContent, DialogTitle, Zoom} from "@mui/material";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom timeout={500} ref={ref} {...props} />;
});

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
                TransitionComponent={Transition}
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
                            <Button variant="contained" onClick={() => {
                                variableState.closeBadgeDialog()
                            }}>Confirm</Button>
                        </div>
                    </DialogContent>
                </div>
            </Dialog>
    );
}
