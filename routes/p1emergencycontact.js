const P1EmergencyContactController = new (require('../controllers/P1EmergencyContactController'))();
const p1emergencycontactRouter = require('koa-router')({
    prefix: '/p1emergencycontact'
});

p1emergencycontactRouter.get('/', P1EmergencyContactController.p1emergencycontact);
p1emergencycontactRouter.get('/:p1emergencycontact', P1EmergencyContactController.p1emergencycontact);
p1emergencycontactRouter.post('/', P1EmergencyContactController.addP1EmergencyContact, P1EmergencyContactController.p1emergencycontact);
p1emergencycontactRouter.put('/:p1emergencycontact', P1EmergencyContactController.updateP1EmergencyContact, P1EmergencyContactController.p1emergencycontact);
p1emergencycontactRouter.delete('/:p1emergencycontact', P1EmergencyContactController.deleteP1EmergencyContact, P1EmergencyContactController.p1emergencycontact);

module.exports = p1emergencycontactRouter;
