function pieceClassIs(i,set) {
    let top = set=='w'?`top-[12.5%]`:`top-[75%]`
    let left = `left-[${(i%8)*12.5}%]`
    if (set=='w'){
        if (i==0) return  `piece R absolute top-[0]  left-[0] z-10 w-[12.5%] h-[12.5%] `
        else if (i==1) return  `piece N absolute top-[0]  left-[12.5%] z-10 w-[12.5%] h-[12.5%] `
        else if (i==2) return  `piece B absolute top-[0]  left-[25%] z-10 w-[12.5%] h-[12.5%] `
        else if (i==3) return `piece Q absolute top-[0]  left-[37.5%] z-10 w-[12.5%] h-[12.5%] `
        else if (i==4) return `piece k absolute top-[0]  left-[50%] z-10 w-[12.5%] h-[12.5%]`
        else if (i==5) return `piece B absolute top-[0]  left-[62.5%] z-10 w-[12.5%] h-[12.5%]`
        else if (i==6) return `piece N absolute top-[0]  left-[75%] z-10 w-[12.5%] h-[12.5%]`
        else if (i==7) return `piece R absolute top-[0]  left-[87.5%] z-10 w-[12.5%] h-[12.5%]`
        else if (i>7) return `piece p absolute ${top}  ${left} z-10 w-[12.5%] h-[12.5%]`
    }
    else{
        if (i==0) return  `piece R absolute  top-[87.5%]  left-[0] z-10 w-[12.5%] h-[12.5%] `
        else if (i==1) return  `piece N absolute  top-[87.5%]  left-[12.5%] z-10 w-[12.5%] h-[12.5%] `
        else if (i==2) return  `piece B absolute top-[87.5%]  left-[25%] z-10 w-[12.5%] h-[12.5%] `
        else if (i==3) return `piece k absolute top-[87.5%]  left-[37.5%] z-10 w-[12.5%] h-[12.5%] `
        else if (i==4) return `piece Q absolute top-[87.5%]  left-[50%] z-10 w-[12.5%] h-[12.5%]`
        else if (i==5) return `piece  B absolute top-[87.5%]  left-[62.5%] z-10 w-[12.5%] h-[12.5%]`
        else if (i==6) return `piece N absolute top-[87.5%]  left-[75%] z-10 w-[12.5%] h-[12.5%]`
        else if (i==7) return `piece R absolute top-[87.5%]  left-[87.5%] z-10 w-[12.5%] h-[12.5%]`
        else if (i>7) return `piece p absolute text-[red]  ${top}  ${left} z-10 w-[12.5%] h-[12.5%]`
    }
}
export default pieceClassIs