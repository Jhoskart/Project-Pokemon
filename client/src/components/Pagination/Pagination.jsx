import React from 'react'
import styles from "./Pagination.module.css"

const Pagination = ({page, setPage, maximo}) => {
    const [input, setInput] = React.useState(1); //creo el estado input para setearle el valor a la etiqueta input
    const nextPage =() => { // funcion para para setear el input y la pagina para avanzar a la siguiente pagina
        setInput(parseInt(input) + 1); //parseInt para que siempre sea un numero
        setPage(parseInt(page) + 1);
    }
    const prevPage = () => { // funcion para setear el input y la pagina para retroceder a la pagina anterior
        setInput(parseInt(input) - 1);
        setPage(parseInt(page) - 1);
    }
    const keyInput = (e) =>{
        if(e.keyCode === 13){
            setPage(parseInt(e.target.value));
            if( parseInt(e.target.value) < 1 ||  //validaciones para cuando se setea la pagina no sea un numero negativo
                parseInt(e.target.value) > Math.ceil(maximo) ||// o mayor al maximo de paginas
                isNaN(parseInt(e.target.value))//o no sea un numero
                ){
                setPage(1);// setea la pagina a 1
                setInput(1);//y el input a 1
            }else{
            setPage(parseInt(e.target.value)); //si no setea la pagina a la pagina que se ingreso en el input
        }
    }
};
    const onChange = (e) => { //cambia el valor del input de la pagina
        setInput(e.target.value);
    }
    
    return (
    <div className={styles.container}>
        <button className={styles.btn} disabled={page <= 1} onClick={prevPage}> <p className={styles.left}></p> </button>
        &nbsp;
        <input className={styles.cont} onChange={(e) => onChange(e)} onKeyDown={e => keyInput(e)} name="page" autoComplete="off" value={input} />
        <p className={styles.text}> de {Math.ceil(maximo)}</p>
        &nbsp;  
        <button className={styles.btn2} disabled={page >= Math.ceil(maximo)} onClick={nextPage}><p className={styles.right}></p></button>
    </div>
    )
}

export default Pagination
