import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../../store/employees/employeesSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import states from '../../data/states';
import CustomModal from 'custom-modal-pastor';


function CreateEmployee() {
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: new Date(),
        startDate: new Date(),
        department: 'Sales', 
        street: '',
        city: '',
        state: 'Alabama', 
        zipCode: '',
    });

    const [isModalVisible, setIsModalVisible] = useState(false); 
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value,
        });
    };

    const handleDateChange = (date, name) => {
        setEmployee({
            ...employee,
            [name]: date,
        });
    };

    const handleSubmit = () => {
        dispatch(addEmployee(employee));
        console.log(employee);
        setIsModalVisible(true); 
    };

    const handleModalClose = () => {
        setIsModalVisible(false); 
    };

    return (
        <div className="create">
            <h2>Create Employee</h2>
            <form className='create__form'>
                <label>First Name</label>
                <input name="firstName" value={employee.firstName} onChange={handleChange} />

                <label>Last Name</label>
                <input name="lastName" value={employee.lastName} onChange={handleChange} />

                <label>Date of Birth</label>
                <DatePicker selected={employee.dateOfBirth} onChange={(date) => handleDateChange(date, 'dateOfBirth')} />

                <label>Start Date</label>
                <DatePicker selected={employee.startDate} onChange={(date) => handleDateChange(date, 'startDate')} />

                <fieldset className='create__form__fieldset'>
                    <legend>Address</legend>

                    <label>Street</label>
                    <input name="street" value={employee.street} onChange={handleChange} />

                    <label>City</label>
                    <input name="city" value={employee.city} onChange={handleChange} />

                    <label>State</label>
                    <select name="state" value={employee.state} onChange={handleChange}>
                        {states.map((state) => (
                            <option key={state.abbreviation} value={state.abbreviation}>
                                {state.name}
                            </option>
                        ))}
                    </select>

                    <label>Zip Code</label>
                    <input name="zipCode" type="number" value={employee.zipCode} onChange={handleChange} />
                </fieldset>

                <label>Department</label>
                <select name="department" value={employee.department} onChange={handleChange}>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Legal">Legal</option>
                </select>

                <button type="button" onClick={handleSubmit}>
                    Save
                </button>
            </form>

            <CustomModal
                message="Employee created successfully!"
                isVisible={isModalVisible}
                onClose={handleModalClose}  
            />
        </div>
    );
}

export default CreateEmployee;
