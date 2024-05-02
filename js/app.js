const addSuit = document.getElementById('add-suit');
const divSuit = document.getElementById('suits');
const update = document.getElementById('add-hero');
const heroesCardsContainer = document.querySelector('.heroes-cards');

let heroes = [];


function updateForm (inputs){
    let info = {
        Name : "",
        Age : "",
        CodeName : "",
        Suit : [],
        City : "",
        Poster : undefined
    };

    inputs.forEach(input =>  {
        for (let key in info) {
            if (input.id === key) {
                info[key] = input.value;
            }
        }
        
        if (input.name === "Suit"){
            info.Suit.push(input.value);
        } else if (input.name === "URL"){
            info.Poster = input.value;
        }

        input.value = "";
        divSuit.innerHTML = "";

        const file = input.files ? input.files[0] : null;
        
        if (file) {
            const imageURL = URL.createObjectURL(file);
            info.Poster = imageURL;
        }
    })

    const heroesCards = document.createElement("div");
    heroesCards.className = "card";
    heroesCards.innerHTML = `
    <h5 class="card-header">${info.Name}/${info.Age}/${info.CodeName}</h5>
    <div class="card-body hero">
        <div class="HeroSuit">${info.Suit}</div>
        <div class="HeroLocation">${info.City}</div>
        <img src="${info.Poster}">
    </div>
    `;

    heroesCardsContainer.appendChild(heroesCards);

    let infoJSON = JSON.stringify(info);

    // Almacena el JSON en localStorage
    localStorage.setItem('info', infoJSON);

    // Recupera el JSON del localStorage
    let infoRecuperado = localStorage.getItem('info');
    
    // Convierte el JSON de nuevo a un objeto
    let diccionarioObjeto = JSON.parse(infoRecuperado);

    // Imprime el diccionario en un div
    document.getElementById('output').innerHTML = JSON.stringify(diccionarioObjeto, null, 2);

    heroes.push(info)
    console.table(heroes)
}

addSuit.addEventListener("click", () => {
    const newSuit = document.createElement("div");
    newSuit.className = "suit col-4";
    newSuit.style = "display: flex; gap: .4em; padding-block: .4em;"
    newSuit.innerHTML = `<input 
        type="text"
        name="Suit"
        class="form-control"
        placeholder="New Suit" >
      <button class="btn btn-warning del-suit">-</button>`;
      
    divSuit.appendChild(newSuit);

    const delSuit = newSuit.querySelector(".del-suit");
    delSuit.addEventListener("click", () => {
      newSuit.remove();
    });
});

update.addEventListener('click', () => {
    const inputs = document.querySelectorAll('input');
    updateForm(inputs);
});