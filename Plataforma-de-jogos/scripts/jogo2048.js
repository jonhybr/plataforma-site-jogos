const rows = document.getElementsByClassName('rows')

function getArrayRows(){
    let newArray = new Array()
    for (const y of rows){
        let arr = new Array()
        for (const x of y.children){
            arr.push(x)
        }
        newArray.push(arr)
    }
    return newArray
}

function setRowsCollection(array){    
    let y = 0
    for (const row of rows){        
        let x = 0
        for (let bloco of row.children){
            bloco = array[y][x]
            x++
        }
        y++          
    }
}

const controls = {
    'ArrowRight': moveRight,
    'ArrowLeft': moveLeft,
    'ArrowDown': moveDown,
    'ArrowUp': moveUp
}

addEventListener('keyup', (e) => {
    if (e.key in controls){
        controls[e.key]()
    }
})


function random(n){
    return (Math.floor(Math.random() * n));
}

function addRandom(){
    const newArray = getArrayRows()
    const newY = random(4)
    const newX = random(4)
    newArray[newY][newX].className = 'bloco n2'
    newArray[newY][newX].innerText = '2'
    setRowsCollection(newArray)
}

function moveRight(){
    const newArray = getArrayRows()
    newArray.forEach((y, indexY) => {
        y.forEach((x, indexX) => {
            if (x.className != 'bloco'){
                if (y[indexX + 1]){
                    if (y[indexX + 1].className == 'bloco'){
                        y[indexX + 1].className = x.className
                        y[indexX + 1].innerText = x.innerText
                        x.className = 'bloco'
                        x.innerText = ''
                    }
                }                
            }            
        })
    })
    setRowsCollection((newArray))
}

function moveLeft(){
    const newArray = getArrayRows()
    newArray.map((arr) => {arr.reverse()})
    newArray.forEach((y, indexY) => {
        y.forEach((x, indexX) => {            
            if (x.className != 'bloco'){                 
                if (y[indexX + 1]){
                    if (y[indexX + 1].className == 'bloco'){
                        y[indexX + 1].className = x.className
                        y[indexX + 1].innerText = x.innerText
                        x.className = 'bloco'
                        x.innerText = ''
                    
                    }
                }                
            }            
        })
    })
    
    newArray.map((arr) => {arr.reverse()})
    setRowsCollection((newArray))
}

function moveDown(){
    const newArray = getArrayRows()
    newArray.forEach((y, indexY) => {
        y.forEach((x, indexX) => {
            if (x.className != 'bloco'){
                if (newArray[indexY + 1][indexX]){
                    if (newArray[indexY + 1][indexX].className == 'bloco'){
                        newArray[indexY + 1][indexX].className = x.className
                        newArray[indexY + 1][indexX].innerText = x.innerText
                        x.className = 'bloco'
                        x.innerText = ''                    
                    }
                }                
            }            
        })
    })
    setRowsCollection((newArray))
}

function moveUp(){
    const newArray = getArrayRows()
    newArray.reverse()
    newArray.forEach((y, indexY) => {
        y.forEach((x, indexX) => {
            if (x.className != 'bloco'){
                if (newArray[indexY + 1][indexX]){
                    if (newArray[indexY + 1][indexX].className == 'bloco'){
                        newArray[indexY + 1][indexX].className = x.className
                        newArray[indexY + 1][indexX].innerText = x.innerText
                        x.className = 'bloco'
                        x.innerText = ''                    
                    }
                }                
            }            
        })
    })
    newArray.reverse()
    setRowsCollection((newArray))
}

addRandom()
addRandom()