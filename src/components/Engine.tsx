import React, {useEffect, useState} from "react"
import {BasicNode} from "../nodes/BasicNode";
import {NodeType} from "../model/NodeType";

export interface EngineProps {
    nodeMap: Map<string, { node: BasicNode, next: string | null }>
}

export default function Engine(props: EngineProps) {

    const [currentNode, setCurrentNode] = useState<{ node: BasicNode, next: string | null }>(getFirstNode())

    function getFirstNode(): { node: BasicNode, next: string | null } {
        return Array.from(props.nodeMap).map(([id, { node, next }]) => {
            return { node, next }
        }).filter(({node, next}) => {
            return node.nodeType === NodeType.START_NODE
        })[0]
    }

    useEffect(() => {
        setCurrentNode(getFirstNode())
    }, [props.nodeMap])

    const nextNode = () => {
        if (currentNode.next === null) {
            console.log("End")
            return
        }
        const newNode = props.nodeMap.get(currentNode.next)
        if (newNode !== undefined) {
            setCurrentNode(newNode)
        }
    }

    return (
        <div>
            {/* Array.from(props.nodeMap).map(([id, { node, next}]) => {
                return node.run(nextNode)
            }) */}
            { currentNode !== undefined && (
                currentNode.node.run(nextNode)
            ) }
        </div>
    )
}