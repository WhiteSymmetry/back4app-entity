'use strict';

var expect = require('chai').expect;
var Promise = require('bluebird');
var classes = require('../utils').classes;

module.exports = Adapter;

/**
 * Base class for database adapters. It cannot be directly initialized.
 * @constructor
 * @memberof module:back4app-entity/adapters
 * @example
 * var myAdapter = new MyAdapter(myConfig);
 */
function Adapter() {
  expect(this).to.be.an(
    'object',
    'The Adapter\'s constructor can be only invoked from specialized' +
    'classes\' constructors'
  );

  expect(this.constructor).to.be.a(
    'function',
    'The Adapter\'s constructor can be only invoked from specialized' +
    'classes\' constructors'
  );

  expect(this.constructor).to.not.equal(
    Adapter,
    'The Adapter is an abstract class and cannot be directly initialized'
  );

  expect(this).to.be.instanceof(
    Adapter,
    'The Adapter\'s constructor can be only invoked from specialized' +
    'classes\' constructors'
  );

  expect(classes.isGeneral(Adapter, this.constructor)).to.equal(
    true,
    'The Adapter\'s constructor can be only invoked from specialized' +
    'classes\' constructors'
  );
}

Adapter.prototype.loadAttribute = loadAttribute;
Adapter.prototype.insertObject = insertObject;

function loadAttribute() {
  throw new Error('Function "loadAttribute" has to be implemented in the ' +
    'Adapter specialization');
}

function insertObject() {
  return new Promise(function () {
    throw new Error('Function "insertObject" has to be implemented in the ' +
      'Adapter specialization');
  });
}
