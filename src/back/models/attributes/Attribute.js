//
// Created by davimacedo on 08/10/15.
//

'use strict';

var expect = require('chai').expect;
var objects = require('../../utils/objects');
var errors = require('../errors');
var ValidationError = errors.ValidationError;
var models = require('../index');
var attributes = require('./index');

module.exports = Attribute;

/**
 * Holds an Entity Attribute information. An instance of Attribute is not
 * extensible. The Attribute is an abstract class and cannot be directly
 * initialized. Use Attribute.resolve anywhere or Attribute.call inside a
 * subclass' constructor to initialize a new Attribute.
 * @memberof module:back4app-entity/models/attributes
 * @name Attribute
 * @constructor
 * @abstract
 * @param {!Object} attribute This is the attribute to be added. It can be
 * passed as an Object.
 * @param {!string} attribute.name It is the name of the attribute.
 * @param {!string} [attribute.multiplicity='1'] It is the multiplicity of the
 * attribute. It is optional and if not passed it will assume '1' as the default
 * value.
 * @param {?(boolean|number|string|Object|function)} [attribute.default] It is
 * the default expression of the attribute.
 * @param {?(string|Object.<!string, !string>)} [attribute.dataName] It is the
 * name to be used to stored the attribute data in the repository. It can be
 * given as a string that will be used by all adapters or as a dictionary
 * specifying the data name for each adapter. If dataName is not given, the
 * attribute's name will be used instead.
 * @example
 * Attribute.call(this, {
 *   name: 'attribute',
 *   multiplicity: '0..1',
 *   default: null,
 *   dataName: {
 *     mongodb: 'mongodbAttribute'
 *   }
 * });
 */
/**
 * Holds an Entity Attribute information. An instance of Attribute is not
 * extensible. The Attribute is an abstract class and cannot be directly
 * initialized. Use Attribute.resolve anywhere or Attribute.call inside a
 * subclass' constructor to initialize a new Attribute.
 * @memberof module:back4app-entity/models/attributes
 * @name Attribute
 * @constructor
 * @abstract
 * @param {!string} name It is the name of the attribute.
 * @param {!string} [multiplicity='1'] It is the multiplicity of the attribute.
 * It is optional and if not passed it will assume '1' as the default value.
 * @param {?(boolean|number|string|Object|function)} [default] It is the default
 * expression of the attribute.
 * @param {?(string|Object.<!string, !string>)} [dataName] It is the name to be
 * used to stored the attribute data in the repository. It can be given as a
 * string that will be used by all adapters or as a dictionary specifying the
 * data name for each adapter. If dataName is not given, the attribute's name
 * will be used instead.
 * @example
 * Attribute.call(
 *   this,
 *   'attribute',
 *   '0..1',
 *   null,
 *   {
 *     mongodb: 'mongodbAttribute'
 *   }
 * );
 */
function Attribute() {
  /**
   * This is the attribute' name.
   * @name module:back4app-entity/models/attributes.Attribute#name
   * @type {!string}
   * @readonly
   * @example
   * Attribute.call(
   *   this,
   *   'attribute',
   *   '0..1',
   *   'default'
   * );
   * console.log(this.name); // Logs "attribute"
   */
  this.name = null;
  /**
   * This is the attribute type.
   * @name module:back4app-entity/models/attributes.Attribute#type
   * @type {!Class}
   * @readonly
   * @example
   * var attribute = Attribute.resolve(
   *   'attribute',
   *   'String',
   *   '0..1',
   *   'default'
   * );
   * console.log(attribute.type == StringAttribute); // Logs "true"
   */
  this.type = null;
  /**
   * This is the attribute's multiplicity.
   * @name module:back4app-entity/models/attributes.Attribute#multiplicity
   * @type {!string}
   * @readonly
   * @example
   * Attribute.call(
   *   this,
   *   'attribute',
   *   '0..1',
   *   'default'
   * );
   * console.log(this.multiplicity); // Logs "0..1"
   */
  this.multiplicity = null;
  /**
   * This is the attribute's default expression.
   * @name module:back4app-entity/models/attributes.Attribute#default
   * @type {?(boolean|number|string|Object|function)}
   * @readonly
   * @example
   * Attribute.call(
   *   this,
   *   'attribute',
   *   '0..1',
   *   'default'
   * );
   * console.log(this.default); // Logs "default"
   */
  this.default = null;
  /**
   * This is is the name to be used to stored the attribute data in the
   * repository. It can be given as a string that will be used by all adapters
   * or as a dictionary specifying the data name for each adapter. If dataName
   * is not given, the attribute's name will be used instead.
   * @name module:back4app-entity/models/attributes.Attribute#dataName
   * @type {?(string|Object.<!string, !string>)}
   * @readonly
   * @example
   * Attribute.call(
   *   this,
   *   'attribute',
   *   '0..1',
   *   'default',
   *   {
   *     mongodb: 'mongodbAttribute'
   *   }
   * );
   * console.log(this.dataName.mongodb); // Logs "mongodbAttribute"
   * @example
   * Attribute.call(
   *   this,
   *   'attribute',
   *   '0..1',
   *   'default',
   *   'dataAttribute'
   * );
   * console.log(this.dataName); // Logs "dataAttribute"
   */
  this.dataName = null;

  expect(this).to.be.an(
    'object',
    'The Attribute\'s constructor can be only invoked from specialized' +
    'classes\' constructors'
  );

  expect(this.constructor).to.be.a(
    'function',
    'The Attribute\'s constructor can be only invoked from specialized' +
    'classes\' constructors'
  );

  expect(this.constructor).to.not.equal(
    Attribute,
    'The Attribute is an abstract class and cannot be directly initialized'
  );

  expect(this).to.be.instanceof(
    Attribute,
    'The Attribute\'s constructor can be only invoked from specialized' +
    'classes\' constructors'
  );

  var _name = null;
  var _type = this.constructor;
  var _multiplicity = '1';
  var _default = null;
  var _dataName = null;
  var dataName = null;
  var _reservedNames =
    ['save', 'validate', 'isValid', 'delete', 'adapter', 'Entity', 'General',
    'adapterName', 'isNew', 'isDirty', 'clean', 'id'];

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
    expect(_reservedNames).to.not.include(
      attribute.name,
      'Invalid property "name" when creating an Attribute (it must not ' +
      'be equal to any of the reserved names)'
    );

    _name = attribute.name;

    for (var property in attribute) {
      expect(['name', 'multiplicity', 'default', 'dataName']).to.include(
        property,
        'Invalid property "' + property + '" when creating an Attribute ' +
        'called "' + _name + '" (valid properties are "name", "type", ' +
        '"multiplicity", "default" and "dataName")'
      );
    }

    if (attribute.hasOwnProperty('multiplicity')) {
      expect(attribute.multiplicity).to.be.a(
        'string',
        'Invalid property "multiplicity" when creating an Attribute called "' +
        _name + '" (it has to be a string)'
      );

      expect(['1', '0..1', '1..*', '*']).to.contain(
        attribute.multiplicity,
        'Invalid property "multiplicity" when creating an Attribute called "' +
        _name + '" (valid values are "1", "0..1", "1..*", "*")'
      );

      _multiplicity = attribute.multiplicity;
    }

    if (attribute.hasOwnProperty('default')) {
      _default = attribute.default;
    }

    if (attribute.dataName) {
      if (typeof attribute.dataName === 'string') {
        _dataName = attribute.dataName;
      } else {
        expect(attribute.dataName).to.be.an(
          'object',
          'Invalid property "dataName" when creating an Attribute called "' +
          _name + '" (it has to be a string or an object)'
        );

        _dataName = {};
        for (dataName in attribute.dataName) {
          expect(attribute.dataName[dataName]).to.be.a(
            'string',
            'Invalid property "dataName" for adapter "' + dataName + '" when ' +
            'creating an Attribute called "' + _name + '" (it has to be a ' +
            'string)'
          );

          _dataName[dataName] = attribute.dataName[dataName];
        }

        Object.preventExtensions(_dataName);
        Object.seal(_dataName);
        Object.freeze(_dataName);
      }
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
        'Invalid argument "multiplicity" when creating an Attribute called "' +
        _name + '" (it has to be a string)'
      );

      expect(['1', '0..1', '1..*', '*']).to.contain(
        arguments[1],
        'Invalid argument "multiplicity" when creating an Attribtue called "' +
          _name + '" (valid values are "1", "0..1", "1..*", "*")'
      );

      _multiplicity = arguments[1];
    }

    if (arguments.length > 2) {
      _default = arguments[2];
    }

    if (arguments.length > 3 && arguments[3]) {
      if (typeof arguments[3] === 'string') {
        _dataName = arguments[3];
      } else {
        expect(arguments[3]).to.be.an(
          'object',
          'Invalid argument "dataName" when creating an Attribute called "' +
          _name + '" (it has to be a string or an object)'
        );

        _dataName = {};
        for (dataName in arguments[3]) {
          expect(arguments[3][dataName]).to.be.a(
            'string',
            'Invalid argument "dataName" for adapter "' + dataName + '" when ' +
            'creating an Attribute called "' + _name + '" (it has to be a ' +
            'string)'
          );

          _dataName[dataName] = arguments[3][dataName];
        }

        Object.preventExtensions(_dataName);
        Object.seal(_dataName);
        Object.freeze(_dataName);
      }
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

  Object.defineProperty(this, 'dataName', {
    value: _dataName,
    enumerable: true,
    writable: false,
    configurable: false
  });

  Object.preventExtensions(this);
  Object.seal(this);
}

Attribute.resolve = resolve;

Attribute.prototype.getDefaultValue = getDefaultValue;
Attribute.prototype.validate = validate;
Attribute.prototype.validateValue = validateValue;
Attribute.prototype.getDataName = getDataName;
Attribute.prototype.getDataValue = getDataValue;
Attribute.prototype.parseDataValue = parseDataValue;

/**
 * Resolves the arguments and create a new instance of Attribute. It tries to
 * find the Attribute type. It it is not possible, it assumes that it is an
 * AssociationAttribute.
 * @memberof module:back4app-entity/models/attributes.Attribute
 * @name resolve
 * @param {!Object} attribute This is the attribute to be resolved. It can be
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
 * @returns {module:back4app-entity/models/attributes.Attribute} The new
 * Attribute instance.
 * @throws {module:back4app-entity/models/errors.AttributeTypeNotFoundError}
 * @example
 * Attribute.resolve({
 *   name: 'attribute',
 *   type: 'String',
 *   multiplicity: '0..1',
 *   default: null
 * });
 */
/**
 * Resolves the arguments and create a new instance of Attribute. It tries to
 * find the Attribute type. It it is not possible, it assumes that it is an
 * AssociationAttribute.
 * @memberof module:back4app-entity/models/attributes.Attribute
 * @name resolve
 * @param {!string} name It is the name of the attribute.
 * @param {!string} [type='Object'] It is the type of the attribute. It is
 * optional and if not passed it will assume 'Object' as the default value.
 * @param {!string} [multiplicity='1'] It is the multiplicity of the attribute.
 * It is optional and if not passed it will assume '1' as the default value.
 * @param {?(boolean|number|string|Object|function)} [default] It is the default
 * expression of the attribute.
 * @returns {module:back4app-entity/models/attributes.Attribute} The new
 * Attribute instance.
 * @throws {module:back4app-entity/models/errors.AttributeTypeNotFoundError}
 * @example
 * Attribute.resolve(
 *   this,
 *   'attribute',
 *   'String',
 *   '0..1',
 *   null
 * );
 */
function resolve() {
  expect(arguments).to.have.length.within(
    1,
    4,
    'Invalid arguments length when resolving an Attribute (it has to be ' +
    'passed from 1 to 4 arguments)'
  );

  var argumentArray = Array.prototype.slice.call(arguments);
  var TypedAttribute = attributes.types.ObjectAttribute;

  if (arguments.length === 1 && typeof arguments[0] !== 'string') {
    var attribute = objects.copy(arguments[0]);
    argumentArray[0] = attribute;

    expect(attribute).to.be.an(
      'object',
      'Invalid argument type when resolving an Attribute (it has to be an ' +
      'object)'
    );

    if (attribute.type) {
      expect(attribute.type).to.be.a(
        'string',
        'Invalid argument "type" when resolving an Attribute' +
        (attribute.name ? ' called' + attribute.name : '') +
        ' (it has to be a string)'
      );

      try {
        TypedAttribute = attributes.types.get(attribute.type);
      } catch (e) {
        if (e instanceof errors.AttributeTypeNotFoundError) {
          TypedAttribute = attributes.types.AssociationAttribute;
          attribute.entity = attribute.type;
        } else {
          throw e;
        }
      }

      delete attribute.type;
    }
  } else {
    if (arguments.length > 1) {
      expect(arguments[1]).to.be.a(
        'string',
        'Invalid argument "type" when resolving an Attribute' +
        (arguments[0] ? ' called' + arguments[0] : '') +
        ' (it has to be a string)'
      );

      try {
        TypedAttribute = attributes.types.get(arguments[1]);
      } catch (e) {
        if (e instanceof errors.AttributeTypeNotFoundError) {
          TypedAttribute = attributes.types.AssociationAttribute;
          argumentArray.splice(2, 0, arguments[1]);
        } else {
          throw e;
        }
      }

      argumentArray.splice(1,1);
    }
  }

  return new (Function.prototype.bind.apply(
    TypedAttribute,
    [null].concat(argumentArray)
  ))();
}

/**
 * Gets the default value of the current Attribute to a given Entity instance.
 * @name module:back4app-entity/models/attributes.Attribute#getDefaultValue
 * @function
 * @param {!module:back4app-entity/models.Entity} entity The Entity instance to
 * which the default value will be get.
 * @returns {boolean|number|string|Object|function} The default value.
 * @example
 * var defaultValue = MyEntity.attributes.myAttribute.getDefaultValue(
 *   new MyEntity()
 * );
 */
function getDefaultValue(entity) {
  expect(arguments).to.have.length(
    1,
    'Invalid arguments length when getting the default value of an Attribute ' +
    'to an Entity instance (it has to be given 1 argument)'
  );

  expect(entity).to.be.an.instanceOf(
    models.Entity,
    'Invalid type of argument "entity" when getting the default value of an ' +
    'Attribute to an Entity instance (it has to be an Entity)'
  );

  if (typeof this.default === 'function') {
    return this.default.call(entity);
  } else {
    return this.default;
  }
}

/**
 * Validates an attribute of an Entity instance and throws a
 * {@link module:back4app-entity/models/errors.ValidationError} if
 * it is not validated.
 * @name module:back4app-entity/models/attributes.Attribute#validate
 * @function
 * @param {!module:back4app-entity/models.Entity} entity The entity whose
 * attribute will be validated.
 * @throws {module:back4app-entity/models/errors.ValidationError}
 * @example
 * myEntity.Entity.attributes.myAttribute.validate(myEntity);
 */
function validate(entity) {
  expect(arguments).to.have.length(
    1,
    'Invalid argument length when validating an attribute of an entity (it ' +
    'has to be passed 1 argument)'
  );

  expect(entity).to.be.instanceof(
    models.Entity,
    'Invalid argument "entity" when validating an attribute of an entity (it ' +
    'has to be an Entity)'
  );

  var attributeValue = null;

  if (entity.hasOwnProperty(this.name)) {
    attributeValue = entity[this.name];
  }

  if (
    (
      this.multiplicity === '1' ||
      this.multiplicity === '1..*'
    ) &&
    attributeValue === null
  ) {
    throw new ValidationError(
      'this attribute is required',
      entity.Entity.specification.name,
      this.name
    );
  } else if (
    this.multiplicity === '0..1' && attributeValue !== null ||
    this.multiplicity === '1'
  ) {
    try {
      this.validateValue(attributeValue);
    } catch (e) {
      if (e instanceof ValidationError) {
        throw new ValidationError(
          e.validationMessage,
          entity.Entity.specification.name,
          this.name
        );
      } else {
        throw e;
      }
    }
  } else if (
    this.multiplicity === '*' && attributeValue !== null ||
    this.multiplicity === '1..*'
  ) {
    if (!(attributeValue instanceof Array)) {
      throw new ValidationError(
        'this attribute\'s value should be an Array',
        entity.Entity.specification.name,
        this.name
      );
    } else {
      var found = false;

      for (var i = 0; i < attributeValue.length; i++) {
        if (attributeValue[i] !== null) {
          try {
            this.validateValue(attributeValue[i]);
          } catch (e) {
            if (e instanceof ValidationError) {
              throw new ValidationError(
                e.validationMessage,
                entity.Entity.specification.name,
                this.name,
                i
              );
            } else {
              throw e;
            }
          }
          found = true;
        }
      }

      if (
        this.multiplicity === '1..*' &&
        !found
      ) {
        throw new ValidationError(
          'this attribute\'s value should be a non empty Array',
          entity.Entity.specification.name,
          this.name
        );
      }
    }
  }
}

/**
 * Validates a value and throws a
 * {@link module:back4app-entity/models/errors.ValidationError} if
 * it is not validated. It shall be implemented in the specializations of
 * Attribute class. Otherwise, it wil throw an Error.
 * @name module:back4app-entity/models/attributes.Attribute#validateValue
 * @function
 * @param {*} value The value to be validated.
 * @throws {module:back4app-entity/models/errors.ValidationError}
 * @example
 * myEntity.Entity.attributes.myAttribute.validateValue(myEntity.myAttribute);
 */
function validateValue() {
  throw new Error('Function "validateValue" has to be implemented in the ' +
    'Attribute specialization');
}

/**
 * Gets the data name of an Entity attribute to be used in an adapter.
 * @name module:back4app-entity/models/attributes.Attribute#getDataName
 * @function
 * @param {?string} [adapterName] The name of the adapter of which the data
 * name is wanted.
 * @returns {string} The data name.
 * @example
 * var dataName = MyEntity.attributes.myAttribute.getDataName('default');
 */
function getDataName(adapterName) {
  expect(arguments).to.have.length.below(
    2,
    'Invalid arguments length when getting the data name of an Attribute ' +
    '(it has to be passed less than 2 arguments)');

  if (adapterName) {
    expect(adapterName).to.be.a(
      'string',
      'Invalid argument "adapterName" when getting the data name of an ' +
      'Attribute (it has to be a string)'
    );

    if (
      this.dataName &&
      typeof this.dataName === 'object' &&
      this.dataName.hasOwnProperty(adapterName)
    ) {
      return this.dataName[adapterName];
    }
  }

  if (this.dataName && typeof this.dataName === 'string') {
    return this.dataName;
  } else {
    return this.name;
  }
}

/**
 * Gets the data value of an Entity attribute to be used in an adapter. The
 * default implementation only returns the given attributeValue. It has to be
 * overriden in Attribute specializations if another behavior is needed.
 * @name module:back4app-entity/models/attributes.Attribute#getDataValue
 * @function
 * @param {*} attributeValue The attribute value to be converted in data value.
 * @returns {*} The data value.
 * @example
 * var dataValue = MyEntity.attributes.myAttribute.getDataValue(
 *   myEntity.myAttribute
 * );
 */
function getDataValue(attributeValue) {
  expect(arguments).to.have.length(
    1,
    'Invalid arguments length when getting the data value of an Attribute ' +
    '(it has to be passed 1 argument)');

  return attributeValue;
}

/**
 * Parses the data value of an Entity attribute to be used in an adapter. The
 * default implementation only returns the given dataValue. It has to be
 * overriden in Attribute specializations if another behavior is needed.
 * @name module:back4app-entity/models/attributes.Attribute#parseDataValue
 * @function
 * @param {*} dataValue The data value to be converted in attribute value.
 * @returns {*} The attribute value.
 * @example
 * var attributeValue = MyEntity.attributes.myAttribute.parseDataValue(
 *   myAttributeDataValueFromStorage
 * );
 */
function parseDataValue(dataValue) {
  expect(arguments).to.have.length(
    1,
    'Invalid arguments length when parsing the data value of an Attribute ' +
    '(it has to be passed 1 argument)');

  return dataValue;
}
