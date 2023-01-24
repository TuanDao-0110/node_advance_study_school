 const setParameterNewEmployee = (newEmployee) => {
    return [
        newEmployee.id,
        newEmployee.firstname,
        newEmployee.lastname,
        newEmployee.department,
        newEmployee.salary
    ];
}

 const setParameterEditEmployee = (employee) => {
    return [
        employee.firstname,
        employee.lastname,
        employee.department,
        employee.salary,
        employee.id,
    ]
}


module.exports= {setParameterEditEmployee,setParameterNewEmployee}