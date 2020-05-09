const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class P1DepartmentController {
    constructor() {
        console.log('P1Department Controller Initialized!');
    }
    
    // Fetches all Departments
    async p1departments(ctx) {
        console.log('Controller HIT: P1DepartmentController::p1departments');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM P1Department';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.P1Department: ${err}`);
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

    // Fetches a single Department
    async p1department(ctx) {
        console.log('Controller HIT: P1DepartmentController::p1department');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM P1Department  WHERE name = ?;';
            const dc = ctx.params.p1department;
            
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

    // Add a new Department
    async addP1Department(ctx, next) {
        console.log('Controller HIT: P1DepartmentController::addP1Department');
       return new Promise((resolve, reject) => {
           const newDC = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO P1Department(name) VALUES (?);',
               values: [newDC.name]
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

    // Update an Department
    async updateP1Department(ctx, next) {
        console.log('Controller HIT: P1DepartmentController::updateP1Department');
        return new Promise((resolve, reject) => {
            const dc = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE P1Department 
                    SET 
                        name = ?
                    WHERE name = ?
                    `,
                values: [dc.name, ctx.params.p1department]
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

    async deleteP1Department(ctx, next) {
        console.log('Controller HIT: P1DepartmentController::deleteP1Department');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM P1Department WHERE name = ?;`,
                values: [ctx.params.p1department]
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

module.exports = P1DepartmentController;
