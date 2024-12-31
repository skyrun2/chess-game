import setNotation from "./setNotation";

function handleSetNotations(bs) {
    const payload = {};
    payload.moveNotation =  setNotation(payload,bs);
    
    return payload;
}
export default handleSetNotations;