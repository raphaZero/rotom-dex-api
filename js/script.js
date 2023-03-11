
async function listPoke (){
    try {
        const pokeData = await instance.get('pokemon/ditto');
        console.log(pokeData);
    } catch (error) {
        console.log(error);
    }
}
listPoke();