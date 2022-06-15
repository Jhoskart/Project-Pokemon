import React from 'react';
import { useDispatch, useSelector,  } from 'react-redux';
import {getPokemons, getTypePokemon, clearPokemons, filterByType, orderByName, filterCreate} from '../../redux/actions';
import PokeCard from '../PokeCard/PokeCard';
import Pagination from '../Pagination/Pagination';
import NavBar from '../NavBar/NavBar';
import Loader from '../Loader/Loader';
import styles from './Home.module.css';

const Home = () => {
    const dispatch = useDispatch();
    React.useEffect(() => {dispatch(getPokemons());dispatch(getTypePokemon());},[dispatch]);
    const {pokemons, pokeTypes} = useSelector(state => state);
    const [currentPage, setCurrentPage] = React.useState(1); //estado para la pagina actual
    const [forPage, setForPage] = React.useState(12); //estado para la cantidad de pokemons por pagina
    const [order, setOrder] = React.useState(''); //estado para el orden de los pokemons
    const max = pokemons.length / forPage; //cantidad de paginas
    const firstIndex = (currentPage - 1) * forPage; //indice del primer pokemon de la pagina
    const lastIndex = (currentPage - 1) * forPage + forPage; //indice del ultimo pokemon de la pagina

    
    function reloadClick(e) {
        e.preventDefault();
        dispatch(clearPokemons());
        dispatch(getPokemons());
        dispatch(getTypePokemon());
        setCurrentPage(1);
    }
    
    function handleDb(e) { //funcion para filtrar por db
        dispatch(filterCreate(e.target.value));
        setCurrentPage(1); //setea la pagina a 1
    }

    function handleType(e) { //funcion para filtrar por tipo
        dispatch(filterByType(e.target.value));
        setCurrentPage(1);
    }

    function handleOrder(e) { //funcion para ordenar por nombre
        dispatch(orderByName(e.target.value));
        setCurrentPage(1); 
        setOrder(e.target.value); //seteo el orden en el estado
    }

    if(!pokemons[0]){
        return(
            <div>
                <div className={styles.container}>
                <NavBar /> 
                <Loader/>
                </div>  
            </div>
        )
    }else if(pokemons.length === 1){
        return(
            <div>
                <div className={styles.background}>
                    <NavBar 
                    pokeTypes={pokeTypes} 
                    orderByName={handleOrder} 
                    filterByType={handleType}
                    filterCreate={handleDb}
                    setCurrentPage={setCurrentPage}
                    />
                    <button className={styles.btn} onClick={reloadClick}>refresh</button>
                    <div >
                        {pokemons.slice(firstIndex,lastIndex).map(pokemon => {
                            return(
                                    <PokeCard 
                                    key= {pokemon.id}
                                    image={pokemon.image}
                                    name={pokemon.name}
                                    types={pokemon.types}
                                    id= {pokemon.id}
                                    db= {pokemon.db}
                                    life= {pokemon.life}
                                    weight = {pokemon.weight}
                                    height = {pokemon.height}
                                />
                            )} 
                        )}
                    </div>
                    <Pagination page={currentPage} setPage={setCurrentPage} maximo={max}/>
                </div>
            </div>
        )
        
    }else{
        return (
            <div>
                <div className={styles.background2}>
                    <NavBar 
                    pokeTypes={pokeTypes} 
                    orderByName={handleOrder} 
                    filterByType={handleType}
                    filterCreate={handleDb}
                    setCurrentPage={setCurrentPage}
                    />
                    <button className={styles.btn} onClick={reloadClick}>refresh</button>
                    <div >
                        {pokemons.slice(firstIndex,lastIndex).map(pokemon => {
                            return(
                                    <PokeCard 
                                    key= {pokemon.id}
                                    image={pokemon.image}
                                    name={pokemon.name}
                                    types={pokemon.types}
                                    id= {pokemon.id}
                                    db= {pokemon.db}
                                    life= {pokemon.life}
                                    weight = {pokemon.weight}
                                    height = {pokemon.height}
                                />
                            )} 
                        )}
                    </div>
                    <Pagination page={currentPage} setPage={setCurrentPage} maximo={max}/>
                </div>
            </div>
        );
    }
};

export default Home;