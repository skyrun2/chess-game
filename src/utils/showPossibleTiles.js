
function showPossibleMoves(moves) {

    
    


    if (moves) {
        
        for (const move in moves.path) {
            
            
            
            document.getElementById(moves.path[move].tile).style.backgroundColor = moves.path[move].color;
            // if (moves.path[move]) {
                
                
            // }
        }
    }
    
    
}
export default showPossibleMoves;