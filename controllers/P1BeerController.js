const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class P1BeerController {
    constructor() {
        console.log('P1Beer Controller Initialized!');
    }
    
    // Fetches all beers
    async p1beers(ctx) {
        console.log('Controller HIT: P1BeerController::p1beers');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM P1Beer';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.P1Beer: ${err}`);
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

    // Fetches a single beer
    async p1beer(ctx) {
        console.log('Controller HIT: P1BeerController::p1beer');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM P1Beer  WHERE name = ?;';
            const dc = ctx.params.p1beer;
            
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

    // Add a new beer
    async addP1Beer(ctx, next) {
        console.log('Controller HIT: P1BeerController::addP1Beer');
       return new Promise((resolve, reject) => {
           const newDC = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO P1Beer(name, ABV, inventory, price) VALUES (?,?,?,?);',
               values: [newDC.name, newDC.ABV, newDC.inventory, newDC.price]
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

    // Update a beer
    async updateP1Beer(ctx, next) {
        console.log('Controller HIT: P1BeerController::updateP1Beer');
        return new Promise((resolve, reject) => {
            const dc = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE P1Beer
                    SET 
                        ABV = ?,
			inventory = ?,
			price = ?
                    WHERE name = ?
                    `,
                values: [dc.ABV, dc.inventory,dc.price, ctx.params.p1beer]
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

    async deleteP1Beer(ctx, next) {
        console.log('Controller HIT: P1BeerController::deleteP1Beer');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM P1Beer WHERE name = ?;`,
                values: [ctx.params.p1beer]
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

module.exports = P1BeerController;
