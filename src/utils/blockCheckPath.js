
function blockCheckPath(bs,targetKingSetPiece) {
    const checkPiecePath = bs.checkPiecePath;
    const currentTiles = bs.currentTiles;    
    let availableMoves = {};

    
    
    

    
    for (const path in targetKingSetPiece.path) {
        if (checkPiecePath[path]) {
            availableMoves[path] = {'tile':path,color:`#1211aa99`}
            if(currentTiles[path]) availableMoves[path] = {'tile':path,color:`red`}
        }
    }
    
    
    return availableMoves;

}
export default blockCheckPath;