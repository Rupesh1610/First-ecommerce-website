import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import './home.css'
import { useDispatch, useSelector } from 'react-redux'
import { categories } from '../../categories';
import ProductCard from '../../molecules/productCard/ProductCard';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [products, setProduct] = useState([])
    const [loading, setLoading] = useState(false)

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

    return (
        <div>
            <h3 className='text-center'>CATEGORIES</h3>
            <center>
                <hr />
            </center>
            <div className='row mycategories'>
                {categories.map(item => {
                    return (
                        <div className='col mycategory m-4' key={item.id} onClick={() => { navigate(`/productlist/${item.category}`) }}>
                            <center>
                                <Avatar src={item.src} alt={item.title} sx={{ height: '10rem', width: '10rem' }} />
                            </center>
                            <h5 className='text-center'>{item.category}</h5>
                        </div>
                    )
                })}
            </div>

            <h3 className='text-center m-3'>OUR PRODUCTS</h3>
            <center>
                <hr />
            </center>

            <div className='row products'>
                {loading ?
                    (<div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>)
                    :
                    products.map(item => {
                        return (
                            <ProductCard key={item._id} image={item.image} title={item.title} price={item.price} id={item._id} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home