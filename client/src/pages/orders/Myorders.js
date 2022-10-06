import React from 'react'

const Myorders = () => {
    const myorders = JSON.parse(localStorage.getItem('myorders'))

    return (
        <div>
            <h3 className='text-center mt-5 mb-5'>Your Orders</h3>
            <div className='container'>
                {myorders.map((item, index) => {
                    return (
                        <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid gray', borderRadius: '4px', marginBottom: '0.5rem' }}>
                            <img style={{ width: '100px', height: '100px', margin: '0.5rem' }} src={item.products[0].image} alt={item.products[0].title} />
                            <div style={{ display: 'flex', alignItems: 'center', margin: '1rem', flexDirection: 'column' }}>
                                <p>status</p>
                                <h5>{item.status}</h5>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Myorders