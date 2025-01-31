const List = ({isAscending,startingPointNum  })=>{
    return(
        Array(8).fill(0).map((_,i)=>{
            const currPoint = isAscending? startingPointNum+i : startingPointNum-i;
            return(
                <list key={i} 
                id = 'notation'
                className=" w-[12.5%]
                            h-[12.5%]
                            text-center
                            text-red-500
                            font-bold
                            text-[100%]"    
                >
                    {String.fromCharCode(currPoint)}</list>
            )
        })
    )
        
    
    
}

const NotationList = ({direction,area}) =>{

    let startingPointNum = 0;
    let isAscending = false;
    let widthOrHeight = `w-[30rem]`;
    let flexDirection = '';
    let position = '';
        

    switch (true) {
        case direction == 'left':
            startingPointNum = 56;
            isAscending = false;
            widthOrHeight = `h-[100%]`;
            flexDirection = 'flex-col';
            position = `left-[-5%] top-[50%] translate-y-[-50%]`;
            break;
            case direction == 'right':
                startingPointNum = 49;
                isAscending = true;
                widthOrHeight = `h-[${area}rem]`;
                flexDirection = 'flex-col';
                position = 'right-[0] top-[50%] translate-y-[-50%]';
            break;
            case direction == 'top':
                startingPointNum = 97;
                isAscending = true;
                widthOrHeight = `w-[${area}rem]`;
                flexDirection = '';
                position = `top-[0] left-[50%] translate-x-[-50%]`;
            break;
            case direction == 'bottom':
                startingPointNum = 97;
                isAscending = true;
                widthOrHeight = `w-[100%] `;
                flexDirection = '';
                position = `bottom-[-5%] left-[50%] translate-x-[-50%] translate-y-[2%]`;
                break;
            
        default:
            break;
    }
    let classList = ` absolute  ${widthOrHeight} bg-[bla] ${position} flex ${flexDirection} justify-items-center items-center text-[0.8rem] `;
    
    return(
        
        <div
        className={classList}>
           <List startingPointNum={startingPointNum} isAscending={isAscending}></List> 
        </div>
    )
}

export default NotationList;