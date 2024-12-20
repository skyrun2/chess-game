function piece(piece) {
    if(!piece) return null  
    return piece[1]=='_' ?  piece.substring(2):piece;    
}

export default piece