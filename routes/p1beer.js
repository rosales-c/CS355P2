const P1BeerController = new (require('../controllers/P1BeerController'))();
const p1beerRouter = require('koa-router')({
    prefix: '/p1beer'
});

p1beerRouter.get('/', P1BeerController.p1beers);
p1beerRouter.get('/:p1beer', P1BeerController.p1beer);
p1beerRouter.post('/', P1BeerController.addP1Beer, P1BeerController.p1beer);
p1beerRouter.put('/:p1beer', P1BeerController.updateP1Beer, P1BeerController.p1beer);
p1beerRouter.delete('/:p1beer', P1BeerController.deleteP1Beer, P1BeerController.p1beer);

module.exports = p1beerRouter;
