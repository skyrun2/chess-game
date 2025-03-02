
function blockCheckPath(bs,ts,targetKingSetPiece) {
    const checkPiecePath = bs.checkPiecePath;
    const currentTiles = ts.currentTiles;
    const isCheck = bs.isCheck;
    const isDoubleCheck = bs.isDoubleCheck;
    const allMoves = bs.allMoves;
    const cfm = bs.cfm.cFM;
    const targetKing = bs.targetKing;
    const newPosition = bs.newPosition;
    let availableMoves = {};

    
    
    

    
    for (const path in targetKingSetPiece.path) {
        if (checkPiecePath[path]) {
            availableMoves[path] = {'tile':path,color:`#1211aa99`}
            if(currentTiles[path]) availableMoves[path] = {'tile':path,color:`red`}
        }
    }
    
    // console.log({availableMoves});
    
    return availableMoves;

}
export default blockCheckPath;