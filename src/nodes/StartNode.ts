import {BasicNode} from "./BasicNode";
import React from "react";

export class StartNode implements BasicNode {
    id: string;

    constructor(id: string) {
        this.id = id
    }

    run(): React.ReactNode {
        return undefined;
    }
}