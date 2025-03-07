
import directionSetter from "./directionSetter";
import distanceSetter from "./distanceSetter";
import pathSetter from "./pathSetter";
import setPiece from "./piece";

function checkPiecePathSetter(checkPieceMoves,piece,targetKing){
    let pieceX = String(piece[0]).charCodeAt(0);
    let pieceY = Number(piece[1]);
    let kingX = String(targetKing[0]).charCodeAt(0);
    let kingY = Number(targetKing[1]);
    let eightPointPieceX = pieceX - 96;
    let eightPointKingX = kingX - 96;
    let king = {x:eightPointKingX,y:kingY};
    let attackingPiece = {x:eightPointPieceX,y:pieceY};
    let direction =  directionSetter(king,attackingPiece);
    let distance = distanceSetter(king,attackingPiece,direction);
    let path = {}

    
    
    switch ( setPiece(checkPieceMoves.piece)) {
        case "queen":
            path = pathSetter(distance,direction,piece);                
            break;
        case "pawn":
            path = pathSetter(distance,direction,piece);                
            break;
        case "rook":
            path = pathSetter(distance,direction,piece);                
            break;
        case "bishop":
            path = pathSetter(distance,direction,piece);                
            break;
        case "king":
            path = pathSetter(distance,direction,piece);                
            break;
        case "knight":
            path[piece] = piece;
            
            break;
    
        default:
            break;
    }

    
    return path;
    
}
export default checkPiecePathSetter;