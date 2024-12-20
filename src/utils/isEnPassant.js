// import piece from "./piece";
import pieceSet from "./pieceSet";

function isEnPassant(payload,bs) {
    let pieceToMove = payload.pieceToMove;
    // let p = piece(payload.pieceToMove);
    let set = pieceSet(pieceToMove);
    let passant = bs.passant;
    let newPosition = payload.newPosition;
    let capture = set == 'white' ? newPosition[0]+(newPosition[1]*1-1) : newPosition[0]+(newPosition[1]*1+1);
    
    
    
    
    if (passant.length){        
        if (passant[0].tile == capture) {
            return true
        }
        else return false
    }
    else    return false;
    

    
    
}
export default isEnPassant;