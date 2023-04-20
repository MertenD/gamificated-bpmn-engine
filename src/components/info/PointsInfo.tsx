import {LevelProgressBar} from "./LevelProgressBar";
import CoinsInfo from "./CoinsInfo";
import React from "react";

export default function PointsInfo() {
     return (
         <div style={{
             display: "flex",
             flexDirection: "row",
             justifyContent: "space-between",
             marginLeft: 30,
             marginRight: 30,
             marginTop: 50,
             marginBottom: 50
         }}>
             <LevelProgressBar color={"tomato"} /> { /* Will only be shown when the user can gain experience in the process */ }
             <CoinsInfo />
         </div>
     )
}