import React from 'react';
import {Button} from 'react-bootstrap';
function TableRowExpences(props){
    
    const {index,expence,handleDelete}=props;
    return(
        <tr key={index}>
            <th><p className="lead"><b>{index+1}</b></p></th>
            <td style={{textAlign:'center'}}><p className="lead">{expence.description}</p></td>
            <td style={{textAlign:'center'}}><p className="lead">{expence.quantity}</p></td>
            <td style={{textAlign:'center'}}><p className="lead">${expence.price}-.</p></td>
            <td>
                <Button variant="outline-danger" id='btnDelete' value={expence.description} onClick={handleDelete}>
                    Delete
                </Button>
            </td>
        </tr>
    );
}
export default TableRowExpences;