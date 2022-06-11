import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getTypePokemon,createPokemon} from "./../../redux/actions";
import validate from "../Validate/Validate"
import styles from "./CreatePokemon.module.css";

function CreatePokemon() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {pokeTypes} = useSelector((state) => state);
  const [state, setState] = useState({ 
    name: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
    image: "",
  });

  const [error, setError] = useState({}); //State para manejar los errores
  const [disabled, setDisabled] = useState(true); //state para deshabilitar el boton submit

  useEffect(() => {
    if ( //Validacion habilitar el boton submit
      state.name.length > 0 &&
      state.name.length <= 10 &&
      isNaN(state.name) && 
      state.types.length < 3 &&
      !error.hasOwnProperty("image") &&
      !error.hasOwnProperty("life") &&
      !error.hasOwnProperty("attack") &&
      !error.hasOwnProperty("defense") &&
      !error.hasOwnProperty("speed") &&
      !error.hasOwnProperty("height") &&
      !error.hasOwnProperty("weight")
    ) {
      setDisabled(false); //si todo esta correcto se habilitara el boton submit
    } else {
      setDisabled(true); //si no se deshabilitara el boton submit
    };
    dispatch(getTypePokemon());
  }, [error, state, disabled, dispatch]); //se ejecuta cada vez que se modifica el state

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(createPokemon(state)); //se crea el pokemon
    setState({ //se limpia el state
      name: "",
      life: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      types: [],
      image: "",
    });
    setTimeout(() => { //se redirecciona al home 
      navigate("/Home");
    }, 1000);
  };

  const handleInput = (e) => {
    setError(validate({ ...state, [e.target.name]: e.target.value })); //se valida el input
    setState({...state, [e.target.name]: e.target.value //se modifica el state para que se vea el cambio
    });
  };

  const handleCheckbox = (e) => { //se valida el checkbox
    if (e.target.checked) {//si esta checkeado se agrega el tipo
      setState( {
          ...state,
          types: [...state.types, e.target.value], //una copia del state con el tipo agregado
      });
    }
    if (!e.target.checked) { //si no esta checkeado se quita el tipo
      state.types.splice(state.types.indexOf(e.target.value), 1); //se quita el tipo
      setState( { //una copia del state con el tipo quitado
        ...state 
      });
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.btn4}><Link className={styles.lin} to="/home"> <p className={styles.left}></p> </Link></div>
      <div className={styles.container}>
        <div>
          <p className={styles.text}>NEW POKEMON</p>
        </div>
        <form  onSubmit={handleOnSubmit} >
          <div >
            <div className={styles.cint}>
              <input
                className={styles.cint2}
                onChange={handleInput}
                type="text"
                id="name"
                name="name"
                placeholder="Name.."
                required
                autoComplete="off"
                value={state.name}
              />
              {error.name && <p className={styles.texterror}>{error.name}</p>}
            </div>
            <div className={styles.cint3}>
              <input
                className={styles.cint2}
                onChange={handleInput}
                type="url"
                placeholder="Url image"
                id="image"
                name="image"
                autoComplete="off"
                value={state.image}
              />
              {error.image && <p>{error.image}</p>}
            </div>
            <div className={styles.cint3}>
              <input
                className={styles.cint2}
                onChange={handleInput}
                type="number"
                placeholder="Insert Height"
                id="height"
                name="height"
                autoComplete="off"
                value={state.height}
              />
              {error.height && <p>{error.height}</p>}
            </div>
            <div className={styles.cint3}>
              <input
                className={styles.cint2}
                onChange={handleInput}
                type="number"
                id="weight"
                placeholder="Insert Weight"
                name="weight"
                autoComplete="off"
                value={state.weight}
              />
              {error.weight && <p>{error.weight}</p>}
            </div>
            <div className={styles.cint3}>
              <input
                className={styles.cint2}
                onChange={handleInput}
                type="number"
                id="life"
                placeholder="Insert Life"
                name="life"
                autoComplete="off"
                value={state.life}
              />
              {error.life && <p>{error.life}</p>}
            </div>
            <div className={styles.cint3} >
              <input
                className={styles.cint2}
                onChange={handleInput}
                type="number"
                placeholder="Insert Attack"
                id="attack"
                name="attack"
                autoComplete="off"
                value={state.attack}
              />
              {error.attack && <p>{error.attack}</p>}
            </div>
            <div className={styles.cint3} >
              <input
                className={styles.cint2}
                onChange={handleInput}
                type="number"
                placeholder="Insert Defense"
                id="defense"
                name="defense"
                autoComplete="off"
                value={state.defense}
              />
              {error.defense && <p>{error.defense}</p>}
            </div>
            <div className={styles.cint3}>
              <input
                className={styles.cint2}
                onChange={handleInput}
                type="number"
                placeholder="Insert Speed"
                id="speed"
                name="speed"
                autoComplete="off"
                value={state.speed}
              />
              {error.speed && <p>{error.speed}</p>}
            </div>
          </div>
          <div>
            <p className={styles.btn2}>Types</p>
            {pokeTypes?.map((type) => {
              return (
                <div className={styles.content2} key={type.id}>
                  <div>
                    <label>
                      <input 
                        type="checkbox"
                        name="types"
                        value={type.name}
                        onChange={(e) => handleCheckbox(e)}
                      />
                      <span>{type.name}</span>
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
          {state.types.length > 2 && <p className={styles.texterror2}>Just two Types!</p>}
          <input
            className={styles.btn}
            type="submit"
            value="Create"
            disabled={disabled}
          />
        </form>
      </div>
    </div>
  );
}

export default CreatePokemon;