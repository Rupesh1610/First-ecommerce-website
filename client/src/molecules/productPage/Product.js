import React, { useEffect, useState } from 'react'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useNavigate, useParams } from 'react-router-dom'
import './productPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../../redux/slices/cartSlice';

const Product = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [products, setProduct] = useState([])
    const [loading, setLoading] = useState([])
    const [Quantity, setQuantity] = useState(1)
    const [size, setSize] = useState("")
    const user = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        const getproducts = async () => {
            setLoading(true)
            const data = await fetch('/api/products')
            const result = await data.json()
            setProduct(result)
            setLoading(false)
        }
        getproducts()
    }, [])
    const oneProduct = products.find(item => item._id === params.id)

    const handleAdd = async (id) => {
        const res = await fetch('/api/addcart', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                userId: user._id,
                product: [{ productId: oneProduct._id, quantity: Quantity, size, price: oneProduct.price * Quantity }]
            })
        })

        const result = await res.json()

        dispatch(addCart({ ...oneProduct, size, Quantity }))
    }

    return (
        <div style={{ width: '80%', margin: '5rem auto 0' }}>
            {loading ?
                (<div className="d-flex justify-content-center" style={{ marginTop: '15rem' }}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>)
                :
                (<div className='row product_container'>
                    <div className='col-md-6 img_container'>
                        <center>
                            <img src={oneProduct.image} alt={oneProduct.title} />
                        </center>
                    </div>
                    <div className='col-md-6 product_info'>
                        <h5>{oneProduct.title}</h5>
                        <p>{oneProduct.description}</p>
                        <h3 style={{ color: 'green', marginLeft: '1rem' }}>$ {oneProduct.price}</h3>
                        <p style={{ marginLeft: '1rem', color: 'green' }}><LocalShippingIcon color='primary' /> Free Delivery</p>
                        {(oneProduct.category === "men's clothing" || oneProduct.category === "women's clothing")
                            ?
                            (<select onChange={e => setSize(e.target.value)}>
                                <option defaultValue='Size'>Size</option>
                                <option value='S'>S</option>
                                <option value='M'>M</option>
                                <option value='L'>L</option>
                            </select>)
                            :
                            null
                        }
                        <div className='product_counter'>
                            <h6 className='dec' onClick={() => Quantity > 1 ? setQuantity(Quantity - 1) : null}>-</h6>
                            <h6>{Quantity}</h6>
                            <h6 className='inc' onClick={() => setQuantity(Quantity + 1)}>+</h6>
                        </div>
                        <div className='text-center'>
                            <button className='add_to_cart' onClick={() => handleAdd(oneProduct._id)}>ADD TO CART</button>
                            <button className='purchase_now' onClick={() => {
                                if (user) {
                                    navigate(`/checkout/single/${oneProduct._id}`)
                                } else {
                                    alert('Login to checkout')
                                }
                            }}><ShoppingBagOutlinedIcon />  BUY NOW</button>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Product