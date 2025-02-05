
function showPossibleMoves(moves) {

    
    


    if (moves) {
        console.log({moves});
        
        for (const move in moves) {
            
            
            
            document.getElementById(moves[move].tile).style.backgroundColor = moves[move].color;
            // if (moves.path[move]) {
                
                
            // }
        }
    }
    
    
}
export default showPossibleMoves;