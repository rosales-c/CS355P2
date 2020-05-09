const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class P1EmergencyContactController {
    constructor() {
        console.log('P1EmergencyContact Controller Initialized!');
    }
    
    // Fetches all emergency contact
    async p1emergencycontacts(ctx) {
        console.log('Controller HIT: P1EmergencyContactController::p1emergencycontacts');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM P1EmergencyContact';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.P1EmergencyContact: ${err}`);
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

    // Fetches a emergency contact
    async p1emergencycontact(ctx) {
        console.log('Controller HIT: P1EmergencyContactController::p1emergencycontact');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM P1EmergencyContact  WHERE employee = ?;';
            const dc = ctx.params.p1emergencycontact;
            
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

    // Add a new emergency contact
    async addP1EmergencyContact(ctx, next) {
        console.log('Controller HIT: P1EmergencyContactController::addP1EmergencyContact');
       return new Promise((resolve, reject) => {
           const newDC = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO P1EmergencyContact(employee, name, phone1, phone2) VALUES (?,?,?,?);',
               values: [newDC.employee, newDC.name, newDC.phone1, newDC.phone2]
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

    // Update a emergency contact
    async updateP1EmergencyContact(ctx, next) {
        console.log('Controller HIT: P1EmergencyContactController::updateP1EmergencyContact');
        return new Promise((resolve, reject) => {
            const dc = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE P1EmergencyContact
                    SET 
                        name = ?,
			phone1 = ?,
			phone2 = ?
                    WHERE employee = ?
                    `,
                values: [dc.name, dc.phone1,dc.phone2, ctx.params.p1emergencycontact]
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

    async deleteP1EmergencyContact(ctx, next) {
        console.log('Controller HIT: P1EmergencyContactController::deleteP1EmergencyContact');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM P1EmergencyContact WHERE employee = ?;`,
                values: [ctx.params.p1emergencycontact]
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

module.exports = P1EmergencyContactController;
