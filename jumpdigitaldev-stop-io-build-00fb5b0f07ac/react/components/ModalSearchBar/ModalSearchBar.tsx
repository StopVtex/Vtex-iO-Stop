import React, { useState } from 'react';
import styles from './styles.css';

const ModalSearchBar = ({ children }: any) => {

    const [showModalSearch, setShowModalSearch] = useState(false);

    return (
        <div className={styles.containerModalSearchBar}>
            <div className={`${styles.contentModalSearchBar} ${showModalSearch ? styles.showModalSearch : ''}`}>
                {children}
            </div>
            <div className={styles.containerButtonModalSearchBar}>
                <button 
                    className={`${styles.buttonModalSearchBar} ${showModalSearch ? styles.iconCloseModal : ''}`}
                    onClick={() => setShowModalSearch(!showModalSearch)}
                    >
                    {showModalSearch ? 'Cerrar' : 'Buscar'}
                </button>
            </div>
        </div>
    )
}

export {ModalSearchBar}