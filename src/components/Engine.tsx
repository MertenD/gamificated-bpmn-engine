import React from "react"
import {BasicNode} from "../nodes/BasicNode";

export type NodeMap = {
    [key: string]: { node: BasicNode, next: string | null }
}

export interface EngineProps {
    nodeMap: NodeMap
}

export default function Engine(props: EngineProps) {

    const nextNode = () => {
        console.log("Next node")
    }

    return (
        <div>
            { Object.values(props.nodeMap).map(({ node, next}) => {
                return node.run(nextNode)
            }) }
        </div>
    )
}