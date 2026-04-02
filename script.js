const cellTemplate = document.querySelector("#cell-template");
const container = document.querySelector("#container");
const btn = document.querySelector("#restart-game");

function createGrid(size) {
    container.replaceChildren();
    
    
    for(let i = 0; i < size; i++){
        let row = document.createElement("div");
        row.id = "row";
        for(let j = 0; j < size; j++){
            let cell = cellTemplate.content.cloneNode(true);
            row.appendChild(cell);
        }
        container.appendChild(row);
    }        
}

function paint(e){
    if(e.target.id === "cell") {
        e.target.style.background = "gold";
    }
}

function startGame(){
    let input = "" 
    do {
        input = prompt("Enter grid size:");
    } while (isNaN(input));

    let size = input <= 100 ? input : 100;
    createGrid(size);
}

container.addEventListener("mouseover", (e) => paint(e));
btn.addEventListener("click", startGame);

startGame();