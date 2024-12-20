function setClass(id,tiles) {
    const piece = tiles[id];
    if (piece[1] == '_') return piece.substring(2);
    else return piece;
}
export default setClass