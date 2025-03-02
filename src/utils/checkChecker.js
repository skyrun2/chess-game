import piece from "./piece";
import pieceSet from "./pieceSet";
import checkPiecePathSetter from "./checkPiecePathSetter";


function checkChecker (bs) {
    let blackKingPosition = bs.blackKingPosition;
    let whiteKingPosition = bs.whiteKingPosition;
    let pieceToMove = bs.pieceToMove;
    let countForMoves = bs.cfm;
    let allMoves = bs.allMoves;    
    let set = pieceSet(pieceToMove);
    let targetKing = set == 'white' ? blackKingPosition : whiteKingPosition;
    let checkPieces = {}    
    let isCheck = false;
    let isDoubleCheck = false;
    let notCheck = false;
    let checkPiecePath = {}
    
    if (countForMoves) {        
        if (countForMoves.cFM[targetKing]) {
            checkPieces = countForMoves.cFM[targetKing].pieces;
            if(countForMoves.cFM[targetKing].count == 1) {                
                for(const piece in checkPieces)  {                     
                    checkPiecePath = checkPiecePathSetter(allMoves[piece],piece,targetKing);
                }
                isCheck = true;
            }
            if(countForMoves.cFM[targetKing].count == 2) isDoubleCheck = true;

        }
        else notCheck = true;
    }
    
    
    return{notCheck,isCheck,isDoubleCheck,checkPieces,checkPiecePath,targetKing}
    
    
    
    
    
    
}
export default checkChecker;