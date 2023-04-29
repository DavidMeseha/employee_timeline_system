import { useContext } from "react";
import EmployeesContext from "@/context/EmployeesProvider";

const useEmployeesData = () => {
    return (useContext(EmployeesContext))
};
export default useEmployeesData;