import React, { useState} from 'react'
import { useDispatch } from 'react-redux'
import { getNamePokemon, clearPokemons } from '../../redux/actions'
import styles from './SearchBar.module.css'


export default function SearchBar({setCurrentPage}) {
    const dispatch = useDispatch();
    const [pokeName, setPokeName] = useState({name:''}); //state para el input que sea el nombre en una ""
    const [habilitado, setHabilitado] = useState(true); // state para habilitar o inhabilitar el componente
    React.useEffect(() => {
        if(pokeName.name.length){ 
            setHabilitado(false);
        }else{
            setHabilitado(true);
        }
    },[pokeName, setHabilitado]) //se ejecuta cada vez que se modifica el state

    function handleChange(e){
        e.preventDefault(); //previene el comportamiento por defecto del evento
        setPokeName({...pokeName,[e.target.name]: e.target.value}); //se modifica el state con el nombre del input y el valor del input
    }

    function handleSubmit(e){
        e.preventDefault();
         // se limpia el state de los pokemons
        dispatch(getNamePokemon(pokeName.name.toLocaleLowerCase())); //se envia el nombre del pokemon al action
        setPokeName({name: ''}); // se limpia el input
        e.target.reset(); // se resetea el input
        setCurrentPage(1) // se cambia la pagina a la primera
        dispatch(clearPokemons())
    }

    return (
        <>
            <form className={styles.search} onSubmit={handleSubmit}>
                <input
                className={styles.barra}
                onSubmit={handleSubmit}
                name="name"
                value={pokeName.name}
                onChange={handleChange}
                type="text"
                placeholder="Pokemons..."
                autoComplete="off" />
                <button className={styles.btn} disabled={habilitado} type="submit">Search</button>
            </form>
        </>
    )
}
