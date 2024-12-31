import piece from "./piece";


function setNotation(payload,bs) {
    let symbol 
    let turn = bs.turn ;
    let p = bs.pieceToMove;
    let currentPosition = bs.currentPosition;
    let newPosition = bs.newPosition;
    let notation = '';
    let isCapture = bs.isCapture;
    let isEnPassant = bs.isEnPassant;
    // let passant  = payload.passant;

    
    
    
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
        case 'king':
            symbol = 'K';
            break;
        default:
            break;
    }
    if (isCapture) {
        notation = symbol+'x'+newPosition;
        if( turn =='black')  notation = symbol+'x'+newPosition;
    }
    else{
        notation = symbol+newPosition;
        if( turn =='black')  notation =symbol+newPosition;

    }
    
    
    return notation;
    
    
    
    
    
    
    
    
    



}

export default setNotation;