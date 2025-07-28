import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import '../style/Home.css';

interface Product {
  _id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  image: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/devices');
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to load products:', err);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product: Product) => {
  try {
    console.log('Placing order for:', product);

    const response = await axios.post(
      '/orders/',
      {
        quoteId: product.quoteId,
        pickupId: product.pickupId,
        paymentMethod: 'COD' // or 'Online' based on your logic
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // if JWT is used
        }
      }
    );

    if (response.status === 201) {
      alert('Order placed successfully!');
      console.log(response.data.order);
    } else {
      alert('Failed to place order.');
    }
  } catch (error: any) {
    console.error('Error placing order:', error);
    alert(error.response?.data?.error || 'Something went wrong');
  }
};

const handleBuyNow = (product: Product) => {
  console.log('Buy now:', product);
  handleAddToCart(product);
};

  return (
    <div className="container-fluid homepage-container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 text-neon">Welcome to Casheze</h1>
        <p className="lead text-black">Find your next tech gadget here</p>
      </div>
      <div className="row justify-content-center g-4">
        <h2 className="text-black mb-2 text-center">Available Products</h2>
        {products.map((product) => (
          <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card product-card h-100 text-white">
              <img src={product.image} className="card-img-top product-img" alt={product.name} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-black">{product.brand} - {product.model}</p>
                <p className="card-text fw-bold text-black">₹{product.price}</p>
                <div className="mt-auto">
                  <button className="btn btn-outline-light w-100 mb-2 text-black" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                  <button className="btn btn-neon w-100 text-black" onClick={() => handleBuyNow(product)}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
