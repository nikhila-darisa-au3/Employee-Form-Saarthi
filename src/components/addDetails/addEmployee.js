import React from 'react'
import './addEmployee.css'
import Modal from './modal'
// import './form.css'
class AddEmployee extends React.Component {
    constructor() {
        super()
        this.state = {
            text: '+',
            className: "addDetails",
            show: false,
            visibility: "visible",
            name: '',
            employeeId: '',
            email: '',
            department: '',
            date: '',
            formValidation: {
                nameIsValid: true,
                employeeIdIsValid: true,
                emailIsValid: true,
                departmentIsValid: true,
                dateIsValid: true,
                isFormValid: true
            },
            employeeDetails: []
        }
    }
    changeText = () => {
        this.setState({
            className: "changeText",
            text: 'Add Employee'
        })
    }
    resetText = () => {
        this.setState({
            className: "addDetails",
            text: '+'
        })
    }
    showModal = () => {
        this.setState({
            visibility: "hidden",
            show: true
        })
    }
    hideModal = () => {
        this.setState({ visibility: "visible", show: false });
    };
    getInput = (e) => {
        let name = e.target.name
        let value = e.target.value
        this.setState({
            [name]: value
        })
    }
    formValidate = () => {
        let validation = {
            nameIsValid: true,
            employeeIdIsValid: true,
            emailIsValid: true,
            departmentIsValid: true,
            dateIsValid: true,
            isFormValid: true
        }
        if (this.state.name === '') {
            validation.isFormValid = false
            validation.nameIsValid = false
        }
        if (this.state.employeeId === '') {
            validation.employeeIdIsValid = false
            validation.isFormValid = false
        }
        if (this.state.email === '') {
            validation.emailIsValid = false
            validation.isFormValid = false
        }
        if (this.state.department === '') {
            validation.departmentIsValid = false
            validation.isFormValid = false
        }
        if (this.state.date === '') {
            validation.dateIsValid = false
            validation.isFormValid = false
        }
        this.setState({
            formValidation: validation
        })
        return validation.isFormValid
    }
    formSubmit = (e) => {
        e.preventDefault()
        if (this.formValidate()) {
            alert("success")
            this.hideModal()
            e.target.reset()
            let details = {
                name: this.state.name, employeeId: this.state.employeeId, department: this.state.department,
                email: this.state.email, date: this.state.date
            }
            this.state.employeeDetails.push(details)
            const data = ()=>{
                this.setState({
                    name: '',
                    employeeId: '',
                    email: '',
                    department: '',
                    date: '',
                    formValidation: {
                        nameIsValid: true,
                        employeeIdIsValid: true,
                        emailIsValid: true,
                        departmentIsValid: true,
                        dateIsValid: true,
                        isFormValid: true
                    }
                })
            }
            setTimeout(data(),0)
        }
    }
    deleteItem(data) {
        console.log(data)
        let newData = this.state.employeeDetails.filter((item) => item.employeeId !== data)
        this.setState({
            employeeDetails: newData
        })
    }
    render() {
        return (
            <div>
                {/* DisplayDetail Component */}
                {this.state.employeeDetails ? (<div className="tableDiv">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Employee Id</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Date of Joining</th>
                                <th></th>
                            </tr>
                        </thead>
                        {this.state.employeeDetails.map((data, index) => {
                            return <tbody key={index}>
                                <tr>
                                    <td>ss{data.name}</td>
                                    <td>{data.employeeId}</td>
                                    <td>{data.department}</td>
                                    <td>{data.email}</td>
                                    <td>{data.date}</td>
                                    <td>
                                        <button className="deleteData" onClick={() => this.deleteItem(data.employeeId)}>Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        })}

                    </table>
                </div>) : null}
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <div className="header-data">
                        <button onClick={this.hideModal} className="closeButton">X</button>
                    </div>
                    {/* Employee form */}
                    <form className="form" onSubmit={this.formSubmit}>
                        {this.state.formValidation.nameIsValid === false ? <div className="error">Name should not be empty</div> : null}
                        <input autoComplete="off"  onChange={this.getInput} name="name" type="text" placeholder="Enter Name" className="input" /> <br />
                        {this.state.formValidation.employeeIdIsValid === false ? <div className="error">EmployeeId should not be empty</div> : null}
                        <input autoComplete="off" onChange={this.getInput} name="employeeId" type="text" placeholder="Enter EmployeeId" className="input" /> <br />
                        {this.state.formValidation.emailIsValid === false ? <div className="error">Email should not be empty</div> : null}
                        <input autoComplete="off" onChange={this.getInput} name="email" type="email" placeholder="Enter Email" className="input" /> <br />
                        {this.state.formValidation.departmentIsValid === false ? <div className="error">Department should not be empty</div> : null}
                        <select onChange={this.getInput} className="input" name="department">
                            <option>Department</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Finance">Finance</option>
                            <option value="IT">IT</option>
                            <option value="Human Resource">Human Resource</option>
                            <option value="Operations management">Operations management</option>
                        </select>
                        <br />
                        <label htmlFor="data">Date of Joining:</label><br />
                        {this.state.formValidation.dateIsValid === false ? <div className="error">Date should not be empty</div> : null}
                        <input autoComplete="off" onChange={this.getInput} name="date" type="date" className="input" />
                        <br />
                        <br />
                        <div>
                            <input type="submit" className="submitButton" />
                            <input type="reset" value="Clear" className="submitButton" />
                        </div>
                    </form>
                    <div className="header-data">
                    </div>
                </Modal>
                <button onClick={this.showModal} style={{ visibility: this.state.visibility }} onMouseOver={this.changeText} onMouseOut={this.resetText} className={`textColor ${this.state.className}`}>{this.state.text}</button>
            </div>
        )
    }
}
export default AddEmployee