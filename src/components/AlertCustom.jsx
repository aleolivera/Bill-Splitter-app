import React from 'react';
import {Alert} from 'react-bootstrap';

function AlertCustom(props){
    return(
        <>
            <Alert key={props.customKey} variant={props.variant}>
                {props.text} 
            </Alert>
        </>
    );
}
export default AlertCustom;

