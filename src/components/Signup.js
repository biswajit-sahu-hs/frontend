import React, { useState } from 'react';
import { Navigation } from 'react-router-dom';
import FormAction from "./FormAction";
import Input from "./Input";
import endpoints from "../constants/API"; 
import { signupFields } from "../constants/formFields"; 

const Signup = () => {
    
    const [signupState, setSignupState] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        dob: '',
        street: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        phone: '',
        role: '' 
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setSignupState({ ...signupState, [id]: value });
    };

    const handleDropdownChange = (selectedRole) => {
        setSignupState({ ...signupState, role: selectedRole });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = endpoints.signup; 
    
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: signupState.email,
                    password: signupState.password,
                    firstname: signupState.firstname,
                    lastname: signupState.lastname,
                    
                    dob: signupState.dob,
                    address: {
                        street: signupState.street,
                        city: signupState.city,
                        state: signupState.state,
                        country: signupState.country,
                        zipCode: signupState.zipCode,
                        phone: signupState.phone
                    },
                    
                    role: "member"
                })
            });
    
            if (!response.ok) {
                throw new Error('Signup failed');
            }
    
            const data = await response.json();
            console.log("Signup success:", data);
    
           
          
    
        } catch (error) {
            console.error("Signup error:", error.message);
            
        }
    };
    

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="">
                {signupFields.map(field =>
                    <Input
                        key={field.id}
                        handleChange={handleChange}
                        value={signupState[field.id]}
                        labelText={field.labelText}
                        labelFor={field.labelFor}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        isRequired={field.isRequired}
                        placeholder={field.placeholder}
                    />
                )}
               
                <FormAction handleSubmit={handleSubmit} text="Signup" />
            </div>
        </form>
    );
};

export default Signup;
