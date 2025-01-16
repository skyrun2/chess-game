import pieceData from "@/utils/pieceData";


const CheckMateModal = () =>{

    return(
        <div 
        id="none"
        >
            <div
            className=" py-[.5rem] pb-[1rem] w-[13rem] h-[15rem] 
                        absolute top-[50%] translate-y-[-50%] right-[50%] translate-x-[50%]
                        z-30"
            >
                <div 
                className=" w-[100%] h-[100%]
                           relative 
                           ">
                <button
                className=" w-[8%] 
                            absolute right-[5%] top-[0%] ">
                    <svg
                    className="w-[100%] cancel"
                    xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512">
                        <path 
                        d="m325.297 256l134.148-134.148c19.136-19.136 19.136-50.161 0-69.297c-19.137-19.136-50.16-19.136-69.297 0L256 186.703L121.852 52.555c-19.136-19.136-50.161-19.136-69.297 0s-19.136 50.161 0 69.297L186.703 256L52.555 390.148c-19.136 19.136-19.136 50.161 0 69.297c9.568 9.567 22.108 14.352 34.648 14.352s25.081-4.784 34.648-14.352L256 325.297l134.148 134.148c9.568 9.567 22.108 14.352 34.648 14.352s25.08-4.784 34.648-14.352c19.136-19.136 19.136-50.161 0-69.297z" />
                    </svg>
                </button>

                </div>
            </div>

            <div 
        className=" py-[.5rem] pb-[1rem] w-[13rem] h-[15rem] 
                    absolute bottom-[50%] translate-y-[50%] right-[50%] translate-x-[50%]
                    bg-[#262421] aspect-square rounded-[.5rem]
                    grid grid-cols-1 place-items-center">
            <div
             className=" text-[#fff] font-bold text-center"
             >
                <p
                className="text-[1.3rem] "
                >Black Won</p>
                <p
                className="text-[.8rem] "
                >by checkmate</p>
            </div>
            <div>
                <img src={pieceData.b_pawn} alt="" />                
            </div>

            <div
            className="w-[70%] grid grid-cols-1 gap-[.8rem]">
                <button
                className=" py-[.3rem] w-[100%] bg-[#81B64C]  text-[#fff] rounded border-[#45753C] border-b-[.3rem]  font-bold "
                >
                    <p>Rematch</p>
                </button>
                <button
                className=" py-[.3rem] w-[100%] bg-[#81B64C]  text-[#fff] rounded border-[#45753C] border-b-[.3rem]  font-bold "
                >
                    <p>Quit</p>
                </button>
            </div>
            
        </div>
        </div>
    )
}

export default CheckMateModal;