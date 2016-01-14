'use strict';

var Entity = require('./Entity');
var Promise = require('bluebird');
var bcrypt = require('bcryptjs');

module.exports = Entity.specify({
  name: 'User',

  attributes: {
    'username': {
      type: 'String',
      multiplicity: '1',
      default: ''
    },
    'email': {
      type: 'String',
      multiplicity: '1',
      default: ''
    },
    'password': {
      type: 'String',
      multiplicity: '1',
      default: ''
    }
  },

  methods: {
    'save': function (options) {
      var user = this;
      //var rawPass = this.attributes.password;
      var rawPass = user.password;

      if (user.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(rawPass, salt, function (err, hash) {
            user.password = hash;
            user.save(options).then(function () {
              user.password = rawPass;
            });
          })
        });
      } else {
        user.save(options);
      }
    },

    'authenticate': function (password) {
      return true;
    }
    'authenticate': authenticateSync
  },

  nameValidation: false

});

function authenticateSync(password) {
  var user = this;
  return bcrypt.compareSync(password, user.password);
}

function authenticate(password) {
  var user = this;
  return new Promise(function (resolve) {
    bcrypt.compare(password, user.password, function (err, res) {
      resolve(res);
    });
  })
}

