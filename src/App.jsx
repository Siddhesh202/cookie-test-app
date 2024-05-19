import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [cookie, setCookie] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/v1/auth/signin/passenger', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      // if(!response.ok()) {
      //   throw new Error(`HTTP Error! status : ${response.status}`);
      // }

      const content = await response.json();
      console.log(content);
      setMessage(`Response : ${JSON.stringify(content)}`);
      
      // Attempt to read the cookie from the document
      const jwtToken = document.cookie.split('; ').find(row => row.startsWith('JwtToken'));
      console.log(document.cookie);
      const jwtTokenValue = jwtToken ? jwtToken.split('=')[1] : 'No Token Found';
      setCookie(jwtTokenValue);

    } catch (error) {
      console.error('Error : ', error);
      setMessage('Failed to send request');
    }
  }

  return(
    <div className='App'>
      <header className='App-header'>
        {/* <form onSubmit={handleSubmit}> */}
          <label>
            Email: 
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Password:
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type='submit' onClick={handleSubmit}>
            Sign In
          </button>
        {/* </form> */}

        <p> {message} </p>
        <p> JWT Token From Cookie : {cookie} </p>
      </header>
    </div>
  )
}

export default App
