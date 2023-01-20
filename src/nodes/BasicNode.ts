import React from "react";

export interface BasicNode {
    id: string
    run: (nextNode: () => void) => React.ReactNode
}