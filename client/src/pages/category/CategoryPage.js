import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../../molecules/productCard/ProductCard';

const CategoryPage = () => {
    const params = useParams()
    const [products, setProduct] = useState([])
    const [loading, setLoading] = useState([])
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
    const categoryProduct = products.filter(items => items.category === params.category)
    return (
        <div style={{ width: '90%', margin: '2rem auto' }}>
            <h3 className='mb-4 mt-5'>{params.category}</h3>
            <hr />
            {loading ?
                (<div className="d-flex justify-content-center" style={{ marginTop: '15rem' }}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>)
                :
                (<div className='row' >
                    {categoryProduct.map(item => {
                        return (
                            <ProductCard key={item._id} image={item.image} title={item.title} price={item.price} id={item._id} />
                        )
                    })}
                </div>)
            }

        </div>
    )
}

export default CategoryPage