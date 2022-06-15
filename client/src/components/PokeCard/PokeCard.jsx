import React from 'react'
import { Link } from 'react-router-dom'
import gengar from "../../images/gengarmx.gif";
import styles from "./PokeCard.module.css";
import snorlax from "../../images/snorlax.png";

export default function pokeCard ({image, name, types, id, db, life, weight, height}){
    if(!image && !name && !types && !id && !db && !life){
        return(
            <div className={styles.contant}>
                <p className={styles.text10}>Pokemon not found...</p>
                <img className={styles.leting} src={snorlax} alt="not found" />
            </div>
        )
    }else{
        return (
            <div className={styles.content}>
                <div className={styles.picture}>
                    <div className={styles.cp}>
                        {db ?( <p className={styles.text}>db</p> ) : ( <span className={styles.text}>ID{id}</span> )}
                    </div>
                    {image?<Link to={`/home/${id}`}><img className={styles.pokei} src={image} alt="pokemon card"/></Link> : <Link to={`/home/${id}`}><img className={styles.pokei} src={gengar} alt="pokemon card"/></Link>}
                    <div className={styles.circle}></div>
                </div>
                <div className={styles.info}>
                    <div className={styles.bar}>
                        <p className={styles.text2}>{name[0].toUpperCase() + name.slice(1)}</p>
                        <p className={styles.size1}>HP {life}</p>
                    </div>
                    <div className={styles.pokemondata}>
                        <div className={styles.type}>
                            {types[0] ? types.map(type=> <p className={styles.text4} key={type}>{type}</p>
                            ):(
                                <p>None</p>
                            )}
                        </div>
                        <div className={styles.weight}>
                            {weight}kg
                        </div>
                        <div className={styles.height}>
                            {height}m
                        </div>
                    </div>
                    <div className={styles.clasi}>
                        <p>Types</p>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <p>Weight</p>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <p>Height</p>
                    </div>
                </div>
            </div>
        )
    }
    
}