const { Router } = require("express");
const router = Router();
const {idPokeInfo,namePokeInfo,pokeGet} = require("../controllers/PokemonController");
const { Pokemon, Type } = require("../db");


router.get("/", async (req,res)=>{
    const {name} = req.query;
    const pokemons = await pokeGet();
    const byName = await namePokeInfo(name);

    try {
        if(name){ //si me llega el nombre
            const pokeName = pokemons.filter((poke)=> poke.name.toLowerCase().includes(name.toLowerCase())); // filtro desde los 40 de la api y la bd

            if(pokeName.length){ // si esta el nombre en los 40 o en la bd
                res.status(200).send(pokeName);
            }else if(byName){ // sino lo busco en la api
                res.status(200).send(byName);
            }
            else{
                return res.status(404).send({error: "Pokemon not found"});
            }
        }else{
            res.status(200).send(pokemons); //si no recibo nombre, retorno todos los pokemons
        }
    } catch (error) {
        res.status(404).send({error: error.message});
    }
    
});

router.get("/:id", async (req,res) => { // desde params recojo el id del pokemon y lo retorno
    const {id} = req.params
    const pokemonsId = await pokeGet(); 
    const byId = await idPokeInfo(id);
    
    if(id){
        const pokeId = pokemonsId.filter((e)=> e.id == id); // filtro desde los 40 de la api y la bd

        if(pokeId.length){ // si esta el id en los 40 o en la bd
            res.status(200).send(pokeId)
        }else if(byId){ // sino lo busco en la api
            res.status(200).send(byId)
        }else{
            res.status(404).send({ error: 'Pokemon not found'});
        }
    }
})

router.post("/", async (req,res) => { // creo cualquier pokemon en mi bd
    try {
        let { name, life, attack, defense, speed, height, weight, image, types} = req.body; // atributos desde el modelo
        const pokeDb = await Pokemon.findOne({ where:{ name: name }, include: Type})
        if (!name) return res.status(404).send("Name is required");
        !life ? life = 1 : life; 
        !attack ? attack = 1 : attack; 
        !defense ? defense = 1 : defense;
        !speed ? speed = 1 : speed; 
        !height ? height = 1 : height; 
        !weight ? weight = 1 : weight;
        !types.length ? types = [] : types;
        if(pokeDb) return res.status(404).send("Pokemon already exists");
        const nameLower = name.toLowerCase();
        const typesLower = types?.map((type) => type.toLowerCase());
        const create = await Pokemon.create({name : nameLower,life,attack, defense, speed, height, weight,image});
        const pokeType = await Type.findAll({where:{name: typesLower}});
        create.addType(pokeType);
        res.status(201).send({msg: "Pokemon successfully created"}); 
    } catch (error) {
        res.status(404).send({error: error.message}, alert("Pokemon not created"));
    }
});

router.delete("/delete/:id", async (req,res,next)=>{
    try {
        const {id} = req.params; 
    let pokeDelete = await Pokemon.findOne({where: {id: id}})
    if(!pokeDelete) return res.status(404).send({msg: "pokemon no existe"})
    await pokeDelete.destroy()
    res.status(200).send({msg: "pokemon eliminado"})
    } catch (error) {
        next(error); 
    }
})


module.exports = router;