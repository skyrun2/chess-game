import pieceIs from "./pieceIs"

function defaultSetup() {
    const ds = {}
    for (let i = 0; i < 16; i++) {
        if ( i < 8) {
            ds[String.fromCharCode(97+i)+'8'] = pieceIs(i,'b')
        }
        else{
            // ds[String.fromCharCode(97+(i%8))+'7'] = pieceIs(i,'b')
        }
    }
    for (let i = 0; i < 16; i++) {
        if ( i < 8) {
            ds[String.fromCharCode(97+i)+'1'] = pieceIs(i,'w')
        }
        else{
            // ds[String.fromCharCode(97+(i%8))+'2'] = pieceIs(i,'w')
        }
    }
    
    return ds
}
 export default defaultSetup;