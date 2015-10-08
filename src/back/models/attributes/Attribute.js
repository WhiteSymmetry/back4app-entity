//
// Created by davimacedo on 08/10/15.
//

'use strict';

var expect = require('chai').expect;

module.exports = Attribute;

/**
 * Holds an Entity Attribute information. An instance of Attribute is not
 * extensible.
 * @memberof module:back4app/entity/models/attributes
 * @name Attribute
 * @constructor
 * @param {!Object} attribute This is the attribute to be added. It can be
 * passed as an Object.
 * @param {!string} attribute.name It is the name of the attribute.
 * @param {!string} [attribute.type='Object'] It is the type of the attribute.
 * It is optional and if not passed it will assume 'Object' as the default
 * value.
 * @param {!string} [attribute.multiplicity='1'] It is the multiplicity of the
 * attribute. It is optional and if not passed it will assume '1' as the default
 * value.
 * @param {?(boolean|number|string|Object|function)} [attribute.default] It is
 * the default expression of the attribute.
 * @example
 * var attribute = new attributes.Attribute({
 *   name: 'attribute',
 *   type: 'String',
 *   multiplicity: '0..1',
 *   default: null
 * });
 */
/**
 * Holds an Entity Attribute information. An instance of Attribute is not
 * extensible.
 * @memberof module:back4app/entity/models/attributes
 * @name Attribute
 * @constructor
 * @param {!string} name It is the name of the attribute.
 * @param {!string} [type='Object'] It is the type of the attribute. It is
 * optional and if not passed it will assume 'Object' as the default value.
 * @param {!string} [multiplicity='1'] It is the multiplicity of the attribute.
 * It is optional and if not passed it will assume '1' as the default value.
 * @param {?(boolean|number|string|Object|function)} [default] It is the default
 * expression of the attribute.
 * @example
 * var attribute = new attributes.Attribute(
 *   'attribute',
 *   'String',
 *   '0..1',
 *   null
 * );
 */
function Attribute() {
  /**
   * This is the attribute' name.
   * @name module:back4app/entity/models/attributes.Attribute#name
   * @type {!string}
   * @readonly
   * @example
   * var attribute = new attributes.Attribute(
   *   'attribute',
   *   'String',
   *   '0..1',
   *   'default'
   * );
   * console.log(attribute.name); // Logs "attribute"
   */
  this.name = null;
  /**
   * This is the attribute type.
   * @name module:back4app/entity/models/attributes.Attribute#type
   * @type {!string}
   * @readonly
   * @example
   * var attribute = new attributes.Attribute(
   *   'attribute',
   *   'String',
   *   '0..1',
   *   'default'
   * );
   * console.log(attribute.type); // Logs "String"
   */
  this.type = null;
  /**
   * This is the attribute's multiplicity.
   * @name module:back4app/entity/models/attributes.Attribute#multiplicity
   * @type {!string}
   * @readonly
   * @example
   * var attribute = new attributes.Attribute(
   *   'attribute',
   *   'String',
   *   '0..1',
   *   'default'
   * );
   * console.log(attribute.multiplicity); // Logs "0..1"
   */
  this.multiplicity = null;
  /**
   * This is the attribute's default expression.
   * @name module:back4app/entity/models/attributes.Attribute#default
   * @type {?(boolean|number|string|Object|function)}
   * @readonly
   * @example
   * var attribute = new attributes.Attribute(
   *   'attribute',
   *   'String',
   *   '0..1',
   *   'default'
   * );
   * console.log(attribute.default); // Logs "default"
   */
  this.default = null;

  var _name = null;
  var _type = 'Object';
  var _multiplicity = '1';
  var _default = null;

  expect(arguments).to.have.length.within(
    1,
    4,
    'Invalid arguments length when creating an Attribute (it has to be ' +
    'passed from 1 to 4 arguments)'
  );

  if (arguments.length === 1 && typeof arguments[0] !== 'string') {
    var attribute = arguments[0];

    expect(attribute).to.be.an(
      'object',
      'Invalid argument type when creating an Attribute (it has to be an ' +
      'object or a string)'
    );

    expect(attribute).to.have.ownProperty(
      'name',
      'Property "name" is required when creating an Attribute'
    );
    expect(attribute.name).to.be.a(
      'string',
      'Invalid property "name" when creating an Attribute (it has to be a ' +
      'string)'
    );

    _name = attribute.name;

    for (var property in attribute) {
      expect(['name', 'type', 'multiplicity', 'default']).to.include(
        property,
        'Invalid property "' + property + '" when creating an Attribute ' +
        'called "' + _name + '" (valid properties are "name", ' +
        '"type", "multiplicity" and "default")'
      );
    }

    if (attribute.hasOwnProperty('type')) {
      expect(attribute.type).to.be.a(
        'string',
        'Invalid property "type" when creating an Attribute called "' +
        _name + '" (it has to be a string)'
      );

      _type = attribute.type;
    }

    if (attribute.hasOwnProperty('multiplicity')) {
      expect(attribute.multiplicity).to.be.a(
        'string',
        'Invalid property "multiplicity" when creating an Attribute called "' +
        _name + '" (it has to be a string'
      );

      _multiplicity = attribute.multiplicity;
    }

    if (attribute.hasOwnProperty('default')) {
      _default = attribute.default;
    }
  } else {
    expect(arguments[0]).to.be.a(
      'string',
      'Invalid argument "name" when creating an Attribute (it has to be a ' +
      'string)'
    );

    _name = arguments[0];

    if (arguments.length > 1) {
      expect(arguments[1]).to.be.a(
        'string',
        'Invalid argument "type" when creating an Attribute called "' + _name +
        '" (it has to be a string)'
      );

      _type = arguments[1];
    }

    if (arguments.length > 2) {
      expect(arguments[2]).to.be.a(
        'string',
        'Invalid argument "multiplicity when creating an Attribute called "' +
        _name + '" (it has to be a string)'
      );

      _multiplicity = arguments[2];
    }

    if (arguments.length > 3) {
      _default = arguments[3];
    }
  }

  Object.defineProperty(this, 'name', {
    value: _name,
    enumerable: true,
    writable: false,
    configurable: false
  });

  Object.defineProperty(this, 'type', {
    value: _type,
    enumerable: true,
    writable: false,
    configurable: false
  });

  Object.defineProperty(this, 'multiplicity', {
    value: _multiplicity,
    enumerable: true,
    writable: false,
    configurable: false
  });

  Object.defineProperty(this, 'default', {
    value: _default,
    enumerable: true,
    writable: false,
    configurable: false
  });

  Object.preventExtensions(this);
  Object.seal(this);
}
