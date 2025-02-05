import setMoves from "./setMoves";





function legalMoves(boardState,tileState) {
     
    // let direction = [];
    
    let startTile = boardState.currentPosition;
    let allMoves = boardState.allMoves;

    
    let tiles = tileState.tiles;
    let passant = boardState.passant;
    
    
    // let checkPieces = boardState.checkPieces;
    let eightPointX =  Number(startTile[0].charCodeAt()) - 96;
    let y = Number(startTile[1])*1;
    let topRight = Math.min(8-eightPointX,8-y);
    let topLeft = Math.min(eightPointX-1,8-y);
    let bottomLeft = Math.min(eightPointX-1,y-1);
    let bottomRight = Math.min(8-eightPointX,y-1);
    
    
    const terms = {
        x :  Number(startTile[0].charCodeAt()),
        eightPointX :  Number(startTile[0].charCodeAt()) - 96,
        y : Number(startTile[1])*1,
        topRight: topRight,
        bottomRight: bottomRight,
        bottomLeft: bottomLeft,
        topLeft : topLeft,
        startTile : startTile,
        tiles: tiles
    }

    function piece(piece) {
        if(!piece) return null  
        return piece[1]=='_' ?  piece.substring(2):piece;    
    }
    

        
    return setMoves(startTile,boardState,tileState);
    
    
    
    
    
    
    
}


export default legalMoves 