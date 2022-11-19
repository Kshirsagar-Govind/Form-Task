
const FormModel = require('../models/form-model');

exports.CREATE_NEW_FORM = async (req, res) => {
    try {
        console.log('CREATING NEW FORM--------------------------------');

        const { form_title, inputs } = req.body;
        await FormModel({
            form_id: "ID" + Date.now(),
            form_title,
            inputs
        }).save();

        res.json({ code: 201, msg: 'NEW FORM ADDED' });
    } catch (err) {
        console.log(err);
        res.json({ code: 400, msg: 'SERVER ERROR OCCURED' });
    }
}

exports.FETCH_ALL_FORMS = async (req, res) => {
    try {
        console.log('UPDATING ALL FORMS --------------------------------');

        console.log('SENDING THE FORMS DATA');
        const data = await FormModel.find({})
            .then(data => { console.log(data); res.json({ code: 200, data }) })
            .catch(err => res.json({ code: 400, msg: err }));

    } catch (err) {
        console.log(err);
        res.json({ code: 400, msg: 'SERVER ERROR OCCURED' });
    }
}

exports.FETCH_SINGLE_FORM = async (req, res) => {
    try {
        console.log('FETCHING SINGLE FORM--------------------------------');

        await FormModel.find({ form_id: req.params.id })
            .then(data => res.json({ code: 200, data }))
            .catch(err => res.json({ code: 404 }));

    } catch (err) {
        console.log(err);
        res.json({ code: 400, msg: 'SERVER ERROR OCCURED' });
    }
}

exports.UPDATE_THE_FORM = async (req, res) => {
    try {
        console.log('UPDATING FORM--------------------------------');
        const update = await FormModel.findOneAndUpdate({ form_id: req.params.id }, {
            form_title: req.body.form_title,
            inputs: req.body.inputs,
            last_updated: new Date()
        })
        console.log(update);
        res.json({ code: 200, msg: 'UPDATED' });
    } catch (err) {
        console.log(err);
        res.json({ code: 400, msg: 'SERVER ERROR OCCURED' });
    }
}

exports.DELETE_THE_FORM = async (req, res) => {
    try {
        console.log('DELETING FORM--------------------------------');

        await FormModel.findOneAndDelete({ form_id: req.params.id })
            .then(data => res.json({ code: 200, data }))
            .catch(err => res.json({ code: 404 }));

    } catch (err) {
        console.log(err);
        res.json({ code: 400, msg: 'SERVER ERROR OCCURED' });
    }
}