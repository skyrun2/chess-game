// import piece from "./piece";
import pieceSet from "./pieceSet";

function checkEffects(bs) {
    let checkPieces = bs.checkPieces;
    let whiteKing = bs.whiteKingPosition;
    let blackKing = bs.blackKingPosition;
    let tiles = bs.currentTiles;

    let targetKing = '';
    let set = '';
    let checkTile ;

    
    let kingTile ;
    for (const checkPiece in checkPieces) {

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