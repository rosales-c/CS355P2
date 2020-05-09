const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class P1EmployeeController {
    constructor() {
        console.log('P1Employee Controller Initialized!');
    }
    
    // Fetches all Employee
    async p1employees(ctx) {
        console.log('Controller HIT: P1EmployeeController::p1employees');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM P1Employee';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.P1Employee: ${err}`);
                }
                
                ctx.body = res;
                ctx.status = 200;
                
                resolve();
            });
        })
         .catch(err => {
            ctx.status = 500;
            ctx.body = err;
        });
    }

    // Fetches a single Employee
    async p1employee(ctx) {
        console.log('Controller HIT: P1EmployeeController::p1employee');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM P1Employee  WHERE SSN = ?;';
            const dc = ctx.params.p1employee;
            
            chpConnection.query({
                sql: query,
                values: [dc]
            }, (err, res) => {
                if(err) {
                    reject(err);
                } 

                ctx.body = res;
                ctx.status = 200;
                resolve();
            });
        })
         .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }

    // Add a new Employee
    async addP1Employee(ctx, next) {
        console.log('Controller HIT: P1EmployeeController::addP1Eployee');
       return new Promise((resolve, reject) => {
           const newDC = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO P1Employee(SSN, name, DOB, address, hourlyWage) VALUES (?,?,?,?,?);',
               values: [newDC.SSN, newDC.name, newDC.DOB, newDC.adress, newDC.hourlyWage]
           }, (err, res) => {
               if(err) {
                   reject(err);
               }

               resolve();
           });
           
       })
        .then(await next)
        .catch(err => {
           ctx.status = 500;
           ctx.body = {
               error: `Internal Server Error: ${err}`,
               status: 500
           };
       });
    }

    // Update an Employee
    async updateP1Employee(ctx, next) {
        console.log('Controller HIT: P1EmployeeController::updateP1Employee');
        return new Promise((resolve, reject) => {
            const dc = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE P1Employee 
                    SET 
                        name = ?,
                        DOB = ?,
			address = ?,
			hourlyWage = ?
                    WHERE SSN = ?
                    `,
                values: [dc.name, dc.DOB,dc.address, dc.hourlyWage, ctx.params.p1employee]
            }, (err, res) => {
                if(err) {
                    reject(err);
                }

                resolve();
            });
        })
         .then(await next)
         .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }

    async deleteP1Employee(ctx, next) {
        console.log('Controller HIT: P1EmployeeController::deleteP1Employee');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM P1Employee WHERE SSN = ?;`,
                values: [ctx.params.p1employee]
            }, (err, res) => {
                if(err) {
                    reject(err);
                }
                resolve();
            });
        })
        .then(await next)
        .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }
}

module.exports = P1EmployeeController;
