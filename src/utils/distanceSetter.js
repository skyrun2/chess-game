
function distanceSetter(king,piece,direction) {
    let distance = 0;
    switch (direction) {
        case "top":
            distance = king.y - piece.y;        
            
            break;
        case "topright":
            distance = king.x - piece.x;
            break;
        case "right":
            distance = king.x - piece.x;
            break;
        case "bottomright":
            distance = king.x - piece.x;
            break;
        case "bottom":
            distance = piece.y - king.y;
            break;
        case "bottomleft":
            distance = piece.x - king.x;
            break;
        case "left":
            distance = piece.x - king.x;
            break;
        case "topleft":
            distance = piece.x - king.x;
            break;
        default:
            break;
    }
    
    return distance
    
}
export default distanceSetter; 