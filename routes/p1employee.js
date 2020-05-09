const P1EmployeeController = new (require('../controllers/P1EmployeeController'))();
const p1employeeRouter = require('koa-router')({
    prefix: '/p1employee'
});

p1employeeRouter.get('/', P1EmployeeController.p1employees);
p1employeeRouter.get('/:p1employee', P1EmployeeController.p1employee);
p1employeeRouter.post('/', P1EmployeeController.addP1Employee, P1EmployeeController.p1employee);
p1employeeRouter.put('/:p1employee', P1EmployeeController.updateP1Employee, P1EmployeeController.p1employee);
p1employeeRouter.delete('/:p1employee', P1EmployeeController.deleteP1Employee, P1EmployeeController.p1employee);

module.exports = p1employeeRouter;
