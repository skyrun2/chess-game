function pieceSet(piece) {
    if (!piece) return null
    if (piece[1] == '_'){  
         return 'black';
        }
    else{
        return  'white';
    }
}
export default pieceSet