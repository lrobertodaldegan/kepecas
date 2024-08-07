const { Payment, MercadoPagoConfig } = require('mercadopago');
const axios = require('axios');

const config = require("../../config/auth.config.js");
 
const db = require("../../models/kepecas");
const Signature = db.signature;
const Plan = db.plan;
const User = db.user;
 
const BACK_URL = 'https://www.kepecas.com.br';
//const AT = 'TEST-5943776082762649-020718-dd38272a487a981aff917abe332bb5e5-1056146012';
const AT = 'APP_USR-5943776082762649-020718-34ea315da56ec985bfcf3bbba7bf18ea-1056146012';
const ENDPOINT = 'https://api.mercadopago.com';
const ENDPOINT_PLANO = `${ENDPOINT}/preapproval_plan`;
const ENDPOINT_ASSINATURA = `${ENDPOINT}/preapproval`;
const ENDPOINT_BUSCA_ASSINATURA = `${ENDPOINT_ASSINATURA}/search`;
const ENDPOINT_CANCELA_ASSINATURA = (id) => `${ENDPOINT_ASSINATURA}/${id}`;
 
const errorHandler = (err, res) => {
  if (err) {
    console.log(err);
    res.status(500).send({ message:  'Ops!' });
    return;
  }
}
 
exports.sendPayment = (req, res) => {
 
  const client = new MercadoPagoConfig({ accessToken: AT });
  const payment = new Payment(client);
 
  payment.create({
      body: {
          transaction_amount: req.body.transactionAmount,
          token: req.body.token,
          description: req.body.description,
          installments: req.body.installments,
          payment_method_id: req.body.paymentMethodId,
          issuer_id: req.body.issuer,
          payer: req.body.payer
      },
      requestOptions: { idempotencyKey: 'k3p3c45' }
  })
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((error) => {
    console.log(error);
 
    res.status(500).send({message:'not ok'});
  });
}
 
exports.createPlan = (req, res) => {
  let body = {
    reason: req.body.title,
    back_url: BACK_URL,
    auto_recurring: {
      frequency: 1,
      frequency_type: 'months',
      billing_day: 15,
      billing_day_proportional: true,
      transaction_amount: req.body.value,
      currency_id: 'BRL',
    }
  };
 
  axios.post(ENDPOINT_PLANO, body, {
    headers:{
      'Authorization': `Bearer ${AT}`,
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    console.log(response);
    let p = new Plan({
                  code: response.data.id,
                  value: req.body.value,
                  title: req.body.title
                });
 
    p.save().then(plan => res.status(201).send(plan))
    .catch((err) => errorHandler(err, res));
  }).catch((err) => errorHandler(err, res));
}
 
exports.getPlans = (req, res) => {
  Plan.find().then(plans => {
    res.status(200).send(plans);
  })
  .catch((err) => errorHandler(err, res));
}
 
exports.sign = (req, res) => {
  Plan.findById(req.body.plan).then(plan => {
    if(plan && plan !== null){
      let body = {
        preapproval_plan_id: plan.code,
        reason: plan.title,
        external_reference: "Clube Kepecas",
        payer_email: req.body.email,
        card_token_id: req.body.token,
        auto_recurring: {
          frequency: 1,
          frequency_type: "months",
          transaction_amount: plan.value,
          currency_id: "BRL"
        },
        back_url: BACK_URL,
        status: "authorized"
      };
 
      axios.post(ENDPOINT_ASSINATURA, body, {
        headers:{
          'Authorization': `Bearer ${AT}`,
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log(response);
        let s = new Signature({code: response.data.id, plan:plan, email:req.body.email});

        let token = req.body.jwt;

        if (!token){
          console.log(response.data.id + ' - Nenhum token recebido! Nao sera vinculado a usuario');

          s.save().then(sig => {
            res.status(201).send(sig);
          }).catch((err) => errorHandler(err, res));  
        } else {
          jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
              console.log(response.data.id + ' - Token recebido invalido! Nao sera vinculado a usuario');

              s.save().then(sig => {
                res.status(201).send(sig);
              }).catch((err) => errorHandler(err, res));  
            } else {
              s.save().then(sig => {
                User.findById(decoded.id).then(user => {
                  user.signature = sig;

                  user.save().then(uUser => res.status(201).send(sig));
                }).catch((err) => errorHandler(err, res));  
              }).catch((err) => errorHandler(err, res));  
            }
          });
        }
      }).catch((err) => errorHandler(err, res));
    } else {
      res.status(400).send({message:'Plan was not found!'});
    }
  }).catch((err) => errorHandler(err, res));
}
 
exports.cancelSignature = (req, res) => {
  Signature.findById(req.params['id']).then((sig) => {
    if(sig && sig !== null){
      let body = {status:'cancelled'};
     
      axios.put(ENDPOINT_CANCELA_ASSINATURA(sig.code), body, {
        headers:{
          'Authorization': `Bearer ${AT}`,
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log(response);
   
        res.status(200).send({message:'ok'});
      }).catch((err) => errorHandler(err, res));
    } else {
      res.status(400).send({message:'Signature was not found!'});
    }
  }).catch((err) => errorHandler(err, res));
}
 
exports.getSignatures = (req, res) => {
  axios.get(ENDPOINT_BUSCA_ASSINATURA, {
    headers:{
      'Authorization': `Bearer ${AT}`,
      'Content-Type': 'application/json'
    }
  }).then(response => {
    console.log(response);
 
    res.status(200).send(response.data.results);
  }).catch((err) => errorHandler(err, res));
}