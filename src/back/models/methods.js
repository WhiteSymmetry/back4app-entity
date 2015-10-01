//
// Created by davimacedo on 30/09/15.
//

'use strict';

var expect = require('chai').expect;

/**
 * Contains base classes for Entity Method modeling.
 * @module back4app/entity/models/methods
 */
module.exports = {};
module.exports.MethodCollection = MethodCollection;

/**
 * Collection of Entity Methods.
 * @constructor
 * @memberof module:back4app/entity/models/methods
 * @param {?Object.<!string, !function>} [methods] The methods to be added in
 * the collection. They have to be given as a Dictionary of functions.
 */
function MethodCollection(methods) {
  expect(arguments).to.have.length.below(2);

  if (methods) {
    expect(methods).to.be.an('object');

    for (var method in methods) {
      expect(methods[method]).to.be.a('function');

      this.add(methods[method], method);
    }
  }
}

/**
 * Adds a new method to the collection.
 * @name module:back4app/entity/models/methods.MethodCollection#add
 * @function
 * @param {!function} func This is the method's function to be added.
 * @param {!string} name This is the name of the method.
 */
MethodCollection.prototype.add = function (func, name) {
  expect(arguments).to.have.length(2);

  expect(func).to.be.a('function');
  expect(name).to.be.a('string');

  expect(this).to.not.have.ownProperty(name);

  Object.defineProperty(this, name, {
    get: function () {
      return func;
    },
    set: function () {
      throw new Error('Method cannot be changed');
    }
  });
};
