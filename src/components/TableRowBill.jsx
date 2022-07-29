import {React,useEffect,useState} from 'react';

function TableRowBill(props){
    
    const {data,cutPerFriend,index,rowColor,text}=props;
    const [balance,setBalance]=useState(0.0);

    useEffect(
        ()=>{
            let sum =Number.parseFloat(data.total)-Number.parseFloat(cutPerFriend);
            console.log('data: '+data.total+'cut: '+cutPerFriend+ 'sum: '+sum);
            if(sum<0)
                setBalance((sum)*-1);
            else
                setBalance(sum);
        },
        [balance,data,cutPerFriend]
    )

    return(
            <tr key={index} style={{textAlign:'center'}} className={rowColor}>
                {console.log('RENDER')}
                <th><p className="lead"><b>{index+1}</b></p></th>
                <td><p className="lead">{data.name}</p></td>
                <td><p className="lead">${data.total}-.</p></td>
                <td><p className="lead">{text}</p></td>
                <td><p className="lead">${balance.toFixed(2)}-.</p></td>
            </tr>
    );
}
export default TableRowBill;