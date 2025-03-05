

function handleSetTileHistory(bs) {
    const payload = {};
    const tiles = bs.currentTiles;
    const notationOrder = bs.notationOrder;
    const moveCount = bs.moveCount;

    payload.tiles = tiles;
    payload.notationOrder = notationOrder;
    payload.moveCount = moveCount;
    return payload;
}

export default handleSetTileHistory; 