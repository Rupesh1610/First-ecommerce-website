import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import './product.css'

const ProductCard = (props) => {
    const navigate = useNavigate()
    return (
        <div className='col-sm-12 col-md-4 product-card' key={props.id} style={{ cursor: 'pointer' }} onClick={() => {
            navigate(`/product/${props.id}`)
        }}>
            <center className='m-2'>
                <img src={props.image} alt={props.title} />
            </center>
            <h5>{props.title}</h5>
            <p>Price ${props.price}</p>
            <div className='m-3'><LocalShippingIcon color='success' /> Free delivery</div>
        </div>
    )
}

export default ProductCard