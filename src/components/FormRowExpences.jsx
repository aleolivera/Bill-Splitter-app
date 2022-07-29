import React from 'react';
import { Button,Form } from 'react-bootstrap';

function FormRowExpences(props){
    const {description,onChangeDescription,quantity,onChangeQuantity,price,onChangePrice,handleAdd}=props;
    return(
        <tr>
            <th>#</th>
            <td style={{textAlign:'center'}}>
                <Form.Control type='text'className='mb-3' id="txtDescription" placeholder='Description' value={description} onChange={onChangeDescription} />
            </td>
            <td style={{textAlign:'center'}}>
                <Form.Control type='number' id="txtQuantity" placeholder='Quantity' min="1" max='99' value={quantity} onChange={onChangeQuantity} />
            </td>
            <td style={{textAlign:'center'}}>
                <Form.Control type='number' id="txtPrice" placeholder='Price' value={price} onChange={onChangePrice} />
            </td>
            <td style={{textAlign:'center'}}>
                <Button id="btnAdd" variant="outline-primary" onClick={handleAdd}>Add</Button>
            </td>
        </tr>
    );
}
export default FormRowExpences;