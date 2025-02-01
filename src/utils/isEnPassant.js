// import piece from "./piece";
import pieceSet from "./pieceSet";

function isEnPassant(bs,ts) {
    let pieceToMove = bs.pieceToMove;
    let set = pieceSet(pieceToMove);
    let passant = bs.passant;
    let newPosition = bs.newPosition;
    let x = newPosition[0];
    let y = newPosition[1]*1;
    let capture = set == 'white' ? x+(y-1) : newPosition[0]+(y+1);
    
    
    
    
    
    
    if (passant){        
        if(passant.length){            
            
            
            if (passant[0].tile == capture) {
                return true
            }
            else return false
        }
    }
    else    return false;
    

    
    
}
export default isEnPassant;