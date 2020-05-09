const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class P1FoodController {
    constructor() {
        console.log('P1Food Controller Initialized!');
    }
    
    // Fetches all Food
    async p1foods(ctx) {
        console.log('Controller HIT: P1FoodController::p1foods');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM P1Food';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.P1Food: ${err}`);
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

    // Fetches a single Food Item
    async p1food(ctx) {
        console.log('Controller HIT: P1FoodController::p1food');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM P1Food  WHERE name = ?;';
            const dc = ctx.params.p1food;
            
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

    // Add a new food item
    async addP1Food(ctx, next) {
        console.log('Controller HIT: P1FoodController::addP1Food');
       return new Promise((resolve, reject) => {
           const newDC = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO P1Food(name, price) VALUES (?,?);',
               values: [newDC.name, newDC.price]
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

    // Update a food iteme
    async updateP1Food(ctx, next) {
        console.log('Controller HIT: P1FoodController::updateP1Food');
        return new Promise((resolve, reject) => {
            const dc = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE P1Food 
                    SET 
                        price = ?
                    WHERE name = ?
                    `,
                values: [dc.price, ctx.params.p1beer]
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

    async deleteP1Food(ctx, next) {
        console.log('Controller HIT: P1FoodController::deleteP1Food');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM P1Food WHERE name = ?;`,
                values: [ctx.params.p1food]
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

module.exports = P1FoodController;
