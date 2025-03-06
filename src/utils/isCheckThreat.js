import directionSetter from "./directionSetter";
import distanceSetter from "./distanceSetter";
import isValidDirection from "./isValidDirection";
import pathSetter from "./pathSetter";
import piece from "./piece";
import pieceSet from "./pieceSet";

function isCheckThreat (bs){
    const allMoves = bs.allMoves;    
    const blackKingPosition = bs.blackKingPosition;
    const whiteKingPosition = bs.whiteKingPosition;
    const currentTiles = bs.currentTiles;
    let targetKing = "";
    let pSet = "";
    let direction = "";
    let newPieces = {}
    let checkThreats = {};

    
    
    for (const move in allMoves) {
        pSet = pieceSet(currentTiles[move]);
        targetKing = pSet == "white" ? blackKingPosition : whiteKingPosition;
        let pieceX = String(move[0]).charCodeAt(0);
        let pieceY = Number(move[1]);
        let kingX = String(targetKing[0]).charCodeAt(0);
        let kingY = Number(targetKing[1]);
        let eightPointPieceX = pieceX - 96;
        let eightPointKingX = kingX - 96;
        let king = {x:eightPointKingX,y:kingY};
        let distance = 0;
        let attackingPiece = {x:eightPointPieceX,y:pieceY};
        let payload = {king,attackingPiece};
        let path = {};
        let blockCount = 0;
        let isValidChecKThreat = false;
        let blocker = "";
        let set = pSet == "white" ? "whiteSet" : "blackSet" ;
        direction = directionSetter(king,attackingPiece);
         
        
        if (isValidDirection(currentTiles[move],direction,payload)) {
            distance = distanceSetter(king,attackingPiece,direction);            
            
            newPieces[move] = {piece:piece(currentTiles[move]),tile:move,direction:direction,distance:distance,targetKing:targetKing};
            for (const piece in newPieces) {
                path = {...pathSetter(distance,direction,piece)}
            }

            for (const tile in path) {
                if (currentTiles[tile]) {
                    if (tile !== move) {

                        blocker = tile;
                        if (blockCount > 1) {
                            blocker = null;
                        }
                        blockCount++;
                        
                    }
                }
            }
            isValidChecKThreat = (blockCount < 2 && blockCount > 0);
            isValidChecKThreat ? checkThreats[move] = {tile:move,path,blocker,set } : null ;
            
            
        }                                        
    }
    return checkThreats
    
}
export default isCheckThreat;