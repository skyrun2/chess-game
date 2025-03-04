
function directionSetter(king,piece){
    let direction = "";
    if (king.y - piece. y > 0) direction = "top";
    else if(king.y - piece.y < 0) direction = "bottom";

    if(king.x - piece.x > 0) direction += "right";
    if(king.x - piece.x < 0) direction += "left";
    return direction
}
export default directionSetter; 