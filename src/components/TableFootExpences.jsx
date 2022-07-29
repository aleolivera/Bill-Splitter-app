import React from 'react';

function TableFootExpences(props){
    
    const {totalSpent}=props;
    return(
        <tfoot>
            <tr>
                <td colSpan={5} style={{textAlign:'center'}}>
                    <p className="lead">
                        <b>Total: ${totalSpent}-.</b>
                    </p>
                </td>
            </tr>
        </tfoot>
    );
}
export default TableFootExpences;