const options = document.getElementsByClassName('opc');
const ataquesDiv = document.getElementById('ataques');
const statusDiv = document.getElementById('status')


for (const opc of options){
    if (opc.innerHTML == "LUTAR"){
        opc.addEventListener('click', () => {
            lutar()
        })    
    }
    
}

addEventListener("keyup", (e) => {
    if (e.key == 'Escape'){
        ataquesDiv.style.display = "none"
        statusDiv.style.display = "none"
    }
})

function lutar(){
    statusDiv.style.display = "block"
    ataquesDiv.style.display = "block"
}

function bolsa(){

}

function pokemon(){

}

function fugir(){

}