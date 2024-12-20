// import piece from "./piece";
import pieceSet from "./pieceSet";

function checkEffects(bs,ts) {
    let checkPieces = bs.checkPieces;
    let whiteKing = bs.whiteKingPosition;
    let blackKing = bs.blackKingPosition;
    let tiles = ts.tiles;

    let targetKing = '';
    // let pieceToMove = '';
    // let p = '';
    let set = '';
    let checkTile ;
    let kingTile ;
    // let oppSet = '';
    for (const checkPiece in checkPieces) {
        // p = piece(tiles[checkPiece]);
        set = pieceSet(tiles[checkPiece]);
        
        
        checkTile = document.getElementById(checkPiece);
        
        
        checkTile.classList.remove('check');
        


        checkTile.classList.add('check');
        
        
    }
    targetKing = set == 'white' ? blackKing : whiteKing;
    kingTile = document.getElementById(targetKing);
    
    kingTile.classList.remove('check');
        
    kingTile.classList.add('check');
    
    
    
}
export default checkEffects;