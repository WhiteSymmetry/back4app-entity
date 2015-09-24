//
// Created by davimacedo on 22/09/15.
//

'use strict';

module.exports = require('C1').specify({
  attributes: {
    c11A1: {
      type: 'Object',
      multiplicity: '1'
    }
  },
  methods: {
    c1M1: c1M1,
    c11M: c11M
  }
});

function c1M1(c1M1P1, c1M1P2, c11M1P) {
  return this.general.c1M1(c1M1P1, c1M1P2) + c11M1P;

}

function c11M() {
  var toReturn = '';
  var attribute = null;

  for (attribute in this.general.type.attributes) {
    toReturn += this[attribute];
  }

  for (attribute in this.type.attributes) {
    toReturn += this[attribute];
  }

  return toReturn;
}
