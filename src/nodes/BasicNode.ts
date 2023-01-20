import React from "react";

export interface BasicNode {
    id: string
    run: () => React.ReactNode
}