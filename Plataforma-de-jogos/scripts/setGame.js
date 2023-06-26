const cards = document.getElementsByClassName('card');

const answer = document.getElementById('setgamePlace');

for (const card of cards){    
    card.onmousedown = (evt) => {
        function moveAt(pageX, pageY) {
            card.style.left = pageX - card.offsetWidth / 2 + 'px';
            card.style.top = pageY - card.offsetHeight / 2 + 'px';
        }

        moveAt(evt.pageX, evt.pageY);

        function onMouseMove(evt) {
            moveAt(evt.pageX, evt.pageY);
        } 

        document.addEventListener('mousemove', onMouseMove);

        card.style.position = 'absolute'
        card.style.zIndex = 1000
        card.style.width = '70px'
        card.style.height = '100px'

        card.addEventListener('mouseup', () => {
            let c = 0
            for (let x of answer.children){
                if (x.classList[0] != 'card'){
                    const pos = x.getBoundingClientRect()                
                    if (evt.pageX > pos.left && evt.pageX < pos.right &&
                        evt.pageY > pos.top && evt.pageY < pos.bottom){
                        answer.children[c].classList = card.classList                    
                        answer.children[c].innerHTML = card.innerHTML
                        card.remove()
                        break
                    }
                }
                c++                
            }
            
        });                      
    }
}

