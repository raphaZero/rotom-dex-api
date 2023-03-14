const divConteiner = document.querySelector('.display-show');
const btnPrev = document.getElementById('prev');
const btnNext = document.getElementById('next');
const input = document.getElementById('input');
const btnReset = document.getElementById('btn-top-left');
const btnSearch = document.getElementById('btn-top-right');

let pokeId = 1;
listPoke(pokeId);

btnPrev.addEventListener('click', (event)=>{
    event.stopPropagation();
    event.preventDefault();
    pokeId -=1;
    const pokeMinimum=1;
    if(pokeId<=pokeMinimum){
        pokeId=1008;
    }
    divConteiner.innerHTML="";
    listPoke(pokeId);
});

btnNext.addEventListener('click', (event)=>{
    event.stopPropagation();
    event.preventDefault();
    pokeId += 1;
    const pokeMaximum = 1009;
    if(pokeId>=pokeMaximum){
        pokeId=1;
    }
    divConteiner.innerHTML="";
    listPoke(pokeId)
});

btnReset.addEventListener('click', (event)=>{
    event.stopPropagation();
    event.preventDefault();
    input.value="";
    divConteiner.innerHTML="";
    listPoke(1);
    console.log(pokeId)
})

btnSearch.addEventListener('click', (event)=>{
    event.stopPropagation();
    event.preventDefault();
    pokeId = input.value;
    divConteiner.innerHTML="";
    listPoke(pokeId);
    input.value = "";
})

input.addEventListener('keyup', (event)=>{
    event.stopPropagation();
    event.preventDefault();
})

async function listPoke (pokemonPosition){
    try {       
        const pokeData = await instance.get(`pokemon/${pokemonPosition}`);
        pokeId=pokeData.data.id;
        pokemonRender(pokeData);
    } catch (error) {
        errorSearch();
        input.value = "";
    }
}

function pokemonRender (pokeData){
    divConteiner.innerHTML +=
    `
        <div id='side-left-data'>
            <h1 id='poke-name'>${pokeData.data.name}</h1>
            <h2 id='poke-id'>#${pokeData.data.id}</h2>
            <p> Type: ${pokeData.data.types.map(typeElement=>typeElement.type.name).join(" | ")}</p>
            <p> Ability: ${pokeData.data.abilities[0].ability.name}</p>
          
            <p>height: ${pokeData.data.height/10}m | weigth: ${pokeData.data.weight/10}kg</p>
        </div>
        <div id='side-right-data'>
            <img id='picture-card' src='${pokeData.data.sprites.front_default}'>    
        </div>
    `
}

function errorSearch(){
    divConteiner.innerHTML +=
    `
    <div id='msg-error'>
        <h1><span>Error 404</span> - uncataloged or non-existent creature</h1>
        <p>press the <span>reset button</span> or refresh the page</p>
    </div>
    `
}