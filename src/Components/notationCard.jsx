import useBoardState from "@/utils/boardState";
import useTiles from "@/utils/useTiles";






const NotationCard = () =>{
    const notationOrder = useBoardState((state)=> state.notationOrder);
    // const notationOrder = useBoardState((state)=> state.notationOrder);
    const moveCount = useBoardState((state)=> state.moveCount);
    const tilesHistory = useTiles((state)=>state.tilesHistory);
    const resetTiles = useTiles((state)=>state.resetTiles);
    
    let orderCount = notationOrder.length;
    

    let backgroundColor = '';
    let buttonBG = '';
    let buttonBorder = '';
    let color = '';
    let total = '';
    let history = '';
    let count = 0
    let key = '';
    let payload = {}
    // console.log(tilesHistory);
    
    const handleOnClick = (e,i)=>{
        let btn = e.currentTarget;
        let id = btn.parentElement.id;
        payload.id = id
        payload.count = i+1;
        if (notationOrder.length == payload.count) {
            payload.isPresentTiles = true;
        }
        else if (notationOrder.length != payload.count) {
            payload.isPresentTiles = false;            
        }
        
        
        
        resetTiles(payload);
        

        

        
        
        
        
    }



    return (

        <div
        className=" notation-card h-[80%] pt-[4.rem]  bg-[#262522] overflow-y-scroll">
            {
                moveCount ? 
                <div
                className=" notation-order grid  h-fit">
                    {
                        notationOrder.map((e,i,a) =>{
                            
                            if ((i+1)%3 == 1) {                                             
                                count = (i+3)/3;
                            }
                            else if ((i+1)%3 == 2) {                    
                                count = (i+2)/3;
                            }
                            else if ((i+1)%3 == 0) {                                                            
                                count = (i+1)/3;
                            }       
                            total = (i+1) - count;
                            history = count +'_'+ (total+1)%2;
                            
                            

                            orderCount = i;
                            
                            backgroundColor = orderCount%6 > 2 ? '#ffffff05' : '';
                            buttonBG = orderCount ==  a.length-1 ? '#484745' : '';
                            buttonBorder = orderCount ==  a.length-1 ? '4px solid #5A5A57' : '';
                            color = orderCount%3  == 0  ? '#8F9191' : '#ffffffb8';
                            key =  i%3 == 0 ? e : history;
                            
                            
                            
                            
                            
                            return(
                                <div
                                key={key}
                                id={key}
                                style={
                                    {
                                        backgroundColor:backgroundColor,
                                        color: color,
                                    }
                                }
                                className={` pl-[.5rem] py-[.3rem]  font-bold text-[.8rem]`}
                                >
                                    {
                                    orderCount%3
                                    ?
                                        <button 
                                        style={{
                                            backgroundColor:buttonBG,
                                            borderBottom:buttonBorder,
                                            borderRadius:'2px'
                                        }}                 
                                        className=" px-[.2rem] text-center py-[.1rem]"                  
                                        onClick={e=>handleOnClick(e,i)}>
                                            <p>{e}</p>
                                        </button>
                                    :   
                                         <p>{e}</p>
                                    }
                                </div>
                            )
                        })
                        
                    }
                    {  orderCount%6 == 4 ?
                        <p
                        className=" notation py-[.3rem] bg-[#ffffff05] font-bold text-[.8rem]"></p>
                        :null                                      
                     } 
                </div>
                :null
            }  
                    
                    
        </div>
    )
    
    
}

export default NotationCard;