import axios from 'axios';
import Swal from 'sweetalert2';
import {CREATE_POKEMON,
        FILTER_BY_TYPE,
        GET_DETAIL_POKEMON,
        GET_NAME_POKEMON,
        GET_POKEMONS,
        GET_TYPES,
        ORDER_BY_NAME,
        CLEAR_DETAIL,
        CLEAR_POKEMONS,
        ORDER_BY_STRENGTH,
        FILTER_CREATE} from "./actionTypes";


export function getPokemons() {
    return async function(dispatch) {
        try {
            const resp = await axios.get("/pokemons")
            return dispatch({
                type: GET_POKEMONS,
                payload: resp.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function createPokemon(pokemon) {
    return async function(dispatch) {
        try {
            const resp = await axios.post("/pokemons", pokemon)
            Swal.fire({
                icon: "success",
                title: "Nice!",
                text: "Pokemon susccesfully created!",
            });
            return dispatch({
                type: CREATE_POKEMON,
                payload: resp.data
            }) 
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Sorry...',
                text: 'Pokemon already exist!',
                footer: '<a href="">Why do I have this issue?</a>'
            });
        }
    }
}

export function getDetailPokemon(id) {
    return async function(dispatch) {
        try {
            const resp = await axios.get(`/pokemons/${id}`)
            return dispatch({
                type: GET_DETAIL_POKEMON,
                payload: resp.data
            })
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Sorry...',
                text: 'Pokemon not found!',
                footer: '<a href="">Why do I have this issue?</a>'
            });
        }
    }
}

export function getNamePokemon(name) {
    return async function(dispatch) {
        try {
            const resp = await axios.get(`/pokemons?name=${name}`)
            return dispatch({
                type: GET_NAME_POKEMON,
                payload: resp.data
            })
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Sorry...',
                text: 'Pokemon not found!',
                footer: '<a href="">Why do I have this issue?</a>'
            });
            return await dispatch(getPokemons());
        }
    }
}

export function getTypePokemon() {
    return async function(dispatch) {
        try {
            const resp = await axios.get(`/types`)
            return dispatch({
                type: GET_TYPES,
                payload: resp.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function filterCreate(create){
    return {
        type: FILTER_CREATE,
        payload: create
    }
}

export function filterByType(types){
    return {
        type: FILTER_BY_TYPE,
        payload: types
    }
}

export function orderByName(order){
    return {
        type: ORDER_BY_NAME,
        payload: order
    }
}

export function clearDetail() {
    return {
        type: CLEAR_DETAIL
    }
}

export function clearPokemons() {
    return{
        type: CLEAR_POKEMONS
    }
}