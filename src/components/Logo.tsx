import { FunctionComponent } from "react";

interface LogoProps {
    
}
 
const Logo: FunctionComponent<LogoProps> = () => {
    return (<>
    <h5 className="display-5 text-light mt-3 ms-3 mb-5 ">
        <i className="fa-solid fa-address-card"></i> CRM</h5>
    
    </>);
}
 
export default Logo;