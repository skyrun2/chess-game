
function checkPath(p,tile,targetKing) {
    let pieceX = tile[0].charCodeAt(0);  //WHERE X IS THE ALPHABET PART I.E (A1) X IS A
    let pieceY = Number(tile[1]);               //WHERE 1 IS THE NUMBER PART I.E (A1) Y IS 1
    let kingX = targetKing[0].charCodeAt(0); //WHERE X IS THE ALPHABET PART I.E (A1) X IS A
    let kingY = Number(targetKing[1]);          //WHERE 1 IS THE NUMBER PART I.E (A1) Y IS 1
    let direction = null;
    let distance = 0;
    let currTile = '';
    let path = {}

    
    switch (p) {
        case 'pawn':
            path[tile] = tile;
            break;
        case 'rook':
            path[tile] = tile;
            if(pieceY < kingY && pieceX == kingX) direction = 'top';
            else if (pieceY == kingY && pieceX < kingX) direction = 'right';
            else if(pieceY > kingY && pieceX == kingX) direction = 'bottom';
            else if (pieceY == kingY && pieceX > kingX) direction = 'left';
            
            
            
            if (direction == 'top') distance = kingY - pieceY;
            if (direction == 'right')  distance = kingX - pieceX;
            if (direction == 'bottom') distance = pieceY - kingY;
            if (direction == 'left') distance = pieceX - kingX;
            
            
            for (let i = 1; i < distance; i++) {
                switch (direction) {
                    case 'top':
                        currTile = tile[0] + (pieceY+i) ;
                        path[currTile] = currTile;
                        break;

                    case 'right':
                        currTile = String.fromCharCode(pieceX+i) + tile[1];
                        path[currTile] = currTile;

                        break;

                    case 'bottom':
                        currTile = tile[0] + (pieceY-i) ;
                        path[currTile] = currTile;
                        break;

                    case 'left':
                        currTile = String.fromCharCode(pieceX-i) + tile[1];
                        path[currTile] = currTile;

                        break;
                
                    default:
                        break;
                }
                
            }
            
            break;
        case 'bishop':        
            path[tile] = tile;
            if(pieceY < kingY && pieceX < kingX) direction = 'topRight';
            else if (pieceY > kingY && pieceX <kingX) direction = 'bottomRight';
            else if(pieceY > kingY && pieceX > kingX) direction = 'bottomLeft';
            else if (pieceY < kingY && pieceX > kingX) direction = 'topLeft';
            
            
            
            if (direction == 'topRight') distance = kingY - pieceY;
            if (direction == 'bottomRight')  distance = kingX - pieceX;
            if (direction == 'bottomLeft') distance = pieceY - kingY;
            if (direction == 'topLeft') distance = pieceX - kingX;
            
            for (let i = 1; i < distance; i++) {
                switch (direction) {
                    case 'topRight':
                        currTile = String.fromCharCode(pieceX+i) + (pieceY+i) ;
                        path[currTile] = currTile;
                        break;

                    case 'bottomRight':
                        currTile = String.fromCharCode(pieceX+i) + (pieceY-i) ;
                        path[currTile] = currTile;
                        
                        

                        break;

                    case 'bottomLeft':
                        currTile = String.fromCharCode(pieceX-i) + (pieceY-i) ;
                        path[currTile] = currTile;
                        break;

                    case 'topLeft':
                        currTile = String.fromCharCode(pieceX-i) + (pieceY+i) ;
                        path[currTile] = currTile;

                        break;
                
                    default:
                        break;
                }
                
            }
            break;
        case 'knight':
            path[tile] = tile;
            
            break;
        case 'king':
            path[tile] = tile;
            break;
        case 'queen':
            path[tile] = tile;
            if(pieceY < kingY && pieceX == kingX) direction = 'top';
            else if(pieceY < kingY && pieceX < kingX) direction = 'topRight';
            else if (pieceY == kingY && pieceX < kingX) direction = 'right';
            else if (pieceY > kingY && pieceX <kingX) direction = 'bottomRight';
            else if(pieceY > kingY && pieceX == kingX) direction = 'bottom';
            else if(pieceY > kingY && pieceX > kingX) direction = 'bottomLeft';
            else if (pieceY == kingY && pieceX > kingX) direction = 'left';
            else if (pieceY < kingY && pieceX > kingX) direction = 'topLeft';
            
            
            
            
            
            if (direction == 'top') distance = kingY - pieceY;
            if (direction == 'topRight') distance = kingY - pieceY;
            if (direction == 'right')  distance = kingX - pieceX;
            if (direction == 'bottomRight')  distance = kingX - pieceX;
            if (direction == 'bottom') distance = pieceY - kingY;
            if (direction == 'bottomLeft') distance = pieceY - kingY;
            if (direction == 'left') distance = pieceX - kingX;
            if (direction == 'topLeft') distance = pieceX - kingX;
            // console.log({direction,distance});
            
            for (let i = 1; i < distance; i++) {
                switch (direction) {
                    case 'top':
                        currTile = tile[0] + (pieceY+i) ;
                        path[currTile] = currTile;
                        break;

                    case 'topRight':
                        currTile = String.fromCharCode(pieceX+i) + (pieceY+i) ;
                        path[currTile] = currTile;
                        break;
                    
                    case 'right':
                        currTile = String.fromCharCode(pieceX+i) + tile[1];
                        path[currTile] = currTile;

                        break;

                    case 'bottomRight':
                        currTile = String.fromCharCode(pieceX+i) + (pieceY-i) ;
                        path[currTile] = currTile;
                                            
                        break;

                    case 'bottom':
                        currTile = tile[0] + (pieceY-i) ;
                        path[currTile] = currTile;
                        break;

                    case 'bottomLeft':
                        currTile = String.fromCharCode(pieceX-i) + (pieceY-i) ;
                        path[currTile] = currTile;
                        break;


                    case 'left':
                        currTile = String.fromCharCode(pieceX-i) + tile[1];
                        path[currTile] = currTile;

                        break;
                        
                    case 'topLeft':
                        currTile = String.fromCharCode(pieceX-i) + (pieceY+i) ;
                        path[currTile] = currTile;

                        break;
                
                    default:
                        break;
                }
                
            }
            break;
    
        default:
            break;
    }
    
    
    return { tile: tile, path: path};
       
}

export default checkPath;