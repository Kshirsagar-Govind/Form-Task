const mongoose = require("mongoose");

const inputs_arr = {
    input_id: { type: String, default: "" },
    input_index: { type: Number, default: 0 },
    input_type: { type: String, default: "" },
    input_title: { type: String, default: "" },
    input_paceholder: { type: String, default: "" },
}

const newForm = new mongoose.Schema({
    form_id: { type: String, default: "" },
    form_title: { type: String, default: "" },
    date: { type: Date, default: Date.now },
    last_updated: { type: Date, default: Date.now },
    inputs: [inputs_arr],

});

module.exports = mongoose.model("NewForms", newForm, "FormsCollection");
