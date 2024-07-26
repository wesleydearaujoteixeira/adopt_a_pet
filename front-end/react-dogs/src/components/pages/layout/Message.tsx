import { useState, useEffect} from "react";

import styles from "./Message.module.css";
import bus from '../../../utils/bus';


export function Message() {

    const [types, setTypes] = useState("");
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);


    useEffect(() => {
        bus.addListener('flash', ({message, type}) => {
            setMessage(message);
            setTypes(type);
            setVisible(true);
        } )

        setTimeout(() => {
            setVisible(false);
        }, 3000);

    },[]);


    return (
       
        visible == true && (
            <div className={`${styles.Message} ${styles[types]}`}>
            {message}
        </div>
        )



    );
}

