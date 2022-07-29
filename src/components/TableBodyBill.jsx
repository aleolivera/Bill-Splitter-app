import React from 'react';
import TableRowBill from './TableRowBill';

function TableBodyBill(props){
    
    const {data,cutPerFriend}=props;
    return(
        <>
            <tbody>
                {data.map((friend,i)=>(
                    <>
                        {
                            (friend.total>cutPerFriend) &&
                            <TableRowBill data={friend} cutPerFriend={cutPerFriend} index={i} rowColor={'table-success'} text="Take"/>
                        }
                    
                        {
                            (friend.total<cutPerFriend) &&
                            <TableRowBill data={friend} cutPerFriend={cutPerFriend} index={i} rowColor={'table-danger'} text="Give"/>
                        }

                        {
                            (friend.total===cutPerFriend) &&
                            <TableRowBill data={friend} cutPerFriend={cutPerFriend} index={i} rowColor={'table-secondary'} text="Do Nothing"/>
                        }
                    </>    
                ))}
            </tbody>
        </>
    );
}
export default TableBodyBill;