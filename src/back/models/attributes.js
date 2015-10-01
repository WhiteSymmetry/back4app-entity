//
// Created by davimacedo on 30/09/15.
//

'use strict';

var expect = require('chai').expect;

/**
 * Contains base classes for Entity Attribute modeling.
 * @module back4app/entity/models/attributes
 */
module.exports = {};
module.exports.Attribute = Attribute;
module.exports.AttributeCollection = AttributeCollection;

/**
 * Holds an Entity Attribute information.
 * @constructor
 * @memberof module:back4app/entity/models/attributes
 */
function Attribute() {}

/**
 * Collection of Entity Attributes.
 * @constructor
 * @memberof module:back4app/entity/models/attributes
 * @param {?(module:back4app/entity/models/attributes.Attribute[]|
 * Object.<string, (module:back4app/entity/models/attributes.Attribute|
 * Object)>)}
 * [attributes] The attributes to be added in the collection. They can be given
 * as an Array or a Dictionary of
 * {@link module:back4app/entity/models/attributes.Attribute}.
 */
function AttributeCollection(attributes) {
  expect(arguments).to.have.length.below(2);

  if (attributes) {
    expect(attributes).to.be.an('object');

    if (attributes instanceof Array) {
      for (var i = 0; i < attributes.length; i++) {
        expect(attributes[i]).to.be.an('object');

        this.add(attributes[i]);
      }
    } else {
      for (var attribute in attributes) {
        expect(attributes[attribute]).to.be.an('object');

        this.add(attributes[attribute], attribute);
      }
    }
  }
}

/**
 * Adds a new attribute to the collection.
 * @name module:back4app/entity/models/attributes.AttributeCollection#add
 * @function
 * @param {!module:back4app/entity/models/attributes.Attribute} attribute This
 * is the attribute to be added. It can be passed as a
 * {@link module:back4app/entity/models/attributes.Attribute} instance.
 * @param {?string} [name] This is the name of the attribute.
 */
/**
 * Adds a new attribute to the collection.
 * @name module:back4app/entity/models/attributes.AttributeCollection#add
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
 * Adds a new attribute to the collection.
 * @name module:back4app/entity/models/attributes.AttributeCollection#add
 * @function
 * @param {!string} name It is the name of the attribute.
 * @param {!string} [type='Object'] It is the type of the attribute. It is
 * optional and if not passed it will assume 'Object' as the default value.
 * @param {!string} [multiplicity='1'] It is the multiplicity of the attribute.
 * It is optional and if not passed it will assume '1' as the default value.
 * @param {?(boolean|number|string|Object|function)} [default] It is the default
 * expression of the attribute.
 */
AttributeCollection.prototype.add = function () {
  expect(arguments).to.have.length.below(5);
};
