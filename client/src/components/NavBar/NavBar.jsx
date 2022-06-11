import React from 'react'
import { Link} from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';
import styles from './NavBar.module.css';
import logo from "../../images/pokemon.png"

export default function NavBar({pokeTypes, orderByName, filterByType, filterCreate, setCurrentPage}) {
  return (
    
    <div className={styles.background}>
      <div>
        <img className={styles.tamaño} src={logo} alt="logo" />
      </div>
        <div className={styles.space} >
        <Link  to="/"><button className={styles.btn}> <p className={styles.left}></p> </button></Link>
        <select onChange={orderByName}>
          <option selected disabled>Order from</option>
          <option value="default">All</option>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>
        <select onChange={filterByType}>
          <option selected disabled>Select Types</option>
          <option value="all">All</option>
            {pokeTypes?.map((type) => {
              return (
                <option key={type.name} value={type.name}>
                  {type.name}
                </option>
              );
            })}
        </select>
        <select onChange={filterCreate}>
            <option selected disabled>Select Source</option>
            <option value="all">All</option>
            <option value="db">Db</option>
            <option value="api">Api</option>
          </select>
        <SearchBar setCurrentPage={setCurrentPage} className={styles.search} />
        <Link to="/create"><button className={styles.btn2}>Create a Pokemon</button></Link>
        </div>
        
    </div>              
  )
}
