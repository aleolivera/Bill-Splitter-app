import {React,useEffect,useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import { Button,Row,Col,Table } from 'react-bootstrap';
import TableHead from '../components/TableHead';
import {validateExpence,calculateTotalSpent} from '../resources/Util';
import TableBodyExpences from '../components/TableBodyExpences';
import TableFootExpences from '../components/TableFootExpences';

function Expences(){
    const [friends,setFriends]=useState(()=>{
        let f=JSON.parse(localStorage.getItem("friends"));
        if(f==null)
            return [];
        else
            return JSON.parse(localStorage.getItem("friends"));
    });
    const [friendIndex,setFriendIndex]=useState(0);
    const [description,setDescription]= useState("");
    const [price,setPrice]= useState("");
    const [quantity,setQuantity]= useState(1);
    const [message,setMessage]=useState(null);
    const navigate = useNavigate();
    let currentFriend = friends[friendIndex];
    const [totalSpent,setTotalSpent]=useState(0);
    
    const handleChangeFriend=(e)=>{
        let i=friendIndex;
        if(e.target.id==="btnNext")
            currentFriend=friends[++i];
          
        else
            currentFriend=friends[--i];
        setFriendIndex(i);
        setTotalSpent(0);
        setMessage(null);
    }

    const handleAdd=()=>{
        let messageText=validateExpence(currentFriend,description,price,quantity);
        if(messageText===""){
            const total=(price*quantity);
            const item = {
                description:description,
                quantity:quantity,
                price:(total)
            }
            let friend=currentFriend;
            friend.expences.push(item);
            currentFriend=friend;
    
            let updatedFriends = friends;
            updatedFriends[friendIndex]=friend;
            setFriends(updatedFriends);
            setTotalSpent(Number(totalSpent)+total);

            localStorage.setItem("friends",JSON.stringify(updatedFriends));
            setMessage({variant:'success',text:'Expence added successfully'});
        }
        else
            setMessage({variant:'warning',text:messageText});

        setDescription("");
        setPrice("");
        setQuantity(1);
    }

    const handleDelete=(e)=>{
        const updatedExpences=currentFriend.expences.filter(item=>item.description!==e.target.value);

        let friend=currentFriend;
        friend.expences=updatedExpences;
        currentFriend=friend;
        
        let updatedFriends = friends;
        updatedFriends[friendIndex]=friend;
        setFriends(updatedFriends);
        setTotalSpent(calculateTotalSpent(currentFriend));
        localStorage.setItem("friends",JSON.stringify(updatedFriends));

        setMessage({variant:'danger',text:'Deleted item '+e.target.value});
    }

    useEffect(
        () => {
            if(friends.length===0)
                navigate("/");
            console.log("useEffect");
            setTotalSpent(calculateTotalSpent(currentFriend));
        },
        [friends,navigate,currentFriend],
      );

    if(friends.length>0){
        return(
            <>
                <Row className="mt-2">
                    <Col><PageTitle text='Expences' /></Col>
                </Row>
                <Row className="mt-2">
                    <Col><h1 className="display-5">{friends[friendIndex].name}</h1></Col>
                </Row>
                <Row>
                    <Col>
                        <Table responsive="sm">
                            <TableHead columns={['Nº','Description','Quantity','Price','Action']} align='center'/>
                            <TableBodyExpences description={description} quantity={quantity} price={price} 
                            onChangeDescription={(e)=>setDescription(e.target.value)} 
                            onChangeQuantity={(e)=>setQuantity(e.target.value)}
                            onChangePrice={(e)=>setPrice(e.target.value)} 
                            handleAdd={handleAdd} handleDelete={handleDelete} 
                            message={message} currentFriend={currentFriend}/>
                            {
                                    (currentFriend.expences.length>0) &&
                                    <TableFootExpences totalSpent={totalSpent}/>
                            }
                        </Table>
                    </Col>
                </Row>
                <Row className="mt-3">
                    {
                        (friendIndex>0) &&
                        <Col><Button variant='btn btn-outline-success' id="btnBack" onClick={handleChangeFriend}>Back</Button></Col>
                    }  
                    {
                        (friendIndex===0) &&
                        <Col><Link className='btn btn-outline-secondary' to='/' id="btnIndex" >Back</Link></Col>
                    }  
                    {
                        (friends.length > friendIndex+1) &&
                        <Col style={{textAlign:'end'}}>
                            <Button variant='btn btn-outline-success' id="btnNext" onClick={handleChangeFriend}>Next</Button>
                        </Col>
                    }
                    {
                        (friends.length === friendIndex+1) &&
                        <Col style={{textAlign:'end'}}>
                            <Link className='btn btn-outline-primary' to='/bill' id="btnCalculate" >Calculate</Link>
                        </Col>
                    }
                </Row>
            </>
        );
    }
}
export default Expences;