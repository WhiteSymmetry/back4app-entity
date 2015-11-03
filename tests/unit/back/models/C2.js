//
// Created by davimacedo on 24/09/15.
//

'use strict';

var Entity = require('../../../../').models.Entity;
var ObjectAttribute = require('../../../../')
  .models.attributes.types.ObjectAttribute;

require('../../settings');

module.exports = Entity.specify(
  'C2',
  [
    new ObjectAttribute(
      '_Entity',
      '1',
      function () { return {}; }
    ),
    new ObjectAttribute({
      name: 'c2A2',
      multiplicity: '0..1',
      default: function () { return { default: 'thisIsMyDefault' }; }
    })
  ],
  {
    constructor: function () { return 'constructor'; }
  },
  {
    isAbstract: false,
    dataName: {
      notDefault: 'notDefault',
      default: 'C2'
    }
  }
);
