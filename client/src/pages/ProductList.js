import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Checkbox, Radio } from "antd";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import '../styles/siteCss/css/style.css';
import '../styles/siteCss/css/custom.css';
import '../styles/siteCss/css/responsive.css';
import { Link } from 'react-router-dom';
import '../styles/siteCss/css/font-icons.css';
import { Prices } from "../components/Prices";
const ProductList = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  // Fetch posts
  const getAllPosts = async () => {
    try {
      const response = await axios.get("/api/v1/post/get-posts");
      setPosts(response.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to fetch posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch total product count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllPosts();
    getTotal();
    getAllProducts();
  }, []);

  // Load more products when page number changes
  useEffect(() => {
    if (page > 1) {
      loadMore();
    }
  }, [page]);

  // Load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  

  // Filter products based on selected filters
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Add product to cart
  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item._id === product._id);
    if (!existingItem) {
      const updatedProduct = { ...product, quantity: 1 };
      setCart([...cart, updatedProduct]);
      localStorage.setItem('cart', JSON.stringify([...cart, updatedProduct]));
      toast.success('Item added to cart');
    } else {
      const updatedCart = cart.map((item) =>
        item._id === existingItem._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast.success('Quantity updated in cart');
    }
  };

  return (
    <Layout title={"All Products - Best offers"} className="home-page">
        <div className="<div>
  page-header1
</div>
 py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="ltn__breadcrumb-inner">
                <h1 class="text-black">Shop</h1>
                <div className="ltn__breadcrumb-list">
                  <ul>
                    <li>
                      <Link to="/" class="text-black">
                        <span class="text-black"><i className="fas fa-home"></i></span> Home
                      </Link>
                    </li>
                    <li class="text-black">Shop</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ltn__product-area ltn__product-gutter mb-120">
        <div className="container">
          <div className="row">
            {/* Left side for product display */}
            <div className="col-lg-8">
              <div className="ltn__shop-options">
                <ul>
                  <li>
                    <div className="ltn__grid-list-tab-menu">
                      <div className="nav">
                        <a className="active show" data-bs-toggle="tab" href="#liton_product_grid">
                          <i className="fas fa-th-large"></i>
                        </a>
                        <a data-bs-toggle="tab" href="#liton_product_list">
                          <i className="fas fa-list"></i>
                        </a>
                      </div>
                    </div>
                  </li>
           
                </ul>
              </div>
              {/* Product tab content */}
              <div className="tab-content">
                {/* Grid view */}
                <div className="tab-pane fade active show" id="liton_product_grid">
                  <div className="ltn__product-tab-content-inner ltn__product-grid-view">
                    <div className="row">
                      {/* Sample product item */}
                      <div className="d-flex flex-wrap">
  {products?.map((p) => (
    <div className="col-lg-3--- col-md-4 col-sm-6 col-6" key={p._id}>
      <div className="ltn__product-item ltn__product-item-2 text-left">
        <div className="product-img">
          <a href={`/product/${p.slug}`}>
            <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
          </a>
          <div className="product-badge">
            <ul>
              <li className="sale-badge">New</li>
            </ul>
          </div>
          <div className="product-hover-action">
            <ul>
              <li>
                <a href="#" title="Quick View" data-bs-toggle="modal" data-bs-target="#quick_view_modal">
                  <i className="far fa-eye" />
                </a>
              </li>
              <li>
                <a href="#" title="Add to Cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">
                  <i className="fas fa-shopping-cart" />
                </a>
              </li>
              <li>
                <a href="#" title="Wishlist" data-bs-toggle="modal" data-bs-target="#liton_wishlist_modal">
                  <i className="far fa-heart" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="product-info">
 
          <h2 className="product-title"><a href={`/product/${p.slug}`}>{p.name}</a></h2>
          <div className="product-price">
            <span>{p.price.toLocaleString("en-US", { style: "currency", currency: "LKR" })}</span>
                  
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
                      {/* Repeat for other products */}
                    </div>
                  </div>
                </div>
                {/* List view */}
                <div className="tab-pane fade" id="liton_product_list">
                  <div className="ltn__product-tab-content-inner ltn__product-list-view">
                    <div className="row">
                      {/* List product item */}
                      {products?.map((p) => (
    <div className="col-lg-12" key={p._id}>
        <div className="ltn__product-item ltn__product-item-3">
            <div className="product-img">
                <a href={`/product-details/${p._id}`}>
                    <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                </a>
                <div className="product-badge">
                    <ul>
                        <li className="sale-badge">New</li>
                    </ul>
                </div>
            </div>
            <div className="product-info">
                <h2 className="product-title">
                    <a href={`/product-details/${p._id}`}>{p.name}</a>
                </h2>
         
                <div className="product-price">
                    <span>{p.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
                    <del>${(p.oldPrice || p.price * 10).toFixed(2)}</del>
                </div>
                <div className="product-brief">
                    <p>{p.description || "No description available."}</p>
                </div>
                <div className="product-hover-action">
                    <ul>
                        <li>
                            <a href="#" title="Quick View" data-bs-toggle="modal" data-bs-target="#quick_view_modal">
                                <i className="far fa-eye"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" title="Add to Cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">
                                <i className="fas fa-shopping-cart"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" title="Wishlist" data-bs-toggle="modal" data-bs-target="#liton_wishlist_modal">
                                <i className="far fa-heart"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
))}

                      {/* Repeat for other products */}
                    </div>
                  </div>
                </div>
              </div>
              {/* Pagination */}
        
            </div>
            
            {/* Sidebar section */}
            <div className="col-lg-4">
              <aside className="sidebar ltn__shop-sidebar ltn__right-sidebar">
                {/* Category Widget */}
                <div className="widget ltn__menu-widget">
                  <h4 className="ltn__widget-title ltn__widget-title-border">Product categories</h4>
                  <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <div className="col-md-3 filters">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
<div className="d-flex flex-column">
  <Radio.Group onChange={(e) => setRadio(e.target.value)}>
    {Prices?.map((p) => (
      <div key={p._id}>
        <Radio value={p.array}>{p.name}</Radio>
      </div>
    ))}
  </Radio.Group>
</div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
                </div>
                
              
                 
      
                {/* Banner Widget */}
                <div className="widget ltn__banner-widget">
                  <a href="/shop"><img src="img/banner/banner-2.jpg" alt="Banner" /></a>
                </div>
              </aside>
            </div>
          </div>
        </div>
      

      </div>
    </Layout>
  );
};

export default ProductList;
