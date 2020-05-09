const p1employeeRouter = require('./p1employee');
const p1departmentRouter = require('./p1department');
const p1foodRouter = require('./p1food');
const p1beerRouter = require('./p1beer');
const p1emergencycontactRouter = require('./p1emergencycontact');
const defaultRouter = require('koa-router')({
    prefix: '/api'
});

defaultRouter.get('/', ctx => {
    ctx.status = 200;
    ctx.body = "Default Route Found!";
});

defaultRouter.use(
    p1employeeRouter.routes(),
	p1departmentRouter.routes(), 
	p1foodRouter.routes(),
	p1beerRouter.routes(),
	p1emergencycontactRouter.routes()
);

module.exports = api => {
    api.use(defaultRouter.routes());
};
