
function blockCheckPath(payload) {
    let isCheck = payload.isCheck;
    let set = payload.set;
    let checkingSet = payload.checkingSet;
    let checkPiecesPath = payload.checkPiecesPath;
    let availableMoves = payload.availableMoves;
    let isDoubleCheck = payload.isDoubleCheck;

    let pathBlockers = {};
    if (isCheck) {
        if (set !== checkingSet) {            
            if (checkPiecesPath) {                
                for (const path in checkPiecesPath.path) {                    
                    if (availableMoves[path]) {                        
                        pathBlockers[path] =  {'tile':path,color:`#1211aa99`};
                        
                    }
                }
                availableMoves = pathBlockers;

                
            }
        
        }
        
        
        
    }
    else if ( isDoubleCheck){
        
        
        if (set !== checkingSet) {
            availableMoves = {}
        }
        
        
    }
    return availableMoves;
}
export default blockCheckPath;