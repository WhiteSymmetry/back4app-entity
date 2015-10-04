//
// Created by davimacedo on 22/09/15.
//

'use strict';

var util = require('util');
var expect = require('chai').expect;

/**
 * Contains utilities functions to be used with classes around the project. This
 * module is not exported to be used outside this project.
 * @module back4app/entity/utils/classes
 */
module.exports = {};

module.exports.generalize = generalize;

/**
 * Makes the GeneralClass to generalize the SpecificClass. This function is not
 * exported to be used outside this project.
 * @param {!Class} GeneralClass The general class to generalize the
 * SpecificClass.
 * @param {!Class} SpecificClass The specific class to be generalized by the
 * GeneralClass.
 * @example
 * function GeneralClass() {}
 *
 * function SpecificClass() {
 *   GeneralClass.call(this);
 * }
 *
 * classes.generalize(GeneralClass, SpecificClass);
 */
function generalize(GeneralClass, SpecificClass) {
  expect(arguments).to.have.length(
    2,
    'Invalid argument length when generalizing classes'
  );
  expect(GeneralClass).to.be.a(
    'function',
    'Invalid argument "GeneralClass" when generalizing classes (it has to be ' +
    'a function)'
  );
  expect(SpecificClass).to.be.a(
    'function',
    'Invalid argument "SpecificClass" when generalizing classes (ut has to ' +
    'be a function)'
  );

  util.inherits(SpecificClass, GeneralClass);

  for (var property in GeneralClass) {
    SpecificClass[property] = GeneralClass[property];
  }
}
