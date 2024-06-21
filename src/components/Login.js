import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'; 
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import endpoints from "../constants/API"; 
const fields = loginFields;

export default function LoginPage() {
    const initialLoginState = {
        email: '',
        password: ''
    };
    const [loginState, setLoginState] = useState(initialLoginState);
    const [loggedIn, setLoggedIn] = useState(false); 
    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();
    }

    
    const authenticateUser = () => {
        const endpoint = endpoints.login; 
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: loginState.email,
                password: loginState.password
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Login success:", data);
            
           
            localStorage.setItem('userData', JSON.stringify(data));

            
            setLoggedIn(true);
        })
        .catch(error => {
            console.error("Login error:", error);
          
        });
    }

   
    if (loggedIn) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />
                    )
                }
            </div>

            <FormExtra />
            <FormAction handleSubmit={handleSubmit} text="Login" />

        </form>
    )
}
