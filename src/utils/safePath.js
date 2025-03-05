
import cFM from "./countForMoves";
import handleAllMoves from "./handleAllMoves";
import piece from "./piece";
import pieceSet from "./pieceSet";


function safePath (kingSet,kingMoves,cfm) {
  let kingPath = {...kingMoves};
  let attackingSet = kingSet == "white" ? "blackSet" : "whiteSet";
    

    
        
    for (const moves in kingMoves) {
        
        if (cfm.cFM[moves]) {        
            if (cfm.cFM[moves][attackingSet]) {
                delete kingPath[moves]
            }
        }
        
    }
    if (kingSet == "black") {
        console.log({kingMoves,kingPath,cfm,attackingSet});        
    }
    
    
    
    return kingPath
    
    
    
    
}
export default safePath;