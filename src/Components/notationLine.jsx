import useBoardState from "@/utils/boardState";


const NotationLine = () =>{
    const moveNotation = useBoardState((state)=> state.moveNotation);
    const moveCount = useBoardState((state)=> state.moveCount);

        
    if (moveCount) {
        return(
            
            moveNotation.map((e,i) =>{ 
                return(
                <p
                 key={i}>{e}</p>
                )})                

        )
    }        
    
}
export default NotationLine;