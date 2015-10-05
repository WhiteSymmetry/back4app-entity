//
// Created by davimacedo on 30/09/15.
//

'use strict';

var expect = require('chai').expect;
var attributes = require('./attributes');
var methods = require('./methods');

module.exports = EntitySpecification;

/**
 * Class to specify an Entity.
 * @constructor
 * @memberof module:back4app/entity/models
 * @name EntitySpecification
 * @param
 * {?(module:back4app/entity/models/attributes.AttributeCollection|
 * module:back4app/entity/models/attributes.Attribute[]|
 * Object.<!string, !(module:back4app/entity/models/attributes.Attribute|
 * Object)>)}
 * attributes The new entity specification attributes. It can be given as an
 * instance of
 * {@link module:back4app/entity/models/attributes.AttributeCollection} or an
 * object, as specified in
 * {@link module:back4app/entity/models/attributes.AttributeCollection}.
 * @param
 * {?(module:back4app/entity/models/methods.MethodCollection|
 * Object.<!string, !function>)}
 * methods The new entity specification methods. It can be given as an instance
 * of
 * {@link module:back4app/entity/models/methods.MethodCollection} or an
 * object, as specified in
 * {@link module:back4app/entity/models/methods.MethodCollection}.
 * @example
 * var entitySpecification = new EntitySpecification(
 *   new attributes.AttributeCollection({
 *     attribute1: new attributes.Attribute('attribute1'),
 *     attribute2: new attributes.Attribute('attribute2')
 *   }),
 *   new methods.MethodCollection({
 *     method1: function () { return 'method1'; },
 *     method2: function () { return 'method2'; }
 *   })
 * );
 */
/**
 * Class to specify an Entity.
 * @constructor
 * @memberof module:back4app/entity/models
 * @name EntitySpecification
 * @param {?Object} [specification] The new Entity specification.
 * @param
 * {?(module:back4app/entity/models/attributes.AttributeCollection|
 * module:back4app/entity/models/attributes.Attribute[]|
 * Object.<!string, !(module:back4app/entity/models/attributes.Attribute|
 * Object)>)}
 * [specification.attributes] The new entity specification attributes. It can be
 * given as an instance of
 * {@link module:back4app/entity/models/attributes.AttributeCollection} or an
 * object, as specified in
 * {@link module:back4app/entity/models/attributes.AttributeCollection}.
 * @param
 * {?(module:back4app/entity/models/methods.MethodCollection|
 * Object.<!string, !function>)}
 * [specification.methods] The new entity specification methods. It can be
 * given as an instance of
 * {@link module:back4app/entity/models/methods.MethodCollection} or an
 * object, as specified in
 * {@link module:back4app/entity/models/methods.MethodCollection}.
 * @example
 * var entitySpecification = new EntitySpecification({
 *   attributes: new attributes.AttributeCollection({
 *     attribute1: new attributes.Attribute('attribute1'),
 *     attribute2: new attributes.Attribute('attribute2')
 *   }),
 *   methods: new methods.MethodCollection({
 *     method1: function () { return 'method1'; },
 *     method2: function () { return 'method2'; }
 *   })
 * });
 */
function EntitySpecification() {
  /**
   * Collection of specific attributes of an entity.
   * @name module:back4app/entity/models.EntitySpecification#attributes
   * @type {!module:back4app/entity/models/attributes.AttributeCollection}
   * @readonly
   * @example
   * var entitySpecification = new EntitySpecification({
   *   attributes: new attributes.AttributeCollection({
   *     attribute1: new attributes.Attribute('attribute1'),
   *     attribute2: new attributes.Attribute('attribute2')
   *   }),
   *   methods: new methods.MethodCollection({
   *     method1: function () { return 'method1'; },
   *     method2: function () { return 'method2'; }
   *   })
   * });
   * console.log(
   *   entitySpecification.attributes.attribute1.name
   * ); // Logs "attribute1"
   */
  this.attributes = null;
  /**
   * Collection of specific methods of an entity.
   * @name module:back4app/entity/models.EntitySpecification#methods
   * @type {!module:back4app/entity/models/methods.MethodCollection}
   * @readonly
   * @example
   * var entitySpecification = new EntitySpecification({
   *   attributes: new attributes.AttributeCollection({
   *     attribute1: new attributes.Attribute('attribute1'),
   *     attribute2: new attributes.Attribute('attribute2')
   *   }),
   *   methods: new methods.MethodCollection({
   *     method1: function () { return 'method1'; },
   *     method2: function () { return 'method2'; }
   *   })
   * });
   * console.log(
   *   entitySpecification.methods.method1()
   * ); // Logs "method1"
   */
  this.methods = null;

  var _attributes = null;
  Object.defineProperty(this, 'attributes', {
    get: function () {
      return _attributes;
    },
    set: function () {
      throw new Error(
        'Attributes of an EntitySpecification instance cannot be changed'
      );
    },
    enumerable: true,
    configurable: false
  });

  var _methods = null;
  Object.defineProperty(this, 'methods', {
    get: function () {
      return _methods;
    },
    set: function () {
      throw new Error(
        'Methods of an EntitySpecification instance cannot be changed'
      );
    },
    enumerable: true,
    configurable: false
  });

  expect(arguments).to.have.length.below(
    3,
    'Invalid arguments length when creating a new EntitySpecification (it ' +
    'has to be passed less than 3 arguments)'
  );

  if (arguments.length === 1) {
    var specification = arguments[0];

    if (specification) {
      expect(specification).to.be.an(
        'object',
        'Invalid argument type when creating a new EntitySpecification (it ' +
        'has to be an object)'
      );

      for (var property in specification) {
        expect(['attributes', 'methods']).to.include(
          property,
          'Invalid property "' + property + '" when creating a new ' +
          'EntitySpecification (valid properties are "attributes" and ' +
          '"methods")'
        );
      }

      if (specification.attributes) {
        expect(typeof specification.attributes).to.equal(
          'object',
          'Invalid property "attributes" when creating a new ' +
          'EntitySpecification (it has to be an object)'
        );

        if (
          specification.attributes instanceof attributes.AttributeCollection
        ) {
          _attributes = specification.attributes;
        } else {
          _attributes = new attributes.AttributeCollection(
            specification.attributes
          );
        }
      }

      if (specification.methods) {
        expect(specification.methods).to.be.an(
          'object',
          'Invalid property "methods" when creating a new ' +
          'EntitySpecification (it has to be an object)'
        );

        if (specification.methods instanceof methods.MethodCollection) {
          _methods = specification.methods;
        } else {
          _methods = new methods.MethodCollection(
            specification.methods
          );
        }
      }
    }
  } else if (arguments.length > 1) {
    var attributesArgument = arguments[0];
    var methodsArgument = arguments[1];

    if (attributesArgument) {
      expect(typeof attributesArgument).to.equal(
        'object',
        'Invalid argument "attributes" when creating a new ' +
        'EntitySpecification (it has to be an object)'
      );

      if (attributesArgument instanceof attributes.AttributeCollection) {
        _attributes = attributesArgument;
      } else {
        _attributes = new attributes.AttributeCollection(
          attributesArgument
        );
      }
    }

    if (methodsArgument) {
      expect(methodsArgument).to.be.an(
        'object',
        'Invalid argument "methods" when creating a new EntitySpecification ' +
        '(it has to be an object)'
      );

      if (methodsArgument instanceof methods.MethodCollection) {
        _methods = methodsArgument;
      } else {
        _methods = new methods.MethodCollection(
          methodsArgument
        );
      }
    }
  } else {
    _attributes = new attributes.AttributeCollection();
    _methods = new methods.MethodCollection();
  }

  Object.preventExtensions(this);
  Object.seal(this);
}

/**
 * Adds a new attribute to the attributes in the specification.
 * @name module:back4app/entity/models.EntitySpecification#addAttribute
 * @function
 * @param {!module:back4app/entity/models/attributes.Attribute} attribute This
 * is the attribute to be added. It can be passed as a
 * {@link module:back4app/entity/models/attributes.Attribute} instance.
 * @param {?string} [name] This is the name of the attribute.
 */
/**
 * Adds a new attribute to the attributes in the specification
 * @name module:back4app/entity/models.EntitySpecification#addAttribute
 * @function
 * @param {!Object} attribute This is the attribute to be added. It can be
 * passed as an Object, as specified in
 * {@link module:back4app/entity/models/attributes.Attribute}.
 * @param {!string} [attribute.name] It is the name of the attribute. It is
 * optional if it is passed as an argument in the function.
 * @param {!string} [attribute.type='Object'] It is the type of the attribute.
 * It is optional and if not passed it will assume 'Object' as the default
 * value.
 * @param {!string} [attribute.multiplicity='1'] It is the multiplicity of the
 * attribute. It is optional and if not passed it will assume '1' as the default
 * value.
 * @param {?(boolean|number|string|Object|function)} [attribute.default] It is
 * the default expression of the attribute.
 * @param {?string} [name] This is the name of the attribute.
 */
/**
 * Adds a new attribute to the attributes in the specification.
 * @name module:back4app/entity/models.EntitySpecification#addAttribute
 * @function
 * @param {!string} name It is the name of the attribute.
 * @param {!string} [type='Object'] It is the type of the attribute. It is
 * optional and if not passed it will assume 'Object' as the default value.
 * @param {!string} [multiplicity='1'] It is the multiplicity of the attribute.
 * It is optional and if not passed it will assume '1' as the default value.
 * @param {?(boolean|number|string|Object|function)} [default] It is the default
 * expression of the attribute.
 */
EntitySpecification.prototype.addAttribute = function () {};

/**
 * Adds a new method to the methods in the specification.
 * @name module:back4app/entity/models.EntitySpecification#addMethod
 * @function
 * @param {!function} func This is the method's function to be added.
 * @param {!string} name This is the name of the method.
 */
EntitySpecification.prototype.addMethod = function (func, name) {};
