export function cronometro(tempo, div){
    let seg = tempo
    let min = 0       
    if (tempo >= 60){
        seg = tempo - (parseInt((tempo / 60)) * 60)
        min = parseInt(tempo / 60)        
    }
    if (seg < 10){
        seg = "0" + String(tempo - (parseInt((tempo / 60)) * 60))
    }
    if (min < 10){
        min = "0" + String(parseInt(tempo / 60))
    }
    div.innerText = `${min}:${seg}`
    return tempo + 1
}