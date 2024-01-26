import Button from 'react-bootstrap/Button';
import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import { Link ,useNavigate} from 'react-router-dom';
export default function Login() {
  const [credentials,setcredentials] = useState({email:"",password:""});
  let navigate = useNavigate();
    const handlesubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/loginuser",{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json= await response.json();
        console.log(json);
        if(!json.success){
          
          alert("enter valid credentials")
        }
        else{
          localStorage.setItem("authToken",json.authToken)
          navigate("/");
        }
    }
    const onchange=(event)=>{
      setcredentials({...credentials,[event.target.name]:event.target.value});
    }
  return (
    
    <div className='container'>
    <Form onSubmit={handlesubmit}>
    
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" placeholder="Enter email" name='email' value={credentials.email} onChange={onchange}/>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' value={credentials.password} onChange={onchange}/>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>&nbsp;&nbsp;&nbsp;
      <Button variant="primary" type="submit">
        <Link to="/signup">I am a new User</Link>
      </Button>
    </Form>
    </div>
  )
}
