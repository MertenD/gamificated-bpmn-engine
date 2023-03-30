import {LevelProgressBar} from "./LevelProgressBar";
import CoinsInfo from "./CoinsInfo";
import React from "react";

export default function PointsInfo() {
     return (
         <div style={{
             display: "flex",
             flexDirection: "row",
             justifyContent: "space-between"
         }}>
             <LevelProgressBar color={"tomato"} /> { /* Will only be shown when the user can gain experience in the process */ }
             <CoinsInfo />
         </div>
     )
}