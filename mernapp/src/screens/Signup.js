
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useState } from 'react';
function BasicExample() {

    const [credentials,setcredentials] = useState({name:"",email:"",password:"",geolocation:""});
    const handlesubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser",{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
        });
        const json= await response.json();
        console.log(json);
        if(!json.success){
          alert("enter valid credentials")
        }
    }
    const onchange=(event)=>{
      setcredentials({...credentials,[event.target.name]:event.target.value});
    }
  return (
    <div className='container'>
    <Form onSubmit={handlesubmit}>
    <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" name='name' value={credentials.name} onChange={onchange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" placeholder="Enter email" name='email' value={credentials.email} onChange={onchange}/>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' value={credentials.password} onChange={onchange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Address"name='geolocation' value={credentials.geolocation} onChange={onchange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>&nbsp;&nbsp;&nbsp;
      <Button variant="primary" type="submit">
        <Link to="/login">Aready have an account</Link>
      </Button>
    </Form>
    </div>
  );
}

export default BasicExample;