import {React,useState} from 'react';
import {Row,Col,Form,InputGroup,Button,Table} from 'react-bootstrap';
import { Link } from "react-router-dom";
import PageTitle from '../components/PageTitle';
import TableBodyIndex from '../components/TableBodyIndex';
import TableHead from '../components/TableHead';
import AlertCustom from '../components/AlertCustom';

function Index(){
    const [friends,setFriends]=useState(()=>{
        let f=JSON.parse(localStorage.getItem("friends"));
        if(f==null)
            return [];
        else
            return JSON.parse(localStorage.getItem("friends"));
    });
    const [added,setAdded]=useState("");
    const [message,setMessage]=useState(null);

    const handleAdd=()=>{
        let aux=friends.filter(f=>f.name.toLowerCase()===added.toLowerCase());
        if(aux.length===0){
            let currentFriends = [];
            currentFriends=[
                ...friends,
                {
                    name:added,
                    expences:[]
                }
            ];
            setFriends(currentFriends);
            setMessage({variant:'success',text:'Friend added'});
            setAdded("");
            localStorage.setItem("friends",JSON.stringify(currentFriends));
        }
        else{
            setAdded("");
            setMessage({variant:'warning',text:'Friend already on the list'});
        }
    }
    const handleDelete=(e)=>{
        const currentFriends = friends.filter(f=>f.name!==e.target.value);
        setFriends(currentFriends);
        setMessage({variant:'danger',text:'Friend '+e.target.value+' deleted'});
        localStorage.setItem("friends",JSON.stringify(currentFriends));
    }
    const handleClean=(e)=>{
        setFriends([]);
        localStorage.removeItem("friends");
        setMessage({variant:'warning',text:'List cleaned'});
    }
    return(
        <>
            <Row className="mt-3">
                <Col>
                    <PageTitle text='Add Friends to the list' />
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <InputGroup className="mb-3">
                        <Form.Control 
                            placeholder="Add People to the list" aria-describedby="basic-addon2" 
                            value={added} onChange={(e)=>setAdded(e.target.value)} />
                        <Button variant="outline-secondary" id="btnAdd" onClick={handleAdd}>
                            Add
                        </Button>
                    </InputGroup>
                    {
                        (message!=null) &&
                        <AlertCustom customKey={0} variant={message.variant} text={message.text} />
                    }
                </Col>
            </Row>
            {
                (friends!=null&&friends.length>0) &&
                <>
                <Row className="mt-3">
                    <Col>
                        <Table striped bordered hover>
                            <TableHead columns={['Nº','Name','Action']} align='center'/>
                            <TableBodyIndex data={friends} handler={handleDelete}/>
                        </Table>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Button variant="outline-secondary" onClick={handleClean}>Clean</Button>
                    </Col>
                    <Col style={{textAlign:'end'}}>
                        <Link className='btn btn-outline-success' to='/expences'>Next</Link>
                    </Col>
                </Row>
            </>
            }
        </>
    );
}
export default Index;