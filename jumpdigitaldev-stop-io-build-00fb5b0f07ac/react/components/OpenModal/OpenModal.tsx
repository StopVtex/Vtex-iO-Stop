import React,  { useEffect, useState } from "react";

let OpenModal = ({ children } : any) => {
    const [hasOpenedModal, setHasOpenedModal ] = useState(true);

    const dateAddedWeek = () => new Date(new Date().setDate(new Date().getDate() + 3));

    useEffect(() => {
        let isOpenedModalDate = window.localStorage.getItem('isOpenedModal')
        if( isOpenedModalDate === null ) {
            setHasOpenedModal(false);
            window.localStorage.setItem('isOpenedModal', dateAddedWeek().toString());
        } else {
            if( new Date().valueOf() > new Date(isOpenedModalDate).valueOf() ) {
                setHasOpenedModal(false);
                window.localStorage.setItem('isOpenedModal', dateAddedWeek().toString());   
                return;
            }
            setHasOpenedModal(true)
        };
    }, []);
    
    if( !hasOpenedModal ) return <div>{children[0]}</div>
    else return <div></div>
}
export default OpenModal;