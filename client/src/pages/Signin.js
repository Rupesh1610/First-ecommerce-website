import React from 'react';
import { Button } from '@mui/material'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../molecules/InputField';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const SigninSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email').required('This field is Required'),
    pass: Yup.string().min(6, 'Password must be greater than 6 characters').max(10, 'Password must be less than 10 characters').required('This field is Required'),
});

const Signin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <div className='container' style={{ width: '30rem' }}>
            <div style={{ margin: "4rem auto 0", display: 'flex', justifyContent: 'center' }}>
                <AssignmentIndIcon color='secondary' fontSize='large' />
            </div>
            <h1 className='text-center mb-4' style={{ fontFamily: 'montserrat' }}>SignIn</h1>
            <Formik
                initialValues={{
                    email: '',
                    pass: ''
                }}
                validationSchema={SigninSchema}
                onSubmit={values => {
                    fetch('/api/signin', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: values.email,
                            password: values.pass
                        })
                    }).then(res => res.json())
                        .then(result => {
                            if (result.error) {
                                alert(result.error)
                            } else {
                                localStorage.setItem('jwt', result.token);
                                localStorage.setItem('user', JSON.stringify(result.user))
                                navigate('/')
                            }
                        })
                        .catch(err => console.log(err))
                }}
            >
                <Form>
                    <div className='mb-3'>
                        <InputField name='email' label='Email' type='email' />
                    </div>
                    <div className='mb-3'>
                        <InputField name='pass' label='Password' type='password' />
                    </div>
                    <div className='text-center'>
                        <Button variant='contained' type='submit' fullWidth>signin</Button>
                    </div>
                    <div className='text-center mt-3'>
                        <Link to='/signup'>Don't have an account? Sign Up</Link>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default Signin;