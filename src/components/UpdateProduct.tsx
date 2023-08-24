import { useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Product from "../interfaces/Product";
import * as yup from "yup"
import { getProductById, updateProduct, } from "../services/productService";
import { successMsg } from "../services/feedbackService";

interface UpdateProductProps {

}

const UpdateProduct: FunctionComponent<UpdateProductProps> = () => {
    let { id } = useParams()
    let navigate = useNavigate()
    useEffect(() => {
        getProductById(id as string)
            .then((res) => setProduct(res.data))
            .catch((err) => console.log(err))
    }, []);
    let [product, setProduct] = useState<Product>({
        name: "", price: 0, category: "", description: "", image: ""
    });
    let formik = useFormik({
        initialValues: {
            name: product.name,
            price: product.price,
            category: product.category,
            description: product.description,
            image: product.image,
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            name: yup.string().required().min(2),
            price: yup.number().required().min(0),
            category: yup.string().required().min(2),
            description: yup.string().required().min(2),
            image: yup.string().required().min(2),
        }),
        onSubmit: (values) => {
            updateProduct(values, id as string)
                .then((res) => {
                    navigate("/products");
                    successMsg("Product updated successfully!");
                })
                .catch((err) => console.log(err));
        },
    });
    return (
        <>
            <h1 className="display-2">Update PRODUCT</h1>
            <div className="container col-md-4">
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-floating mb-3 shadow">
                        <input type="text"
                            className="form-control"
                            id="floatingInputDisabled"
                            placeholder="name"
                            name="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingInputDisabled">Name</label>
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-danger">{formik.errors.name}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 shadow">
                        <input type="number" className="form-control" id="floatingInputDisabled" placeholder="0"
                            name="price"
                            onChange={formik.handleChange}
                            value={formik.values.price}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingInputDisabled">Price</label>
                        {formik.touched.price && formik.errors.price && (
                            <p className="text-danger">{formik.errors.price}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 shadow">
                        <input type="text" className="form-control" id="floatingInputDisabled" placeholder="Category"
                            name="category"
                            onChange={formik.handleChange}
                            value={formik.values.category}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingInputDisabled">Category</label>
                        {formik.touched.category && formik.errors.category && (
                            <p className="text-danger">{formik.errors.category}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 shadow">
                        <input type="text" className="form-control" id="floatingInputDisabled" placeholder="description"
                            name="description"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingInputDisabled">Description</label>
                        {formik.touched.description && formik.errors.description && (
                            <p className="text-danger">{formik.errors.description}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 shadow">
                        <input type="text" className="form-control" id="floatingInputDisabled" placeholder="image"
                            name="image"
                            onChange={formik.handleChange}
                            value={formik.values.image}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="floatingInputDisabled">Image</label>
                        {formik.touched.image && formik.errors.image && (
                            <p className="text-danger">{formik.errors.image}</p>)}
                    </div>
                    <button className="btn btn-primary w-100" disabled={!formik.isValid || !formik.dirty} type="submit" >Update</button>
                </form>
            </div>

        </>
    )
}

export default UpdateProduct;