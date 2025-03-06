
import cFM from "./countForMoves";
import handleAllMoves from "./handleAllMoves";
import piece from "./piece";
import pieceSet from "./pieceSet";


function safePath (kingSet,kingMoves,cfm,checkThreats) {
  let kingPath = {...kingMoves};
  let attackingSet = kingSet == "white" ? "blackSet" : "whiteSet";
    

    
        
    for (const moves in kingMoves) {
        
        if (cfm.cFM[moves]) {        
            if (cfm.cFM[moves][attackingSet]) {
                delete kingPath[moves];
            }
        }
        
    }
    for (const threat in checkThreats) {
                
        if (checkThreats[threat].set == attackingSet) {
            if(kingMoves[checkThreats[threat].blocker]) delete kingPath[checkThreats[threat].blocker];
        }
    }
    
    // if (kingSet == "black") {
    //     console.log({kingPath});
        
    // }
    
    
    
    return kingPath
    
    
    
    
}
export default safePath;