var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var institutionSchema = new mongoose.Schema({



  inst_name: {
    type: String,
    require: true
  },

  inst_state: {
    type: String,
    require: false
  },
  
  inst_fulladdress: {
    type: String,
    require: false
  },
  
  inst_phone: {
    type: String,
    require: false
  },

  inst_fee: {
    type: String,
    require: false
  },

  inst_rankworld: {
    type: Number,
    require: false
  },

  inst_rankaustralia: {
    type: Number,
    require: false
  },

  inst_cityexpensemonthly: {
    type: String,
    require: false
  },

  inst_totalstudent: {
    type: String,
    require: false
  },

  inst_type: {
    type: String,
    require: false
  },

  inst_minielts: {
    type: Number,
    require: false
  },

  inst_onlinecourseavailability: {
    type: Boolean,
    require: false
  },

  inst_collegeuni: {
    type: String,
    require: false
  },

  inst_url: {
    type: String,
    require: false
  },

  inst_image: {
    type: String,
    require: false
  },

  inst_affilatedto: {
    type: String,
    require: false
  },

  inst_scholarship: {
    type: Boolean,
    require: false
  },

  inst_noofintakes: {
    type: String,
    require: false
  },

  course: {
    type: [String]
  },

  level: {
    undergraduate: {
      type: Boolean,
      require: false
    },

    graduate: {
      type: Boolean,
      require: false
    },


  },

  

  inst_calendarsystem: {

    semester: {
      type: Boolean,
      require: false
    },

    trimester: {
      type: Boolean,
      require: false
    },
  }
});

var Institution = mongoose.model('Institution', institutionSchema);

module.exports = Institution;
