const express = require('express');
const route = express.Router();
const FORM_CONTROLLER = require('./controller/form-controller');

route.get('/', (req, res) => {
    res.send('WELCOME TO BACKEND');
});
route.get('/forms/get-all-forms', FORM_CONTROLLER.FETCH_ALL_FORMS);
route.get('/forms/get-single-form/:id', FORM_CONTROLLER.FETCH_SINGLE_FORM);
route.put('/forms/create-new-form', FORM_CONTROLLER.CREATE_NEW_FORM);
route.patch('/forms/update-form/:id', FORM_CONTROLLER.UPDATE_THE_FORM);
route.delete('/forms/delete-form/:id', FORM_CONTROLLER.DELETE_THE_FORM);

module.exports = route;