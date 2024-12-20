import pieceSet from "./pieceSet";
import safePath from "./safePath";


function kingMoveControl(set,terms,bs) {
    let availableMoves = {};
    let castlingPieces = bs.castlingPieces;  
    let canKingSideCastle = true;
    let canQueenSideCastle = true;
    // let checkPieces = bs.checkPieces;
    // let checkPiecesPath = bs.checkPiecesPath;
    // let checkingSet = bs.checkingSet;
    // let countForMoves = bs.countForMoves;
    let currentPosition = bs.currentPosition;  
    let currTile = '';
    let eightPointX = terms.eightPointX;
    let isCheck = bs.isCheck;
    let isDoubleCheck = bs.isDoubleCheck;
    // let kingPath = {};
    let startTile = terms.startTile;
    // let tentativePath = {};
    let tiles = terms.tiles;
    let x = terms.x;
    let y = terms.y;
    
    
    let oppSet = set =='white' ? 'black':'white';
    let kingSide = set =='white' ? 'h1' : 'h8';
    let queenSide = set =='white' ? 'a1' : 'a8';
    let castlingTileKingSide = set =='white' ? 'g1' : 'g8';
    let castlingTileQueenSide = set =='white' ? 'c1' : 'c8';
    let direction = ['topLeft','topMid','topRight','rightMid','rightBottom','bottomMid','bottomLeft','leftMid'];

    const side = {
        topLeft : (1<eightPointX &&  8>y) ? true : false,
        topMid : ( 8>y) ? true : false,
        topRight : (8>eightPointX &&  8>y) ? true : false,
        rightMid : (8>eightPointX) ? true : false,
        rightBottom : (8>eightPointX &&  1<y) ? true : false,
        bottomMid : (1<y) ? true : false,
        bottomLeft : (1<eightPointX &&  1<y) ? true : false,
        leftMid : (1<eightPointX ) ? true : false,
        
    }


            
    direction.forEach(dir => {
        
        if (dir == 'topLeft') currTile = String.fromCharCode(x-1)+(y+1);
        if (dir == 'topMid') currTile = String.fromCharCode(x)+(y+1);
        if (dir == 'topRight') currTile = String.fromCharCode(x+1)+(y+1);
        if (dir == 'rightMid') currTile = String.fromCharCode(x+1)+(y);
        if (dir == 'rightBottom') currTile = String.fromCharCode(x+1)+(y-1);;
        if (dir == 'bottomMid') currTile = String.fromCharCode(x)+(y-1);
        if (dir == 'bottomLeft') currTile = String.fromCharCode(x-1)+(y-1);
        if (dir == 'leftMid') currTile = String.fromCharCode(x-1)+(y);
    
        if (side[dir]){
            if(!tiles[currTile]) {
                availableMoves[currTile] ={'tile':currTile,color:`#1211aa99`};
    
            }
            else if (pieceSet(tiles[currTile]) == oppSet) {
                availableMoves[currTile] ={'tile':currTile,color:`red`};
    
            }
        }
        
        
    });
    
    

    if (!(isCheck||isDoubleCheck)) {
        if (castlingPieces[startTile]) {
            if (castlingPieces[queenSide]&&!tiles[castlingTileQueenSide]) {
                for (let i = 1; i <= 3; i++) {
                    currTile = String.fromCharCode(x-i) + y;
                    if (tiles[currTile]) {
                        // console.log(currTile,countForMoves[currTile]);
                        
                        canQueenSideCastle = false;
                        break;
                    }    
                }                
                if ( canQueenSideCastle) availableMoves[castlingTileQueenSide] = {tile:castlingTileQueenSide,color:`#1211aa99`};                
            }


            
            if (castlingPieces[kingSide]&&!tiles[castlingTileKingSide]) {
                for (let i = 1; i <= 2; i++) {
                    currTile = String.fromCharCode(x+i) + y;
                    if (tiles[currTile]) {
                        canKingSideCastle = false;
                        break;
                    }    
                }
                
                
                
                if ( canKingSideCastle) availableMoves[castlingTileKingSide] = {tile:castlingTileKingSide,color:`#1211aa99`};

                
            }
        }
    }
        
    if ( currentPosition == startTile){
        terms.set = set;
    
      availableMoves =   {...safePath(availableMoves,bs,terms)};
        
    }
    
    
    return availableMoves;
}

export default kingMoveControl ;
