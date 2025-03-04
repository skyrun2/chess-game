import distanceSetter from "./distanceSetter";
import piece from "./piece";

function isValidDirection(piece1,direction,payload) {
    const p = piece(piece1);
    const top = {"rook":"rook","queen":"queen","king":"king"};
    const topRight = {"bishop":"bishop","queen":"queen","king":"king"};
    const right = {"rook":"rook","queen":"queen","king":"king"};
    const bottomRight = {"bishop":"bishop","queen":"queen","king":"king"};
    const bottom = {"rook":"rook","queen":"queen","king":"king"};
    const bottomLeft = {"bishop":"bishop","queen":"queen","king":"king"};
    const left = {"rook":"rook","queen":"queen","king":"king"};
    const topLeft = {"bishop":"bishop","queen":"queen","king":"king"};
    let distance = 0;
    const king = payload.king;
    const attackingPiece = payload.attackingPiece;
    let isPiecePlacement = false;
    
    if (p == "pawn") return false;
    if (p == "king") return false;
    if (p == "knight") return false;

    switch (direction) {
        case "top":
            return !!top[p];
            
        case "topright":
            if (topRight[p]) {
                
                distance = distanceSetter(king,attackingPiece,direction) ;
                isPiecePlacement = !!(king.x-distance == attackingPiece.x) && !!(king.y - distance == attackingPiece.y);                
                if(isPiecePlacement) return true;
                return false;
            }

            break;
            
        case "right":
            return !!right[p];
            
        case "bottomright":            
            if (bottomRight[p]) {
                distance = distanceSetter(king,attackingPiece,direction);
                isPiecePlacement = (king.x-distance == attackingPiece.x) && (distance + king.y   == attackingPiece.y);
                if(isPiecePlacement) return true;
                return false;
                
            }
            break;
            
        case "bottom":
            return !!bottom[p];
            
        case "bottomleft":
            if (bottomLeft[p]) {
                distance = distanceSetter(king,attackingPiece,direction);
                isPiecePlacement = (king.x + distance == attackingPiece.x) && (distance + king.y   == attackingPiece.y);
                if(isPiecePlacement) return true;
                return false;                
            }
            break;
        case "left":
            return !!left[p];
            
        case "topleft":
            if (topLeft[p]) {
                distance = distanceSetter(king,attackingPiece,direction);
                isPiecePlacement = (king.x + distance == attackingPiece.x) && (king.y - distance   == attackingPiece.y);
                if(isPiecePlacement) return true;
                return false;                
            }
            break;        
    
        default:            
            break;
    }
    
}
export default isValidDirection;