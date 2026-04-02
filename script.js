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

function paint(e){
    if(e.target.classList.contains("cell")) {
        switch (mode){
            case "gold":
                paintGold(e);
                break;
            case "rainbow":
                paintRainbow(e);
                break;
            case "progressive":
                paintProgressive(e);
                break;
        }
    }
}

function paintGold(e){
    e.target.style.background = "gold";
}

function paintRainbow(e){
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    e.target.style.background = "#" + randomColor;
}

function paintProgressive(e){
    let background = getComputedStyle(e.target).getPropertyValue('background-color');
    let colors = background.split(", ");
    colors[0] = parseFloat(colors[0].split("(")[1]);
    colors[1] = parseFloat(colors[1]);
    colors[2] = parseFloat(colors[2]);
    if(colors[0] != "0" && colors[1] != "0" && colors[2] != "0"){
        e.target.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    } else {
        colors[3] = parseFloat(colors[3]) + 0.1;
        colors = "rgba(" + colors.join(",") + ")";
        e.target.style.backgroundColor = colors;
    }
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

container.addEventListener("mouseover", (e) => paint(e));
btn.addEventListener("click", startGame);
select.addEventListener("change", (e) => mode = e.target.value);

startGame();