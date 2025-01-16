import piece from "./piece";
import pieceSet from "./pieceSet";
import pawnMoveControl from "./pawnMoveControl";
import rookMoveControl from "./rookMoveControl";
import bishopMoveControl from "./bishopMoveControl";
import knightMoveControl from "./knightMoveControl";
import kingMoveControl from "./kingMoveControl";
import checkPath from "./checkPath";
import queenMoveControl from "./queenMoveControl";
import setMoves from "./setMoves";

function checkChecker (payload,bs,tiles) {
    let allMoves = payload.allMoves;
    let blackKingPosition = bs.blackKingPosition;
    let whiteKingPosition = bs.whiteKingPosition;
    let passant = bs.passant;
    let pieceToMove = bs.pieceToMove;
    let currentPosition = bs.currentPosition;
    let p = '';
    let set = pieceSet(pieceToMove);
    let targetKing = set == 'white' ? blackKingPosition : whiteKingPosition;
    let checkPieces = {}
    
    // console.log({whiteKingPosition,blackKingPosition});
    
    const terms = {
        tiles: tiles
    }
    // let allMoves = {}
    let countForMoves = {}
    let count = 0
    let updatedCount = 0;
    let newTile = {};
    let updatedTile = {};
    let isCheck = false;
    let isDoubleCheck = false;
    
    
    for (const tilePiece in allMoves) {
        
        for (const tile in allMoves[tilePiece].path) {            
            if (!countForMoves[tile]) {                
                countForMoves[tile] = { count:1,pieces:{[tilePiece]:tiles[tilePiece]}};   
            }
            else if (countForMoves[tile]) {  
                updatedCount = countForMoves[tile].count + 1;
                newTile = {[tilePiece]:tiles[tilePiece]};
                updatedTile = {...countForMoves[tile].pieces,...newTile}
                countForMoves[tile] = { count:updatedCount,pieces:updatedTile}                
            }           
        }   
        
        count += Object.keys(allMoves[tilePiece].path).length;
        
    }
    
    
    
    
    if (countForMoves[targetKing]) {
        checkPieces = countForMoves[targetKing].pieces;
        console.log({kingmoves:countForMoves[targetKing],chckingpice:countForMoves[currentPosition]});
        
        
        isCheck =   Object.keys(countForMoves[targetKing].pieces).length == 1 ? true : false
        isDoubleCheck =   Object.keys(countForMoves[targetKing].pieces).length > 1 ? true : false
            
    }
    
    
    if(!Object.keys(checkPieces).length) return {'checkPieces':null,'countForMoves':countForMoves,'totalCount':count,isCheck,isDoubleCheck};
    
    return {'checkPieces':checkPieces,'countForMoves':countForMoves,'totalCount':count};
    
    
    
    
}
export default checkChecker;