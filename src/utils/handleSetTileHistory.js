

function handleSetTileHistory(bs,ts) {
    const payload = {};
    const tiles = ts.tiles;
    const notationOrder = bs.notationOrder;
    const moveCount = bs.moveCount;

    payload.tiles = tiles;
    payload.notationOrder = notationOrder;
    payload.moveCount = moveCount;
    return payload;
}

export default handleSetTileHistory;