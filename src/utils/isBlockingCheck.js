import piece from "./piece";

function isBlockingCheck (capturingTile,bs,terms,availableMoves){
    let blackKingPosition = bs.blackKingPosition;
    let blockerX = terms.x;
    let blockerY = terms.y;
    let currentPosition = bs.currentPosition;;
    let currTile = 'o0';
    let direction = 'not set';
    let distance = 0;
    let pieceToMove = bs.pieceToMove;
    let path = {};
    let tiles  = terms.tiles;
    let set = terms.set;
    let whiteKingPosition = bs.whiteKingPosition;

    
    
    let setKing = set == 'white' ? whiteKingPosition : blackKingPosition ;
    let capturingTileX = capturingTile[0].charCodeAt(0);
    let capturingTileY = Number(capturingTile[1]);
    let capturePiece = tiles[capturingTile];
    let captureP = piece(capturePiece);
    

    
    
    // if (piece(tiles[currentPosition]) !== captureP) return false;
    
    switch (captureP) {
        case 'pawn':
            return false
            
        case 'knight':
            return false ;
        case 'king':
            return false ;
        case 'rook': 
        
        if(capturingTileY < blockerY && capturingTileX == blockerX) direction = 'top';
        else if (capturingTileY == blockerY && capturingTileX < blockerX) direction = 'right';
        else if(capturingTileY > blockerY && capturingTileX == blockerX) direction = 'bottom';
        else if (capturingTileY == blockerY && capturingTileX > blockerX) direction = 'left';
        
        if (direction == 'top') distance = 8 - capturingTileY;
        if (direction == 'right')  distance = capturingTileY;
        if (direction == 'bottom') distance = capturingTileY;
        if (direction == 'left') distance = 8 - capturingTileY;
        
        
        


        
        for (let i = 0; i < distance; i++) {
            switch (direction) {
                
                case 'top':
                    currTile = capturingTile[0] + (capturingTileY+i) ;
                    
                    if ( availableMoves[currTile]) {
                            
                        if ( currTile == capturingTile) path[currTile] = {'tile':currTile,color:`red`};
                        else path[currTile] = {'tile':currTile,color:`#1211aa99`};
                    }
                    if (tiles[currTile]) {
                        if (currTile == setKing) {    
                            return path;
                        }
                    }
                    break;

                case 'right':
                    currTile = String.fromCharCode(capturingTileX+i) + capturingTileY[1] ;
                    if ( availableMoves[currTile]) {
                            
                        if ( currTile == capturingTile) path[currTile] = {'tile':currTile,color:`red`};
                        else path[currTile] = {'tile':currTile,color:`#1211aa99`};
                    }
                    if (tiles[currTile]) {
                        if (currTile == setKing) {    
                            return path;
                        }
                    }
                            

                    break;

                case 'bottom':
                        currTile = capturingTile[0] + (capturingTileY-i) ;
                        
                    
                    
                        if ( availableMoves[currTile]) {
                            
                            if ( currTile == capturingTile) path[currTile] = {'tile':currTile,color:`red`};
                            else path[currTile] = {'tile':currTile,color:`#1211aa99`};
                        }
                        if (tiles[currTile]) {
                            if (currTile == setKing) {    
                                return path;
                            }
                        }
                    break;

                case 'left':
                    currTile = String.fromCharCode(capturingTileX+i) + capturingTileY[1] ;
                    if ( availableMoves[currTile]) {
                            
                        if ( currTile == capturingTile) path[currTile] = {'tile':currTile,color:`red`};
                        else path[currTile] = {'tile':currTile,color:`#1211aa99`};
                    }
                    if (tiles[currTile]) {
                        if (currTile == setKing) {    
                            return path;
                        }
                    }
                    break;
            
                default:
                    break;
            }
        }
        
            break;

        case 'bishop':            
            if(capturingTileY < blockerY && capturingTileX < blockerX) direction = 'topRight';
            else if (capturingTileY > blockerY && capturingTileX < blockerX) direction = 'bottomRight';
            else if(capturingTileY > blockerY && capturingTileX > blockerX) direction = 'bottomLeft';
            else if (capturingTileY < blockerY && capturingTileX > blockerX) direction = 'topLeft';
            
            if (direction == 'topRight') distance = 8 - capturingTileY;
            if (direction == 'bottomRight')  distance = capturingTileY;
            if (direction == 'bottomLeft') distance = capturingTileY;
            if (direction == 'topLeft') distance = 8 - capturingTileY;
            // console.log(distance);
            
            for (let i = 1; i < distance; i++) {
                switch (direction) {
                    case 'topRight':
                        currTile = String.fromCharCode(capturingTileX+i) + (capturingTileY+i) ;
                        if ( availableMoves[currTile]) {
                            
                            if ( currTile == capturingTile) path[currTile] = {'tile':currTile,color:`red`};
                            else path[currTile] = {'tile':currTile,color:`#1211aa99`};
                        }
                        if (tiles[currTile]) {
                            if (currTile == setKing) {    
                                return path;
                            }
                        }
                        break;

                    case 'bottomRight':

                        currTile = String.fromCharCode(capturingTileX+i) + (capturingTileY-i) ;
                        
                        if ( availableMoves[currTile]) {
                            
                            if ( currTile == capturingTile) path[currTile] = {'tile':currTile,color:`red`};
                            else path[currTile] = {'tile':currTile,color:`#1211aa99`};
                        }
                        if (tiles[currTile]) {
                            if (currTile == setKing) {    
                                return path;
                            }
                        }
                                

                        break;

                    case 'bottomLeft':
                        currTile = String.fromCharCode(capturingTileX-i) + (capturingTileY-i) ;
                        if ( availableMoves[currTile]) {
                            
                            if ( currTile == capturingTile) path[currTile] = {'tile':currTile,color:`red`};
                            else path[currTile] = {'tile':currTile,color:`#1211aa99`};
                        }
                        if (tiles[currTile]) {
                            if (currTile == setKing) {    
                                return path;
                            }
                        }
                        break;

                    case 'topLeft':
                        currTile = String.fromCharCode(capturingTileX-i) + (capturingTileY+i) ;
                        if ( availableMoves[currTile]) {
                            
                            if ( currTile == capturingTile) path[currTile] = {'tile':currTile,color:`red`};
                            else path[currTile] = {'tile':currTile,color:`#1211aa99`};
                        }
                        if (tiles[currTile]) {
                            if (currTile == setKing) {    
                                return path;
                            }
                        }
                        break;
                
                    default:
                        break;
                }
            }
            
            break;
        case 'queen' :
            if(capturingTileY < blockerY && capturingTileX < blockerX) direction = 'topRight';
            else if (capturingTileY > blockerY && capturingTileX < blockerX) direction = 'bottomRight';
            else if(capturingTileY > blockerY && capturingTileX > blockerX) direction = 'bottomLeft';
            else if (capturingTileY < blockerY && capturingTileX > blockerX) direction = 'topLeft';
            
            if (direction == 'topRight') distance = 8 - capturingTileY;
            if (direction == 'bottomRight')  distance = capturingTileY;
            if (direction == 'bottomLeft') distance = capturingTileY;
            if (direction == 'topLeft') distance = 8 - capturingTileY;
            
            for (let i = 1; i < distance; i++) {
                switch (direction) {
                    case 'topRight':
                        currTile = String.fromCharCode(capturingTileX+i) + (capturingTileY+i) ;
                        if ( availableMoves[currTile]) {
                            
                            if ( currTile == capturingTile) path[currTile] = {'tile':currTile,color:`red`};
                            else path[currTile] = {'tile':currTile,color:`#1211aa99`};
                        }
                        if (tiles[currTile]) {
                            if (currTile == setKing) {    
                                return path;
                            }
                        }
                        break;

                    case 'bottomRight':
                                            
                        currTile = String.fromCharCode(capturingTileX+i) + (capturingTileY-i) ;
                        if ( availableMoves[currTile]) {
                            
                            if ( currTile == capturingTile) path[currTile] = {'tile':currTile,color:`red`};
                            else path[currTile] = {'tile':currTile,color:`#1211aa99`};
                        }
                        if (tiles[currTile]) {
                            if (currTile == setKing) {    
                                return path;
                            }
                        }
                                

                        break;

                    case 'bottomLeft':
                        currTile = String.fromCharCode(capturingTileX-i) + (capturingTileY-i) ;
                        if ( availableMoves[currTile]) {
                            
                            if ( currTile == capturingTile) path[currTile] = {'tile':currTile,color:`red`};
                            else path[currTile] = {'tile':currTile,color:`#1211aa99`};
                        }
                        if (tiles[currTile]) {
                            if (currTile == setKing) {    
                                return path;
                            }
                        }
                        break;

                    case 'topLeft':
                        
                        currTile = String.fromCharCode(capturingTileX-i) + (capturingTileY+i) ;
                        if ( availableMoves[currTile]) {
                            
                            if ( currTile == capturingTile) path[currTile] = {'tile':currTile,color:`red`};
                            else path[currTile] = {'tile':currTile,color:`#1211aa99`};
                        }
                        if (tiles[currTile]) {
                            if (currTile == setKing) {    
                                return path;
                            }
                        }
                        break;
                
                    default:
                        break;
                }
            }
            return false;
        default:
            break;
    }

    
    
    

    
    
    return false
    
}
export default isBlockingCheck;