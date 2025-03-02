
function pathSetter(distance,direction,startTile){
    let path = {};
    let x = String(startTile[0]).charCodeAt(0);
    let y = Number(startTile[1]);
    let currTile = "";
    
    for (let i = 0; i < distance; i++) {
        switch (direction) {
            case "top":
                currTile = startTile[0]+(y+i)                
                break;
            case "topright":
                currTile = String.fromCharCode(x+i)+(y+i);
                break;
            case "right":
                currTile = String.fromCharCode(x+i)+startTile[1];
                break;
            case "bottomright":
                currTile = String.fromCharCode(x+i)+(y-i);
                break;
            case "bottom":
                currTile = startTile[0]+(y-i);
                break;
            case "bottomleft":
                currTile = String.fromCharCode(x-i)+(y-i);
                break;
            case "left":
                currTile = String.fromCharCode(x-i)+startTile[1];
                break;
            case "topleft":
                currTile = String.fromCharCode(x-i)+(y+i);
                break;
            default:
                break;
        }
        path[currTile] = currTile;

        
        
    }
    return path;

}
export default pathSetter;