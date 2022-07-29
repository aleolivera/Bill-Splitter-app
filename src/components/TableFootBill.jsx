import React from 'react'

function TableFootBill(props){
    const {totalSpent,cutPerFriend}= props
    
    return(
        <tfoot>
            <tr style={{textAlign:'center'}}>
                <th colSpan={3}><p className="lead" style={{fontSize:'150%'}}><b>Total Spent: ${totalSpent.toFixed(2)}-.</b></p></th>
                <th colSpan={2}><p className="lead" style={{fontSize:'150%'}}><b>Each's Cut: ${cutPerFriend.toFixed(2)}-.</b></p></th>
            </tr>
        </tfoot>
    );
}
export default TableFootBill;

