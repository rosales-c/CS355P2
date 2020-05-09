const P1FoodController = new (require('../controllers/P1FoodController'))();
const p1foodRouter = require('koa-router')({
    prefix: '/p1food'
});

p1foodRouter.get('/', P1FoodController.p1foods);
p1foodRouter.get('/:p1food', P1FoodController.p1food);
p1foodRouter.post('/', P1FoodController.addP1Food, P1FoodController.p1food);
p1foodRouter.put('/:p1food', P1FoodController.updateP1Food, P1FoodController.p1food);
p1foodRouter.delete('/:p1food', P1FoodController.deleteP1Food, P1FoodController.p1food);

module.exports = p1foodRouter;
