import { useFormik } from "formik";
import { FunctionComponent, useEffect } from "react";
import * as yup from "yup"
import { addProduct } from "../services/productService";
import { successMsg } from "../services/feedbackService";
import { useNavigate } from "react-router-dom";
import { open } from "fs";

interface AddProductProps {
    productsChanged: boolean;
    setProductsChanged: Function;
}

const AddProduct: FunctionComponent<AddProductProps> = ({ productsChanged, setProductsChanged }) => {
    let navigate = useNavigate()
    let formik = useFormik({
        initialValues: { name: "", price: 0, category: "", description: "", image: "" },
        validationSchema: yup.object({
            name: yup.string().required().min(2),
            price: yup.number().required(),
            category: yup.string().required().min(2),
            description: yup.string().required().min(2),
            image: yup.string().required().min(2)

        }),
        onSubmit: (values, { resetForm }) => {
            addProduct(values)
                .then((res) => {
                    setProductsChanged(!productsChanged)
                    resetForm();
                    formik.setFieldValue("price", "");
                    successMsg("product wes added!")
                    navigate("/products")
                })
                .catch((err) => console.log(err)
                )
        }
    });
    useEffect(() => {
        formik.setFieldValue("price", "")
    }, []);
    return (
        <>
            <h1 className="display-2">ADD NEW PRODUCT</h1>
            <div className="container col-md-4">
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-floating mb-3">
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
                    <div className="form-floating mb-3">
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
                    <div className="form-floating mb-3">
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
                    <div className="form-floating mb-3">
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
                    <div className="form-floating mb-3">
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
                    <button className="btn btn-primary w-100" disabled={!formik.isValid || !formik.dirty} type="submit" >+ ADD</button>
                </form>
            </div>

        </>
    )
}

export default AddProduct;