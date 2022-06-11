import { Link } from "react-router-dom";
import styles from "./landingPage.module.css";
import logo from "../../images/pokemon.png"

function landingPage() {
    
    return (
        <div className={styles.background}>
            <div>
                <img className={styles.logo} src={logo} alt="logo" />
                <p className={styles.title}>let's begin!</p>
                <Link to="/home">
                    <div className={`${styles.pokeball} ${styles.animated}`}></div>
                </Link>
            </div>
            
        </div>
    )
}

export default landingPage;