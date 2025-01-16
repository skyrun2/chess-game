import useBoardState from "@/utils/boardState";
import pieceData from "@/utils/pieceData";
import useTiles from "@/utils/useTiles";
import { useEffect, useState } from "react";




const NotationControlBar = () =>{

    const resetTiles = useTiles((state)=>state.resetTiles);
    const currentView = useTiles((state)=>state.currentView);
    const presentView = useTiles((state)=>state.presentView);

    let [leftDisabled,setLeftDisabled] =  useState(false);
    let [rightDisabled,setRightDisabled] =  useState(false);

    
    let payload = {};
    useEffect(()=>{
        // console.log({rightDisabled,leftDisabled});
        if (currentView == '0_-1' ) setLeftDisabled(true)
        else if (currentView == '1_0' ) setLeftDisabled(true)
        else if (currentView != '1_0' ) setLeftDisabled(false)

        if (currentView == presentView ) setRightDisabled(true)
        else if (currentView != presentView ) setRightDisabled(false)
        else if (!presentView ) setRightDisabled(true)
        

        

    },[currentView])
    
    
    
    function handleOnClick(e) {
        let id = e.currentTarget.id;
        let main = Number(currentView[0]);
        let mini = Number(currentView[2]);
        let newTile;

        if (id == 'left') newTile = mini == 1 ?  main+'_'+(mini-1) : (main-1)+'_'+(mini+1);
        if (id == 'right') {
            
            newTile = mini == 1 ?  (main+1)+'_'+(mini-1) : (main)+'_'+(mini+1);
            payload.isPresentTiles = !!(newTile == presentView)
 
        }
        
        payload.id = newTile;
        resetTiles(payload);
        // console.log({leftDisabled,rightDisabled});
        
       console.log({currentView,presentView,newTile});
        console.log({newView:currentView[2]});
        
        
        
    }

    return(
        <div
        className="w-full h-[30%] grid grid-cols-1 place-items-center"
        >
            <div
            className=" w-fit h-[80%] grid grid-cols-3 place-items-center gap-[.3rem]"
            >
                <button
                    id='resign'    
                    className="w-[100%]  py-[.4rem] px-[1rem]    bg-[#383734] grid place-items-center rounded-[.2rem]" 
                    onClick={(e)=>handleOnClick(e)}
                    >
                        <div 
                        className="w-[2rem] h-[100%]">
                            <img
                            className="w-[100%] h-[100%]"
                            src={pieceData.resign} alt=""  />
                        </div>
                </button>
                <button
                    id='left'
                    className="w-[100%]  py-[.4rem] px-[1rem]    bg-[#383734] grid place-items-center rounded-[.2rem]" 
                    onClick={(e)=>handleOnClick(e)}
                    disabled = {leftDisabled }
                    >
                        <div 
                        className="w-[2rem] h-[100%]">
                            <img
                            className="w-[100%] h-[100%]"
                            src={pieceData.left_arrow} alt=""  
                            />
                            
                        </div>
                </button>
                <button
                    id='right'
                    className="w-[100%]  py-[.4rem] px-[1rem]    bg-[#383734] grid place-items-center rounded-[.2rem]" 
                    onClick={(e)=>handleOnClick(e)}
                    disabled = {rightDisabled}
                    >
                        <div 
                        className="w-[2rem] h-[100%]">
                            <img
                            className="w-[100%] h-[100%]"
                            src={pieceData.right_arrow} alt=""  />
                        </div>
                </button>

            </div>
        </div>
    )
}

export default NotationControlBar;