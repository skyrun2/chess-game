

function handleSetCurrentPosition(position,isPieceToMove,bs,ts) {
    const payload= {}
    payload.currentPosition = position;
    payload.isPieceToMove = isPieceToMove ;  
    console.log({isPresent:ts.isPresentTiles});
    
    
    if (isPieceToMove) {
        payload.pieceToMove = ts.tiles[position];
    }
    return payload
}

export default handleSetCurrentPosition;