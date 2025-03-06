import useBoardState from "@/utils/boardState";
import pieceData from "@/utils/pieceData";
import { useEffect, useState } from "react";





const NotationControlBar = () =>{

    const resetTiles = useBoardState((state)=>state.resetTiles);
    const currentView = useBoardState((state)=>state.currentView);
    const presentView = useBoardState((state)=>state.presentView);
    const reviewMode = useBoardState((state)=>state.reviewMode);
    const resetAll = useBoardState((state)=>state.resetAll);
    const resetTilesState = useBoardState((state)=>state.resetTilesState);
    const openResignModal = useBoardState((state)=>state.openResignModal);
    let [leftDisabled,setLeftDisabled] =  useState(false);
    let [rightDisabled,setRightDisabled] =  useState(false);
    
    
    
    let payload = {};
    useEffect(()=>{
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
        if (id == 'left' || id == 'right') {
            if (id == 'left') newTile = mini == 1 ?  main+'_'+(mini-1) : (main-1)+'_'+(mini+1);
            if (id == 'right') {            
                newTile = mini == 1 ?  (main+1)+'_'+(mini-1) : (main)+'_'+(mini+1);
                payload.isPresentTiles = !!(newTile == presentView)
            }        
            payload.id = newTile;
            resetTiles(payload);                    
        }
        else if (id == 'resign/end'){
            if (reviewMode) {
                resetAll();
                resetTilesState();   
            }
            else if (!reviewMode){
                openResignModal();
            }
        }
    }
    
    
    return(
        <div
        className="w-full h-[30%] grid grid-cols-1 place-items-center"
        >
            <div
            className=" relative w-fit h-[80%] grid grid-cols-3 place-items-center gap-[.3rem]"
            >
                <button
                    id='resign/end'    
                    className="w-[100%]  py-[.4rem] px-[1rem]    bg-[#383734] grid place-items-center rounded-[.2rem]" 
                    onClick={(e)=>handleOnClick(e)}
                    >
                        <div 
                        className="w-[2rem] h-[100%]">
                            <img
                            className="w-[100%] h-[100%]"
                            src={reviewMode? pieceData.end : pieceData.resign} alt=""  />
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