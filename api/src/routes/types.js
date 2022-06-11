const axios = require("axios");
const { Router } = require("express");
const { Type } = require("../db.js");

const router = Router();

router.get('/', async (req, res) => {
    try {
        const typeApi = await axios.get('https://pokeapi.co/api/v2/type'); //pedido a la API para almacenar los tipos en la bd
        const types = typeApi.data.results.map(t => t.name);
        types.forEach(e => { //recorro cada elemento de la api y lo guardo en la bd
            Type.findOrCreate({ 
                where: {name: e}
            }) //busco o creo los tipos en el modelo de type
        });    
        const allTypes = await Type.findAll(); 
        res.send(allTypes);//devuelvo toda la info de la bd
    } catch(error) {
        res.status(404).send({error: error.message});
    }
});



module.exports = router;