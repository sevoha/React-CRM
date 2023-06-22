import { useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup"
import { getCustomerById, updateCustomer } from "../sevices/customersService";
import Customer from "../interfaces/customer";
interface UpdateCustomerProps {
    
}
 
const UpdateCustomer: FunctionComponent<UpdateCustomerProps> = () => {
    let navigate = useNavigate();
    let {id} = useParams()
    let [customer, setCustomer] = useState<Customer>(
        {firstName: "",
        lastName: "", 
        phone:"", 
        email: ""
    })
    useEffect(() => {
    getCustomerById(Number(id))
        .then((res) => setCustomer(res.data))
        .catch((error) => console.log(error));
    }, []);
    let formik = useFormik({
        initialValues: {
            firstName:customer.firstName, 
            lastName:customer.lastName,
            phone:customer.phone,
            email:customer.email},
        enableReinitialize: true,
        validationSchema: yup.object({
            firstName: yup.string().required().min(2),
            lastName: yup.string().required().min(2),
            phone: yup.string().required().min(9).max(10),
            email: yup.string().required().email("Invalid email")
        }),
        onSubmit: (values)=> {
            updateCustomer(customer.id as number,values)
            .then(()=> navigate("/"))
            .catch((err) => console.log(err));
        }
    })
    return (<>
    <div className="container col-md-5">
    <form onSubmit={formik.handleSubmit} className="text-center">
        <h3 className="display-3 text-light mb-3"> Update Customer</h3>
    <div className="form-floating">
        <input 
            type="text" 
            className="form-control mb-3" 
            id="floatingfirstName" 
            placeholder="First Name" 
            name= "firstName"
            onChange={formik.handleChange}
            value= {formik.values.firstName}
            onBlur={formik.handleBlur}
        />
        <label htmlFor="floatingfirstName">First Name</label>
        {formik.touched.firstName && formik.errors.firstName && (
        <p className="text-danger">{formik.errors.firstName}</p>
        )};
    </div>
    <div className="form-floating">
        <input 
            type="text" 
            className="form-control mb-3" 
            id="floatinglastName" 
            placeholder="Last Name" 
            name= "lastName"
            onChange={formik.handleChange}
            value= {formik.values.lastName}
            onBlur={formik.handleBlur}
        />
        <label htmlFor="floatinglastName">Last Name</label>
        {formik.touched.lastName && formik.errors.lastName && (
        <p className="text-danger">{formik.errors.lastName}</p>
        )};
    </div>
    <div className="form-floating">
        <input 
            type="text" 
            className="form-control mb-3" 
            id="floatingphone" 
            placeholder="Phone" 
            name= "phone"
            onChange={formik.handleChange}
            value= {formik.values.phone}
            onBlur={formik.handleBlur}
        />
        <label htmlFor="floatingphone">Phone</label>
        {formik.touched.phone && formik.errors.phone && (
        <small className="text-danger">{formik.errors.phone}</small>
        )};
    </div>
    

    <div className="form-floating mb-3">
        <input 
            type="email" 
            className="form-control" 
            id="floatingInput" 
            placeholder="name@example.com" 
            name="email"
            onChange={formik.handleChange}
            // value = {email} mosheh from default value to HTML
            value = {formik.values.email}
            onBlur={formik.handleBlur}
        />
        <label htmlFor="floatingInput">Email address</label>
        {formik.touched.email && formik.errors.email && (
        <p className="text-danger">{formik.errors.email}</p>
        )};
    </div>
    <div className="d-grid gap-2 col-6 mx-auto">
        <button type="submit" className="btn btn-warning mt-3" disabled={!formik.isValid || !formik.dirty}>
            <i className="fa-solid fa-user-pen"></i> Update</button>
        <button className="btn btn-secondary mt-3" onClick={()=> navigate(-1)}>
            <i className="fa-solid fa-chevron-left"></i>GoBack</button>
    </div>
    </form>
    </div>
    </>);
}
 
export default UpdateCustomer;