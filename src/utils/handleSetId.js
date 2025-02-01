

function handleSetId(id,isCapture) {
    const payload= {}
    payload.id = id;
    payload.isCapture = isCapture ;  
    
    
    return payload
}

export default handleSetId;