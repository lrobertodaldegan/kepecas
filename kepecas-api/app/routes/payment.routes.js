const controller = require("../controllers/payment.controller");

module.exports = function(app) {
  app.post(
    '/kepecas/pay',
    [],
    controller.sendPayment
  );

  app.post(
    '/kepecas/plan',
    [],
    controller.createPlan
  );

  app.get(
    '/kepecas/signatures',
    [],
    controller.getSignatures
  );

  app.delete(
    '/kepecas/signature/:id',
    [],
    controller.cancelSignature
  );

  app.post(
    '/kepecas/signature',
    [],
    controller.sign
  );
};