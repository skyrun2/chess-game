import piece from "./piece";
import pieceSet from "./pieceSet";


function setNotation(payload,bs) {
    let symbol 
    let turn = bs.turn ;
    let p = bs.pieceToMove;
    let set = pieceSet(p);
    let whiteKing = bs.whiteKingPosition;
    let blackKing =  bs.blackKingPosition;
    let targetKing = set == 'white' ? blackKing : whiteKing
    let currentPosition = bs.currentPosition;
    let newPosition = bs.newPosition;
    let notation = '';
    let isEnPassant = payload.isEnPassant;
    let castlingPieces = bs.castlingPieces;
    let castlingCondition = false;
    let castlingSide = '';
    let isCheck = bs.isCheck;
    let isDoubleCheck = bs.isDoubleCheck;
    let isCapture = bs.isCapture;
    let possibleMoves = payload.possibleMoves;
    
    
    let checkCondition = !!possibleMoves[targetKing];
    
    


    
    
    
    
    switch (piece(p)) {
        case 'pawn':
            symbol = '';
            if(isCapture) symbol = currentPosition[0];
            if(isEnPassant) symbol = currentPosition[0]+'x';            
            break;
        case 'knight':
            symbol = 'N';
            break;
        case 'rook':
            symbol = 'R';
            break;
        case 'bishop':
            symbol = 'B';
            break;
        case 'queen':
            symbol = 'Q';
            break;
        case 'king':{
            let okKing = !!castlingPieces[currentPosition];
            let okRook = false;
            let castlingKingSide = set == 'white' ? 'g1' : 'g8';
            let castlingQueenSide = set == 'white' ? 'c1' : 'c8';

            
            if (newPosition == castlingKingSide) {
                let castlingKingSideRook = set == 'white' ? 'h1' : 'h8';
                okRook = !!castlingPieces[castlingKingSideRook];
                castlingSide = 'kingSide';
            }
            if (newPosition == castlingQueenSide) {
                let castlingQueenSideRook = set == 'white' ? 'a1' : 'a8';
                okRook = !!castlingPieces[castlingQueenSideRook];
                console.log({okRook});
                
                castlingSide = 'queenSide';
                
            }
            
            castlingCondition = !!(okKing && okRook);

            symbol = 'K';
            break;
        }

        default:
            break;
    }
    
    
    if (isCapture) {
        notation = symbol+'x'+newPosition;
    }    
    else{
        notation = symbol+newPosition;
    }

    if (checkCondition) {
        notation = symbol+newPosition+'#';
    }

    if (castlingCondition){
        if (castlingSide == 'kingSide') notation = 'O-O';
        if (castlingSide == 'queenSide') notation = 'O-O-O';        
    }
    
    
    
    return notation;
    
    
    
    
    
    
    
    
    



}

export default setNotation;