import React from "react";
import {useChallengeStore} from "../../stores/challengeStore";
import {GamificationType} from "../../model/GamificationType";
import {BadgeGamificationOptions, PointsGamificationOptions} from "../../model/GamificationOptions";

export default function ChallengeInfo() {

    const challengeState = useChallengeStore()

    return (
        <div>
            { challengeState.isChallengeRunning && (
                (() => {
                    if (challengeState.isChallengeTimeFailed) {
                        return <div style={{marginTop: 30, color: "tomato", fontWeight: "bold"}}>
                            Challenge failed
                        </div>
                    } else if (challengeState.isChallengePaused) {
                        return <div style={{marginTop: 30, color: "orange", fontWeight: "bold"}}>
                            Challenge paused
                        </div>
                    } else {
                        return <div style={{ marginTop: 30, color: "#22935B", fontWeight: "bold" }}>
                            You are currently in a time challenge. You have { challengeState.remainingSeconds?.toFixed(2) } seconds to complete the green tasks to earn
                            { (challengeState.runningChallengeData?.rewardType === GamificationType.POINTS ?
                                " " + (challengeState.runningChallengeData.gamificationOptions as PointsGamificationOptions).pointsForSuccess + " " + (challengeState.runningChallengeData.gamificationOptions as PointsGamificationOptions).pointType
                                : " a " +  (challengeState.runningChallengeData?.gamificationOptions as BadgeGamificationOptions).badgeType)
                            }
                        </div>
                    }
                })()
            ) }
        </div>
     )
}