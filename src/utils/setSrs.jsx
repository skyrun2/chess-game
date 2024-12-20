import pieceData from "./pieceData"

function setSrs(id,tiles) {
    if (tiles) return pieceData[tiles[id]]
        
}
export default setSrs