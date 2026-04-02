const cellTemplate = document.querySelector("#cell-template");
const container = document.querySelector("#container");

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

container.addEventListener("mouseover", (e) => paint(e))

createGrid(16);