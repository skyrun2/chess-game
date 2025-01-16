import piece from "./piece";
import pieceSet from "./pieceSet";


function enPassantOpen(bs) {
    let currentPosition = bs.currentPosition;
    let newPosition = bs.newPosition ;    
    let p = piece(bs.pieceToMove);
    let currY = currentPosition[1];
    let newY = newPosition[1];
    let set = pieceSet(bs.pieceToMove);
    let baseline = set == 'white' ? 2 : 7;
    let canPassant = set == 'white' ? 4 : 5;
    let isOpen = !!(p == 'pawn' && currY == baseline && newY == canPassant);
    if (isOpen) return {tile :newPosition, set:set};
    else return null
    
    
}
export default enPassantOpen;