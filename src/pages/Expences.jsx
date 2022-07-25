import {React,useEffect,useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import { Button,Row,Col,Table,Form } from 'react-bootstrap';
import AlertCustom from '../components/AlertCustom';
import TableHead from '../components/TableHead';

function Expences(){
    const [friends,setFriends]=useState(()=>{
        let f=JSON.parse(localStorage.getItem("friends"));
        if(f==null)
            return [];
        else
            return JSON.parse(localStorage.getItem("friends"));
    });
    const [friendIndex,setFriendIndex]=useState(0);
    //const [currentFriend,setCurrentFriend]= useState(friends[friendIndex]);
    const [description,setDescription]= useState("");
    const [price,setPrice]= useState("");
    const [quantity,setQuantity]= useState(1);
    const [message,setMessage]=useState(null);
    const navigate = useNavigate();
    let currentFriend = friends[friendIndex];
    
    const validateExpence= () =>{
        const regexPrice= new RegExp('[0-9]');
        let aux=currentFriend.expences.filter(item=>item.description==description);
        if(aux!="")
            return "The item '"+description+"' is already in this list";
        else if(price<=0)
            return "Price can not be 0 or less";
        else if(!regexPrice.test(price.toString()))
            return "Not a valid price";
        else if(description=="")
            return "Description can not be empty";
        else if(quantity<=0)
            return "Quantity can not be 0 or less";
        else
            return "";
    }

    const handleChangeFriend=(e)=>{
        let i=friendIndex;
        if(e.target.id=="btnNext")
            //setCurrentFriend(friends[++i]);
            currentFriend=friends[++i];
          
        else
            //setCurrentFriend(friends[--i]);
            currentFriend=friends[--i];
        setFriendIndex(i);
        setMessage(null);
    }

    const handleAdd=()=>{
        let messageText=validateExpence();
        if(messageText==""){
            const item = {
                description:description,
                quantity:quantity,
                price:price
            }
            let friend=currentFriend;
            friend.expences.push(item);
            //setCurrentFriend(friend);
            currentFriend=friend;
    
            let updatedFriends = friends;
            updatedFriends[friendIndex]=friend;
            setFriends(updatedFriends);
            
            localStorage.setItem("friends",JSON.stringify(updatedFriends));
            setMessage({variant:'success',text:'Expences added successfully'});
        }
        else
            setMessage({variant:'warning',text:messageText});

        setDescription("");
        setPrice(0.0);
        setQuantity(0);
    }

    const handleDelete=(e)=>{
        const updatedExpences=currentFriend.expences.filter(item=>item.description!=e.target.value);

        let friend=currentFriend;
        friend.expences=updatedExpences;
        currentFriend=friend;
        //setCurrentFriend(friend);
        
        let updatedFriends = friends;
        updatedFriends[friendIndex]=friend;
        setFriends(updatedFriends);

        localStorage.setItem("friends",JSON.stringify(updatedFriends));

        setMessage({variant:'danger',text:'Deleted item '+e.target.value});
    }

    useEffect(
        () => {
            if(friends.length==0)
                navigate("/");
        },
        [],
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
                            <tbody>
                                <tr>
                                    <th>#</th>
                                    <td style={{textAlign:'center'}}>
                                        <Form.Control type='text'className='mb-3' id="txtDescription" placeholder='Description' value={description} onChange={(e)=>setDescription(e.target.value)} />
                                    </td>
                                    <td style={{textAlign:'center'}}>
                                        <Form.Control type='number' id="txtQuantity" placeholder='Quantity' min="1" max='99' value={quantity} onChange={(e)=>setQuantity(e.target.value)} />
                                    </td>
                                    <td style={{textAlign:'center'}}>
                                        <Form.Control type='text' id="txtPrice" placeholder='Price' value={price} onChange={(e)=>setPrice(e.target.value)} />
                                    </td>
                                    <td style={{textAlign:'center'}}>
                                        <Button id="btnAdd" variant="outline-primary" onClick={handleAdd}>Add</Button>
                                    </td>
                                </tr>
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
                                            <tr key={i}>
                                                <th><p className="lead"><b>{i+1}</b></p></th>
                                                <td style={{textAlign:'center'}}><p className="lead">{item.description}</p></td>
                                                <td style={{textAlign:'center'}}><p className="lead">{item.quantity}</p></td>
                                                <td style={{textAlign:'center'}}><p className="lead">${item.price}-.</p></td>
                                                <td>
                                                    <Button variant="outline-danger" id='btnDelete' value={item.description} onClick={handleDelete}>
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row className="mt-3">
                    {
                        (friendIndex>0) &&
                        <Col><Button variant='btn btn-outline-success' id="btnBack" onClick={handleChangeFriend}>Back</Button></Col>
                    }  
                    {
                        (friendIndex==0) &&
                        <Col><Link className='btn btn-outline-secondary' to='/' id="btnIndex" >Back</Link></Col>
                    }  
                    {
                        (friends.length > friendIndex+1) &&
                        <Col style={{textAlign:'end'}}>
                            <Button variant='btn btn-outline-success' id="btnNext" onClick={handleChangeFriend}>Next</Button>
                        </Col>
                    }
                    {
                        (friends.length == friendIndex+1) &&
                        <Col style={{textAlign:'end'}}>
                            <Link className='btn btn-outline-primary' to='/bill' id="btnCalculate" >Calculate</Link>
                        </Col>
                    }
                </Row>
            </>
        );
    }
    else{
        return(
            <h1>Rompio</h1>
        )
    }
}
export default Expences;