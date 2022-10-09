let idPokemon = parseInt(document.querySelector('.pokemon_number').innerText);
showPokemon(idPokemon || '151');


async function fetchPokemon(pokemon) {
    try{
        const responseAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const jsonResponse = await responseAPI.json();
        idPokemon = jsonResponse.id;
        return jsonResponse;

    } catch(err){
        console.log(err);
    }
}

function changeNamePokemon(namePokemon){
    const nameText = document.querySelector('.pokemon_name');
    nameText.innerText = namePokemon;
}

function changeIdPokemon(idPokemon){
    const idText = document.querySelector('.pokemon_number');
    idText.innerText = idPokemon + ' - ';
}

function changeGifPokemon(gif){
    const gifLink = document.querySelector('.pokemon_image');
    //gifLink.src = gif ?? 'https://tmssolucoesfinanceira.com/wp-content/uploads/2021/11/interrogacao.gif';
    gifLink.src = gif ? gif : 'https://tmssolucoesfinanceira.com/wp-content/uploads/2021/11/interrogacao.gif';
}

function pokemonNotFind(){
    const nameText = document.querySelector('.pokemon_name');
    const idText = document.querySelector('.pokemon_number');
    const gifLink = document.querySelector('.pokemon_image');

    nameText.innerText = '??';
    idText.innerText = '';
    gifLink.src = 'https://tmssolucoesfinanceira.com/wp-content/uploads/2021/11/interrogacao.gif';
    idPokemon = 0;
}

function changeAllTextPokemon(namePokemon){
    changeNamePokemon(namePokemon.name);
    changeIdPokemon(namePokemon.id);
    changeGifPokemon(namePokemon.sprites.versions['generation-v']['black-white'].animated.front_default);
}

async function showPokemon(pokemon){
    const namePokemon = await fetchPokemon(pokemon.toLowerCase());

    namePokemon ? changeAllTextPokemon(namePokemon) : pokemonNotFind();
    

}

const nextButton = document.querySelector('.btn-next');
nextButton.addEventListener('click', () => {
    showPokemon(idPokemon+1);
});

const prevButton = document.querySelector('.btn-prev');
prevButton.addEventListener('click', () => {
    idPokemon <= 1 ? showPokemon(1) : showPokemon(idPokemon-1);
});

const formInput = document.querySelector('.input_search');
const form = document.querySelector('.form');
form.addEventListener('submit', e => {
    e.preventDefault();
    showPokemon(formInput.value);
    form.reset();
})