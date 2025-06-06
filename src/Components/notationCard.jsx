import useBoardState from "@/utils/boardState";







const NotationCard = () =>{
    const notationOrder = useBoardState((state)=> state.notationOrder);
    const moveCount = useBoardState((state)=> state.moveCount);
    const resetTiles = useBoardState((state)=>state.resetTiles);
    const currentView = useBoardState((state)=>state.currentView);

    
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
                        
                        
                        notationOrder.map((e,i) =>{
                            
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
                            
                            key =  i%3 == 0 ? e : history;
                            backgroundColor = orderCount%6 > 2 ? '#ffffff05' : '';
                            buttonBG = key == currentView  ? '#484745' : '';
                            buttonBorder = key == currentView ? '4px solid #5A5A57' : '';
                            color = orderCount%3  == 0  ? '#8F9191' : '#ffffffb8';
                            
                            
                            
                            
                            
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