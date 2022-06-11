import {CREATE_POKEMON,
        FILTER_BY_TYPE,
        GET_DETAIL_POKEMON,
        GET_NAME_POKEMON,
        GET_POKEMONS,
        GET_TYPES,
        ORDER_BY_NAME,
        CLEAR_DETAIL,
        CLEAR_POKEMONS,
        FILTER_CREATE,
        ORDER_BY_STRENGTH} from "./actionTypes";

const initialState = {
    filtered : [],
    pokemons: [],
    allPokemons: [],
    pokeDetail: [],
    pokeTypes: [],
}

function rootReducer (state = initialState, action) {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
                filtered: action.payload
            }
        case GET_NAME_POKEMON:
            return {
                ...state,
                pokemons: action.payload
            }
        case GET_DETAIL_POKEMON:
            return {
                ...state,
                pokeDetail: action.payload
            }
        case GET_TYPES:
            return {
                ...state,
                pokeTypes: action.payload
            }
        case CREATE_POKEMON:
            return {
                ...state,
            }
        case FILTER_BY_TYPE:
            const type = action.payload;
            const aPokemons = state.allPokemons;
            const filteredes = aPokemons.filter((pokemon) => pokemon.types.includes(type));
            const filteredTypes = type === "all" ? aPokemons : filteredes
            return {
                ...state,
                pokemons: filteredTypes[0] ? filteredTypes : ["Theres no pokemons type"],
                filtered: filteredTypes[0] ? filteredTypes : ["Theres no pokemons type"]
            };
        case FILTER_CREATE:
            const create = action.payload;
            const filtermon = state.filtered;
            const withDb = filtermon.filter((pokemon) => pokemon.db);
            const withOutDb = filtermon.filter((pokemon) => !pokemon.db);
            let swingArray = [];
            create === "db" ? swingArray = withDb : 
            create === "api" ? swingArray = withOutDb : 
            swingArray = filtermon;
            return {
            ...state,
            pokemons: swingArray[0] ? swingArray : ["theres no pokemons"],
        };
        case ORDER_BY_NAME:
            const order = action.payload;
            const filtered = state.filtered;
            if (order === "asc") {
                return {
                    ...state,
                    pokemons: filtered?.slice().sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                    }),
                };
                }else if (order === "desc") {
                    return {
                    ...state,
                    pokemons: filtered?.slice().sort((a, b) => {
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    return 0;
                    }),
                };
                }else {
                    return { 
                        ...state, 
                        pokemons: filtered
                    };
                };
        // case ORDER_BY_STRENGTH:
        //     const orderStrength = action.payload;
        //     const filteredStrength = state.filtered;
        //     if (orderStrength === "asc") {
        //         return {
        //             ...state,
        //             pokemons: filteredStrength?.slice().sort((a, b) => {
        //                 return b.attack - a.attack;
        //             })
        //         }   
        //     }else if (orderStrength === "desc") {
        //         return {
        //             ...state,
        //             pokemons: filteredStrength?.slice().sort((a, b) => {
        //                 return a.attack - b.attack;
        //             })
        //         }    
        //     }else{
        //         return {
        //             ...state,
        //             pokemons: filteredStrength
        //         }
        //     }
        case CLEAR_DETAIL: 
                return {
                    ...state,
                    pokeDetail: []
                }
        case CLEAR_POKEMONS:
            return {
                ...state,
                pokemons: [],
                filtered: [],
                allPokemons: [],
            }
        default: 
            return state;
    };
};

export default rootReducer;