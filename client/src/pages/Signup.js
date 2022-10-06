import React from 'react';
import { Button } from '@mui/material'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../molecules/InputField';
import { Link } from 'react-router-dom';

const SignupSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Name must be greater than 3 characters').max(40, 'Name must be less than 40 characters').required('This field is Required'),
    email: Yup.string().email('Please enter a valid email').required('This field is Required'),
    pass: Yup.string().min(6, 'Password must be greater than 6 characters').max(10, 'Password must be less than 10 characters').required('This field is Required'),
});

const Signup = () => {
    let fullname, email, password;
    return (
        <div className='container' style={{ width: '30rem' }}>
            <div style={{ margin: "4rem auto 0", display: 'flex', justifyContent: 'center' }}>
                <AssignmentIndIcon color='secondary' fontSize='large' />
            </div>
            <h1 className='text-center mb-4' style={{ fontFamily: 'montserrat' }}>SignUp</h1>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    pass: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    console.log(values);
                    fetch('/api/signup', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            fullname: values.name,
                            email: values.email,
                            password: values.pass
                        })
                    }).then(res => res.json())
                        .then(result => console.log(result))
                        .catch(err => console.log(err))
                }}
            >
                <Form>
                    <div className='mb-3'>
                        <InputField name='name' label='Name' type='text' />
                    </div>
                    <div className='mb-3'>
                        <InputField name='email' label='Email' type='email' />
                    </div>
                    <div className='mb-3'>
                        <InputField name='pass' label='Password' type='password' />
                    </div>
                    <div className='text-center mt-3'>
                        <Button variant='contained' type='submit' fullWidth>signup</Button>
                    </div>
                    <div className='text-center mt-3'>
                        <Link to='/signin'>Already have an account? Sign In</Link>
                    </div>

                </Form>
            </Formik>
        </div>
    )
}

export default Signup;