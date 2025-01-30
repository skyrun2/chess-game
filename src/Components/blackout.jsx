import useBoardState from "@/utils/boardState";

const Blackout = ()=>{
    const resignModal = useBoardState((state)=>state.resignModal);
    const closeResignModal = useBoardState((state)=>state.closeResignModal);

    function handleClick(e) {
        closeResignModal()
        
    }
    return(
        <div
        id={resignModal ? '' : 'none'}
        className=" absolute w-[100%] h-[100%] bg-[#00000099]"
        onClick={e=>handleClick(e)}
        >
        </div>
    )
}
export default Blackout;