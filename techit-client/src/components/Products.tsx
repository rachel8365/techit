import { FunctionComponent, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import { deleteProduct, getProductById, getProducts } from "../services/productService";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { successMsg } from "../services/feedbackService";
import { addToCart } from "../services/cartService";

interface ProductsProps {
    userInfo: any;
}

const Products: FunctionComponent<ProductsProps> = ({ userInfo }) => {

    let [products, setProducts] = useState<Product[]>([])
    let [productsChanged, setProductsChanged] = useState<boolean>(false)

    useEffect(() => {
        getProducts()
            .then((res) => setProducts(res.data))
            .catch((res) => console.log(res)
            )
    }, [productsChanged]);

    let render = () => {
        setProductsChanged(!productsChanged);
    };
    let handleDelete = (id: string) => {
        if (window.confirm("Are you sure?")) {
            deleteProduct(id)
                .then((res) => {
                    successMsg("Product deleted successfuly")
                    render();
                }
                )
                .catch((err) => console.log(err)
                );
        }
    }

    let handleAddToCart = (product: Product) => {
        addToCart(product)
            .then((res) => successMsg("Product added to cart!"))
            .catch((err) => console.log(err));
    };

    return (
        <>

            <h1 className="display-2">PRODUCTS</h1>
            {userInfo.isAdmin &&

                <Link to={"/addProduct"} className="btn btn-success"><i className="fa-solid fa-plus"></i>Add Product</Link>
            }
            {products.length ? (
                <div className="container">
                    <div className="row">
                        {products.map((product: Product) => (
                            <div
                                key={product._id}
                                className="card col-md-4 mx-2 mt-3"
                                style={{ width: "18rem" }}
                            >
                                <img
                                    src={product.image}
                                    className="card-img-top" style={{ width: "16.5rem", height: "16.5rem" }}
                                    alt={product.name}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h6 className="card-subtitle mb-2 text-muted">
                                        {product.category}
                                    </h6>
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text text-success mb-3">{product.price} ₪</p>
                                    <div className="mt-auto">
                                        <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>
                                            <i className="fa-solid fa-cart-shopping"></i>
                                            Add
                                        </button>
                                        {userInfo.isAdmin && (
                                            <>
                                                <Link to={`update/${product._id}`} className="btn btn-warning mx-2"><i className="fa-solid fa-pen-to-square"></i></Link>
                                                <Link to="" className="btn btn-danger" onClick={() => handleDelete(product._id as string)}><i className="fa-solid fa-trash"></i>
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>No products</p>
            )}

        </>
    )
}

export default Products;



