import React from 'react';
import {Button} from 'react-bootstrap';

function TableBodyIndex(props){
    //const columnsHead=props.columns.map((column)=>(<th>{column}</th>));
    return(
        <>
            <tbody>
                {props.data.map((d,i)=>(
                    <tr key={i}>
                        <th style={{textAlign:'center'}}><p className="lead"><b>{i+1}</b></p></th>
                        <td style={{textAlign:'center'}}><p className="lead">{d.name}</p></td>
                        <td style={{textAlign:'center'}}>
                            <Button variant="outline-danger" name="btnDelete" value={d.name} onClick={props.handler}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </>
    );
}
export default TableBodyIndex;