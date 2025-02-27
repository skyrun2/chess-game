
function showPossibleMoves(moves) {
    if (moves) {        
        for (const move in moves) {        
            document.getElementById(move).style.backgroundColor = moves[move].color;            
        }
    }
    
    
}
export default showPossibleMoves;