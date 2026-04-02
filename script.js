const cellTemplate = document.querySelector("#cell-template");
const container = document.querySelector("#container");
const btn = document.querySelector("#restart-game");
const select = document.querySelector("#mode");

let mode = "gold";

function createGrid(size) {
    container.replaceChildren();
    
    for(let i = 0; i < size; i++){
        let row = document.createElement("div");
        row.className = "row";
        for(let j = 0; j < size; j++){
            const cell = cellTemplate.content.cloneNode(true);
            row.appendChild(cell);
        }
        container.appendChild(row);
    }        
}

function paint(cell){
    switch (mode){
        case "gold":
            paintGold(cell);
            break;
        case "rainbow":
            paintRainbow(cell);
            break;
        case "progressive":
            paintProgressive(cell);
            break;
    }
}

function paintGold(cell){
    cell.style.backgroundColor = "gold";
    delete cell.dataset.opacity;
}

function paintRainbow(cell){
    const randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    cell.style.backgroundColor = "#" + randomColor;
    delete cell.dataset.opacity;
}

function paintProgressive(cell){
    const currentOpacity = Number(cell.dataset.opacity || 0);
    const nextOpacity = Math.min(currentOpacity + 0.1, 1);

    cell.dataset.opacity = nextOpacity;
    cell.style.backgroundColor = `rgba(0, 0, 0, ${nextOpacity})`;
}

function startGame(){
    const defaultSize = 32;
    const input = prompt("Enter grid size: (1-100)");

    const size = input === null ? defaultSize : Number(input);

    if(!Number.isInteger(size) || size < 1 || size > 100){
        createGrid(defaultSize);
        return;
    }

    createGrid(size);
}

container.addEventListener("mouseover", (e) => {
    if(e.target.classList.contains("cell")) {  
        paint(e.target)
    }
});
btn.addEventListener("click", startGame);
select.addEventListener("change", (e) => mode = e.target.value);

startGame();