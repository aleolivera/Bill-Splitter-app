import {React,useState,useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import {Row,Col,Table,Button} from 'react-bootstrap';
import TableHead from '../components/TableHead';

function Bill(){
    
    const [friends,setFriends]=useState(JSON.parse(localStorage.getItem('friends')));
    const [friendsOnTable,setFriendsOnTable]=useState(()=>{
        let friendsOnTable=[];
        friends.map(friend => {
            let sum=0;
            friend.expences.forEach((expence)=>{
                sum+=Number.parseFloat(expence.price);
            })
            friendsOnTable.push(
                {
                    name:friend.name,
                    total:sum
                }
            );
        });
        return friendsOnTable;
    });
    const[totalSpent,setTotalSpent]= useState(()=>{
        let sum=0;
        friendsOnTable.map((friend) => {
            sum+=friend.total;
        })
        return sum;
    })
    const navigate= useNavigate();
    let numberOfFriends=friendsOnTable.length;
    let cutPerFriend=(totalSpent/numberOfFriends);

    const handleFinish= ()=>{
        localStorage.removeItem("friends");
        navigate('/');
    }

    useEffect(
        ()=>{
            if(friends.length==0)
                navigate("/");
        },
        []
    );
    
    if(friends.length>0){  
        return(
            <>
                <Row className="mt-3">
                    <Col><PageTitle text='Bill' /></Col>
                </Row>
                <Row className="mt-2">
                    <Table>
                        <TableHead columns={['#','Friend','Spent','Has to','This much']} align='center'></TableHead>
                        <tbody>
                            {friendsOnTable.map((f,i)=>(
                                <>
                                    {
                                        (f.total>cutPerFriend) &&
                                        <tr key={i} style={{textAlign:'center'}} className='table-success'>
                                            <th><p className="lead"><b>{i+1}</b></p></th>
                                            <td><p className="lead">{f.name}</p></td>
                                            <td><p className="lead">${f.total}-.</p></td>
                                            <td><p className="lead">Take</p></td>
                                            <td><p className="lead">${(f.total-cutPerFriend).toFixed(2)}-.</p></td>
                                        </tr>
                                    }
                                
                                    {
                                        (f.total<cutPerFriend) &&
                                        <tr key={i} style={{textAlign:'center'}} className='table-danger'>
                                            <th><p className="lead"><b>{i+1}</b></p></th>
                                            <td><p className="lead">{f.name}</p></td>
                                            <td><p className="lead">${f.total}-.</p></td>
                                            <td><p className="lead">Give</p></td>
                                            <td><p className="lead">${(cutPerFriend-f.total).toFixed(2)}-.</p></td>
                                        </tr>
                                    }

                                    {
                                        (f.total==cutPerFriend) &&
                                        <tr key={i} style={{textAlign:'center'}} className='table-secondary'>
                                            <th><p className="lead"><b>{i+1}</b></p></th>
                                            <td><p className="lead">{f.name}</p></td>
                                            <td><p className="lead">${f.total}-.</p></td>
                                            <td><p className="lead">Do Nothing</p></td>
                                            <td><p className="lead"> - </p></td>
                                        </tr>
                                    }
                                </>    
                                
                            ))}
                        </tbody>
                        <tfoot>
                            <tr style={{textAlign:'center'}}>
                                <th colSpan={3}><p className="lead" style={{fontSize:'150%'}}><b>Total Spent: ${totalSpent.toFixed(2)}-.</b></p></th>
                                <th colSpan={2}><p className="lead" style={{fontSize:'150%'}}><b>Each's Cut: ${cutPerFriend.toFixed(2)}-.</b></p></th>
                            </tr>
                        </tfoot>
                    </Table>
                </Row>
                <Row className="mt-3"> 
                    <Col><Link className='btn btn-outline-success' to='/expences' id="btnBack" >Back</Link></Col>
                    <Col style={{textAlign:'end'}}><Button variant='btn btn-outline-primary' onClick={handleFinish}>Finish</Button></Col>
                </Row>
            
            </>
        );
    }
    else{
        return(
            <h1>Rompio</h1>
        );
    }
}
export default Bill;