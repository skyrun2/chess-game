
import cFM from "./countForMoves";
import handleAllMoves from "./handleAllMoves";
import piece from "./piece";
import pieceSet from "./pieceSet";


function safePath (availableMoves,bs,terms,ts) {
    
    let allMoves = bs.allMoves;
    let badTile = 'o0';
    // let castlingPieces = bs.castlingPieces;
    let blackKingPosition = bs.blackKingPosition;
    let checkPieces = bs.checkPieces;
    let checkPieceTile1 = '';
    let checkPieceTile2 = '';
    let checkPiece1 = '';
    let checkPiece2 = '';
    let checkingTileX = 'o';
    let checkingTileY = '0';
    let countForMoves = bs.countForMoves;
    let currentPosition = bs.currentPosition;
    let direction = 'unset';
    let downLeft  = 'o0';
    let downRight = 'o0';
    let downX  = 'o';
    let downY  = '0';
    let isCheck = bs.isCheck;
    let isDoubleCheck = bs.isDoubleCheck;
    let kingPath = {...availableMoves};
    
    
    let kingX = terms.x; 
    let kingY = terms.y; 
    // let path = {};
    let pieceToMove = bs.pieceToMove;
    let attackingSet = pieceSet(pieceToMove);
    let set  = terms.set;
    let startTile = terms.startTile;
    let tiles = terms.tiles;
    let whiteKingPosition = bs.whiteKingPosition;
    let targetKing = attackingSet == 'white' ? blackKingPosition : whiteKingPosition;

    let oppSet = set == "white" ? "black" : 'white';
    let upLeft = 'o0';
    let upRight = 'o0';
    let upX = 'o';
    let upY = '0';
    let payload = {};
    let castlingTileKingSideTile = set == 'white' ?  'g1' : 'g8';
    let castlingTileQueenSideTile = set == 'white' ?  'c1' : 'c8';
    let beforeCastlingTileKingSideTile = set == 'white' ?  'f1' : 'f8';
    let beforeCastlingTileQueenSideTile = set == 'white' ?  'd1' : 'd8';
    
    // console.log({availableMoves,startTile,allMoves});
    if(availableMoves){
        for (const move in availableMoves.path) {
            
            dangerPath(move);
        }

    }
    // console.log({startTile,kingPath});
    
    function dangerPath(move) {
        for (const piece in countForMoves[move].pieces) {
            
            if (pieceSet(countForMoves[move].pieces[piece]) == oppSet) delete kingPath.path[move];
            
        }
    }
    
    
    
    return kingPath
    
    
    
    
}
export default safePath;