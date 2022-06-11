const { Router } = require('express');
const routerPokemon = require("./pokemons");
const routerTypes = require("./types")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', routerPokemon);
router.use('/types', routerTypes); 


module.exports = router;
