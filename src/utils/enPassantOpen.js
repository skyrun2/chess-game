import piece from "./piece";
import pieceSet from "./pieceSet";


function enPassantOpen(payload) {
    let currentPosition = payload.currentPosition;
    let newPosition = payload.newPosition ;
    console.log(payload);
    
    let p = piece(payload.pieceToMove);
    let currY = currentPosition[1];
    let newY = newPosition[1];
    let set = pieceSet(payload.pieceToMove);
    let baseline = set == 'white' ? 2 : 7;
    let canPassant = set == 'white' ? 4 : 5;
    let isOpen = !!(p == 'pawn' && currY == baseline && newY == canPassant);
    if (isOpen) return {tile :newPosition, set:set};
    else return null
    
    
}
export default enPassantOpen;