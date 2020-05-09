const P1DepartmentController = new (require('../controllers/P1DepartmentController'))();
const p1departmentRouter = require('koa-router')({
    prefix: '/p1department'
});

p1departmentRouter.get('/', P1DepartmentController.p1departments);
p1departmentRouter.get('/:p1department', P1DepartmentController.p1department);
p1departmentRouter.post('/', P1DepartmentController.addP1Department, P1DepartmentController.p1department);
p1departmentRouter.put('/:p1department', P1DepartmentController.updateP1Department, P1DepartmentController.p1department);
p1departmentRouter.delete('/:p1department', P1DepartmentController.deleteP1Department, P1DepartmentController.p1department);

module.exports = p1departmentRouter;
