import useBoardState from "@/utils/boardState";



const LineCount = () =>{
    const moveNotation = useBoardState((state)=> state.moveNotation);
    const moveCount = useBoardState((state)=> state.moveCount);
    const notationCount = moveNotation.length;
    console.log(!(notationCount%2));
            
    if (moveCount && !(notationCount%2)) {
        return(
            <p>{moveCount}</p>
        )
    }        
    
}


const NotationCard = () =>{
    const notationOrder = useBoardState((state)=> state.notationOrder);
    const moveCount = useBoardState((state)=> state.moveCount);
    let orderCount = notationOrder.length;

    let backgroundColor = '';
    let color = '';

    
    return (

        <div
        className=" notation-card h-[80%] pt-[4.rem]  bg-[#262522] overflow-y-scroll">
            {
                moveCount ? 
                <div
                className=" notation-order grid  h-fit">
                    {
                        
                        notationOrder.map((e,i) =>{
                            orderCount = i;
                            backgroundColor = orderCount%6 > 2 ? '#ffffff05' : '';
                            // marginLeft = orderCount%3  != 0  ? '-65%' : '';
                            // width = orderCount%3  == 0  ? '33%' : '';
                            color = orderCount%3  == 0  ? '#8F9191' : '#ffffffb8';
                            // console.log({[orderCount%6]:e});
                            
                            return(
                                <p
                                key={i}
                                style={
                                    {
                                        backgroundColor:backgroundColor,
                                        color: color,
                                    }
                                }
                                className={` pl-[.5rem] py-[.3rem]  font-bold text-[.8rem]`}
                                >{e}</p>
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