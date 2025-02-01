import piece from "./piece";
import pieceSet from "./pieceSet";
import checkPath from "./checkPath";
import handleAllMoves from "./handleAllMoves";
import cFM from "./countForMoves";
import safePath from "./safePath";
import isCheckMate from "./isCheckMate";


function checkChecker (payload,bs,tiles) {
    let allMoves = payload.allMoves;
    let blackKingPosition = bs.blackKingPosition;
    let whiteKingPosition = bs.whiteKingPosition;
    let pieceToMove = bs.pieceToMove;
    let currentPosition = bs.currentPosition;
    let p = piece(pieceToMove);
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
    let copyBs  = bs;
        let copyTs = {};        
    let updatedCount = 0;
    let newCountForMoves = {};
    let newTile = {};
    let newMoves = {};
    let updatedTile = {};
    let isCheck = false;
    let isDoubleCheck = false;
    let checkMate = false;
    



    payload.allMoves = allMoves;
    payload.tiles = tiles;

    if(Object.keys(allMoves).length){
        countForMoves = cFM(payload).countForMoves;
        count = cFM(payload).count
        // console.log({countForMoves,allMoves});
    }


    if (countForMoves[targetKing]) {
        checkPieces = countForMoves[targetKing].pieces;
        isCheck =   Object.keys(countForMoves[targetKing].pieces).length == 1 ? true : false
        isDoubleCheck =   Object.keys(countForMoves[targetKing].pieces).length > 1 ? true : false
    }

    if (isCheck) {
        copyBs.checkPiecesPath = checkPath(p,currentPosition,targetKing);            
    }
    copyTs.tiles = tiles;
    copyBs.isCheck = isCheck;
    copyBs.isDoubleCheck = isDoubleCheck;
    copyBs.checkingSet = set;
    copyBs.checkPieces =checkPieces;
    newMoves = handleAllMoves(copyBs,copyTs); 
    payload.allMoves = newMoves;
    payload.tiles = tiles;
    newCountForMoves = cFM(payload).countForMoves;

    let availableMoves ={};


    if(Object.keys(newMoves).length){
        copyBs.allMoves = newMoves;
        copyBs.countForMoves = newCountForMoves;
    
        terms.startTile =  blackKingPosition;
        terms.x = Number(blackKingPosition[0].charCodeAt());
        terms.y = Number(blackKingPosition[1])*1;
        terms.set = 'black'
        availableMoves =newMoves[blackKingPosition];
        // console.log({availableMoves,allMoves});
        
        let blackKingMoves = {...safePath(availableMoves,copyBs,terms)};
        
        availableMoves =newMoves[whiteKingPosition];
        terms.startTile =  whiteKingPosition;
        terms.x = Number(whiteKingPosition[0].charCodeAt());
        terms.y = Number(whiteKingPosition[1])*1;
        terms.set = 'black'
        let whiteKingMoves = {...safePath(availableMoves,copyBs,terms)};
        allMoves[blackKingPosition] = blackKingMoves;
        allMoves[whiteKingPosition] = whiteKingMoves;        
    }
    
    
    checkMate = isCheckMate(targetKing,copyBs,tiles);

        
    
    
    
    
    
    
    
    


    
    
    console.log({allMoves});
    
    if(isCheck||isDoubleCheck) return {'checkPieces':checkPieces,'countForMoves':countForMoves,'totalCount':count,newMoves,isCheck,isDoubleCheck,allMoves,checkMate,set};
    
    else return {'checkPieces':null,'countForMoves':countForMoves,'totalCount':count,isCheck,isDoubleCheck,allMoves,checkMate,set};
    
    
    
    
    
}
export default checkChecker;