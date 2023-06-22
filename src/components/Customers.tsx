import { FunctionComponent, useEffect, useState } from "react";
import Customer from "../interfaces/customer";
import { deleteCustomer, getCustomers } from "../sevices/customersService";
import { useNavigate } from "react-router-dom";

interface CustomersProps {
    
}
 
const Customers: FunctionComponent<CustomersProps> = () => {
    let [customers, setCustomers] = useState<Customer[]>([])
    let [dataChanged, setDataChanged] = useState<boolean>(false);
    let navigate = useNavigate();
    
    useEffect(() => {
        getCustomers()
        .then((res) => setCustomers(res.data))
        .catch((err) => console.log(err));
    }, [dataChanged]);
    let handleDelete = (id: number) => {
    if (window.confirm("Are you sure?")) {
        deleteCustomer(id)
            .then(() => {console.log("Customer deleted succuessfully")
            setDataChanged(!dataChanged)
            })
            .catch((error) => console.log(error));
        }};
    return (<>
    <div className="container">
        <button className="btn btn-success" 
                onClick={()=> navigate("/add-customer")}>
            <i className="fa-solid fa-user-plus"></i> Customer
        </button>
    {customers.length ? (<table className="table table-dark mt-4">
            <thead><tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th></th>
                <th></th>
            </tr></thead>
        <tbody>
            {customers.map((customer: Customer) => (
            <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.phone}</td>
                <td>{customer.email}</td>
                <td><i className="fa-solid fa-user-pen text-warning"
                    onClick={()=>navigate(`/update-customer/${customer.id}`)}></i></td>
                <td><i className="fa-solid fa-user-xmark text-danger" 
                    onClick={() => handleDelete(customer.id as number)}></i></td>
            </tr>
            ))}
        </tbody>
        </table>) : (<p className="text-light">No customers yet</p>)}
    </div>
    </>);
}
 
export default Customers;