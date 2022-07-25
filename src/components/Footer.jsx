import React from 'react';
import {Row,Col} from 'react-bootstrap';

const rowStyle={
    background:"rgba(248,249,250,1)",
    marginTop:'5%'
}

function Footer(){
    return(
        <>
            <Row style={rowStyle}>
                <Col>
                     <label>ReactJS App</label><br></br>
                     <a href='https://github.com/aleolivera/Bill-Splitter-app.git'>Github Repository</a>
                </Col>
                <Col>
                    <Row style={{textAlign:'end'}}>
                        <label>Contact:</label>
                        <a href='mailto:alejandro.olivera@alumnos.frgp.utn.edu.ar'>alejandro.olivera@alumnos.frgp.utn.edu.ar</a>
                    </Row>
                        
                    
                </Col>
            </Row>
        </>
    );
}
export default Footer;