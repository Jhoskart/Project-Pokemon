import React, {useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDetailPokemon,clearDetail } from '../../redux/actions'
import styles from "./PokeDetail.module.css"
import Loader from '../Loader/Loader'
import gengar from "../../images/gengarmx.gif";

const PokeDetail = () => {
    let {id} = useParams();    
    const dispatch = useDispatch();
    useEffect(() => {
    dispatch(getDetailPokemon(id))
        return () => {
            dispatch(clearDetail())
        }
    }, [dispatch, id])
    const {pokeDetail} = useSelector(state => state);
    if(!pokeDetail[0]){
        return (
            <div className={styles.container}>
                <Loader />
            </div>
        )
    }else{
        return (
            <div className={styles.container}>
                <div>
                    <Link to="/home"> <button className={styles.btn4}>back</button></Link>
                </div>
                <div className={styles.content}>
                    <div className={styles.picture}>
                        <div className={styles.pokemonCp}> 
                            {pokeDetail[0].db ? (
                                <p className={styles.text1}>db</p>
                            ): (
                                <p className={styles.text1}>ID{pokeDetail[0]?.id}</p>
                            )}
                        </div>
                        {pokeDetail[0].image ? <img className={styles.image} src={pokeDetail[0].image} alt="Icon pokemon"/> : <img className={styles.rex} src={gengar} alt="Icon pokemon"/>}
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.name}>
                            <p>{pokeDetail[0]?.name}</p>
                            <p className={styles.size1}>HP {pokeDetail[0]?.life}</p>
                        </div>
                        <div className={styles.data}>
                            <div className={styles.type}>
                                <p>{pokeDetail[0].types[0] ? pokeDetail[0].types.map((type)=> <p>{type}</p>):(
                                    <p>None</p>
                                )}</p>
                                <div className={styles.textsmall}>Types</div>
                            </div>
                            <div className={styles.weight}>
                                <p>{pokeDetail[0]?.weight}kg</p>
                                <div className={styles.textsmall2}>Weight</div>
                            </div>
                            <div className={styles.height}>
                                <p>{pokeDetail[0]?.height}m</p>
                                <div className={styles.textsmall3}>Height</div>
                            </div>
                        </div>
                        <div className={styles.status}>
                            <div className={styles.power}>
                                <p className={styles.ti}>{pokeDetail[0]?.attack}</p>
                                <p className={styles.text10}>POWER</p>
                            </div>
                            <div className={styles.defense}>
                                <p className={styles.ti2}>{pokeDetail[0]?.defense}</p>
                                <p className={styles.text11}>DEFENSE</p>
                            </div>
                            <div className={styles.speed}>
                                <p className={styles.ti3}>{pokeDetail[0]?.speed}</p>
                                <p className={styles.text12}>SPEED</p>
                            </div>
                        </div>
                        <div className={styles.abilities}>
                            <p>{pokeDetail[0].abilities ? pokeDetail[0].abilities.map((a)=> <span className={styles.text13}>{a}</span>) : (<span className={styles.text13}>theres no abilities</span>) }</p>
                        </div>
                        <div className={styles.weapon}>
                            <p className={styles.te}>ABILITIES</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
    
}

export default PokeDetail;