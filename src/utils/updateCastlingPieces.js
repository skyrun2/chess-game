
function deleteProcess (tile,castlingPieces){
    let newCastlingPieces = {...castlingPieces};
    if(castlingPieces[tile].piece == "rook") 
        delete newCastlingPieces[tile];
    else if (castlingPieces[tile].piece == "king") {
        console.log(castlingPieces);
        for (const piece in castlingPieces) {
            if (castlingPieces[piece].set == castlingPieces[tile].set) {
                delete newCastlingPieces[piece];
            }
        }
    }
    
    return newCastlingPieces;
}

function updateCastlingPieces(bs, operation) {
    const castlingPieces = bs.castlingPieces;
    const id = bs.id;
    const currentPosition = bs.currentPosition;
    let newCastlingPieces = {...castlingPieces};


    if(operation == "toEmptyTile"){
        if(castlingPieces[currentPosition]){
            newCastlingPieces = deleteProcess(currentPosition,castlingPieces);
        }        
    }
    else if ( operation == "toCapture"){
        if(castlingPieces[currentPosition]){
            newCastlingPieces = deleteProcess(currentPosition,castlingPieces);
        }        
        if(castlingPieces[id]){
            newCastlingPieces = deleteProcess(currentPosition,castlingPieces);
        }        
    }
    
    return newCastlingPieces;
}
export default updateCastlingPieces;