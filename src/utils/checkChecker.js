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
import handleAllMoves from "./handleAllMoves";
import cFM from "./countForMoves";


function checkChecker (payload,bs,tiles) {
    let allMoves = payload.allMoves;
    let blackKingPosition = bs.blackKingPosition;
    let whiteKingPosition = bs.whiteKingPosition;
    let passant = bs.passant;
    let pieceToMove = bs.pieceToMove;
    let currentPosition = bs.currentPosition;
    let p = piece(pieceToMove);
    let set = pieceSet(pieceToMove);
    let oppSet = set == 'white' ? 'black' : 'white';
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
    let newMoves = {}
    let updatedTile = {};
    let isCheck = false;
    let isDoubleCheck = false;
    let checkMate = false;
    
    payload.allMoves = allMoves;
    payload.tiles = tiles;
    countForMoves = cFM(payload).countForMoves;
    count = cFM(payload).count
    
    
    
    
    if (countForMoves[targetKing]) {
        checkPieces = countForMoves[targetKing].pieces;
        isCheck =   Object.keys(countForMoves[targetKing].pieces).length == 1 ? true : false
        isDoubleCheck =   Object.keys(countForMoves[targetKing].pieces).length > 1 ? true : false
        
        let copyBs  = bs;
        let copyTs = {};
        let newCountForMoves = {};
        let freeCheckPieces = false;
        let trappedKing = false;
        let outOfReachPieces  = true;
        console.log({isCheck,isDoubleCheck});
        
        
        
        if (isCheck) {
            copyBs.checkPiecesPath = checkPath(p,currentPosition,targetKing);            
        }
        
        copyTs.tiles = tiles;
        copyBs.isCheck = isCheck;
        copyBs.isDoubleCheck = isDoubleCheck;
        copyBs.checkingSet = set;
        newMoves = handleAllMoves(copyBs,copyTs); 
        payload.allMoves = newMoves;
        payload.tiles = tiles
        newCountForMoves = cFM(payload);
        trappedKing  = !!newMoves[targetKing];
        for (const checkPiece in checkPieces) {
            if (!newCountForMoves[checkPiece]) freeCheckPieces = true; 
            if (newCountForMoves[checkPiece]) freeCheckPieces = false; 
        }
        for (const piece in newMoves) {
            if (pieceSet(newMoves[piece].piece)==oppSet) {
                if (Object.keys(newMoves[piece].path).length) {
                    console.log(piece);
                    
                    outOfReachPieces = false;    
                }
                
                    checkMate = freeCheckPieces&&trappedKing&&newMoves&&outOfReachPieces            
                
                console.log({freeCheckPieces,trappedKing,newMoves,outOfReachPieces});
                console.log({checkMate:checkMate});
                
                        
            }
        }
        
        
        
        
        
        
        
         
        
    }
    
    if(isCheck||isDoubleCheck) return {'checkPieces':checkPieces,'countForMoves':countForMoves,'totalCount':count,newMoves,checkMate,isCheck,isDoubleCheck};
    
    else return {'checkPieces':null,'countForMoves':countForMoves,'totalCount':count,isCheck,isDoubleCheck,checkMate};
    
    
    
    
    
}
export default checkChecker;