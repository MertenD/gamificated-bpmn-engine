import {BasicNode} from "./BasicNode";
import React from "react";

export class EndNode implements BasicNode {
    id: string;

    constructor(id: string) {
        this.id = id
    }

    run(): React.ReactNode {
        return undefined;
    }
}