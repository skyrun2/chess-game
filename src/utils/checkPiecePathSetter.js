
function checkPiecePathSetter(checkPieceMoves,piece,targetKing){
    let pieceX = String(piece[0]).charCodeAt(0);
    let pieceY = Number(piece[1]);
    let kingX = String(targetKing[0]).charCodeAt(0);
    let kingY = Number(targetKing[1]);
    console.log({checkPieceMoves,piece,targetKing});
    switch (checkPieceMoves.piece) {
        case "queen":{
            console.log({pieceX,pieceY,kingX,kingY});
            
        }
            
            break;
    
        default:
            break;
    }
    
}
export default checkPiecePathSetter;