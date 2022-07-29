import React from 'react';
import TableRowExpences from './TableRowExpences';
import AlertCustom from '../components/AlertCustom';
import FormRowExpences from './FormRowExpences';


function TableBodyExpences(props){
    
    const {description,quantity,price,onChangeDescription,onChangeQuantity,onChangePrice,handleAdd,handleDelete,message,currentFriend}=props;
    
    return(
            <tbody>
                <FormRowExpences description={description} onChangeDescription={onChangeDescription} 
                quantity={quantity} onChangeQuantity={onChangeQuantity} price={price} onChangePrice={onChangePrice}
                handleAdd={handleAdd} />
                {
                    message!=null &&
                    <tr>
                        <td colSpan={5}>
                            <AlertCustom customKey={0} variant={message.variant} text={message.text} />
                        </td>
                    </tr>
                }
                {
                    (currentFriend.expences.length>0) &&
                        currentFriend.expences.map((item,i)=>(
                            <>
                                <TableRowExpences index={i} expence={item} handleDelete={handleDelete}/>
                            </>
                        ))
                }
            </tbody>
    );
}
export default TableBodyExpences;