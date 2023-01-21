import React, {useEffect, useState} from "react"
import {BasicNode} from "../nodes/BasicNode";
import {NodeType} from "../model/NodeType";
import {NextNodeKey} from "../model/NextNodeKey";
import {useStore} from "../store";

// TODO Irgendwie will ich den Map Typen in einen eigenen type auslagern, weil ich den an mehreren Stellen (Engine, App, Transformer) benutze
export interface EngineProps {
    nodeMap: Map<string, { node: BasicNode, next: Record<string, string> | null }>
}

export default function Engine(props: EngineProps) {

    const [currentNode, setCurrentNode] = useState<{ node: BasicNode, next: Record<string, string> | null }>()
    const state = useStore((state) => state)

    useEffect(() => {
        const firstNode = Array.from(props.nodeMap.values()).find(({node}) =>
            node.nodeType === NodeType.START_NODE
        );
        if (firstNode) {
            setCurrentNode(firstNode)
        }
    }, [props.nodeMap])

    const nextNode = (nextNodeKey: NextNodeKey = NextNodeKey.ONLY) => {
        if (!currentNode || currentNode.next === null) {
            console.log("End of process")
            return
        }
        const newNode = props.nodeMap.get(currentNode.next[nextNodeKey])
        if (newNode) {
            setCurrentNode(newNode)
        }
    }

    useEffect(() => {
        console.log("Current Variables", state.variables)
    }, [currentNode])

    return (
        <div>
            { currentNode !== undefined && (
                currentNode.node.run(state, nextNode)
            ) }
        </div>
    )
}