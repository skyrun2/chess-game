
function showPossibleMoves(moves) {

    
    if (moves) {
        for (const move in moves) {
            if (Object.prototype.hasOwnProperty.call(moves, move)) {
                document.getElementById(moves[move].tile).style.backgroundColor = moves[move].color;
                
                
            }
        }
    }
    
    
}
export default showPossibleMoves;