import {React,useState,useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import {Row,Col,Table,Button} from 'react-bootstrap';
import TableHead from '../components/TableHead';
import TableBodyBill from '../components/TableBodyBill';
import TableFootBill from '../components/TableFootBill';

function Bill(){
    const [friends]=useState(()=>{
        let f=JSON.parse(localStorage.getItem("friends"));
        if(f==null)
            return [];
        else
            return JSON.parse(localStorage.getItem("friends"));
    });
    const [friendsOnTable]=useState(()=>{
        let friendsOnTable=[];
        if(friends){
            friends.forEach(friend => {
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
        }
        else
            friendsOnTable=[];
        return friendsOnTable;
    });
    const[totalSpent]= useState(()=>{
        let sum=0;
        friendsOnTable.forEach((friend) => {
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
            if(friends.length===0)
                navigate("/");
        },
        [friends,navigate]
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
                        <TableBodyBill data={friendsOnTable} cutPerFriend={cutPerFriend} />
                        <TableFootBill totalSpent={totalSpent} cutPerFriend={cutPerFriend}/>
                    </Table>
                </Row>
                <Row className="mt-3"> 
                    <Col><Link className='btn btn-outline-success' to='/expences' id="btnBack" >Back</Link></Col>
                    <Col style={{textAlign:'end'}}><Button variant='btn btn-outline-primary' onClick={handleFinish}>Finish</Button></Col>
                </Row>
            
            </>
        );
    }
}
export default Bill;