import React from 'react';

function TableHead(props){
    const columnsHead=props.columns.map((column,i)=>(<th key={i}>{column}</th>));
    const align=props.align;
    return(
        <>
            <thead>
                <tr style={{textAlign:align}}>
                    {columnsHead}
                </tr>
            </thead>
        </>
    );
}
export default TableHead;