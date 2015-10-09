//
// Created by davimacedo on 09/10/15.
//

'use strict';

var chai = require('chai');
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var classes = require('../../../../../../src/back/utils/classes');
var Attribute = require(
  '../../../../../../src/back/models/attributes/Attribute'
);
var BooleanAttribute = require(
  '../../../../../../src/back/models/attributes/types/BooleanAttribute'
);

describe('BooleanAttribute', function () {
  var booleanAttribute;

  context('interface tests', function () {
    it('expect to not work without arguments', function () {
      expect(function () {
        booleanAttribute = new BooleanAttribute();
      }).to.throw(AssertionError);
    });

    it('expect to not work with null argument', function () {
      expect(function () {
        booleanAttribute = new BooleanAttribute(null);
      }).to.throw(AssertionError);
    });

    it('expect to not work with empty object', function () {
      expect(function () {
        booleanAttribute = new BooleanAttribute({});
      }).to.throw(AssertionError);
    });

    it('expect to work with right arguments passing as an object',
      function () {
        booleanAttribute = new BooleanAttribute({
          name: 'attribute'
        });

        booleanAttribute = new BooleanAttribute({
          name: 'attribute',
          default: null
        });

        booleanAttribute = new BooleanAttribute({
          name: 'attribute',
          multiplicity: '0..1'
        });


        booleanAttribute = new BooleanAttribute({
          name: 'attribute',
          multiplicity: '0..1',
          default: null
        });

      }
    );

    it('expect to work with right arguments passing as arguments',
      function () {
        booleanAttribute = new BooleanAttribute(
          'attribute'
        );

        booleanAttribute = new BooleanAttribute(
          'attribute',
          '0..1'
        );

        booleanAttribute = new BooleanAttribute(
          'attribute',
          '0..1',
          { propertyTest: 'justATest' }
        );
      }
    );

    it('expect to not work with wrong arguments', function () {
      expect(function () {
        booleanAttribute = new BooleanAttribute(
          'attribute',
          '0..1',
          null,
          null
        );
      }).to.throw(AssertionError);

      expect(function () {
        booleanAttribute = new BooleanAttribute(function () {});
      }).to.throw(AssertionError);

      expect(function () {
        booleanAttribute = new BooleanAttribute({
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        booleanAttribute = new BooleanAttribute({
          name: null,
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        booleanAttribute = new BooleanAttribute({
          name: 'attribute',
          multiplicity: '0..1',
          default: null,
          doesNotExist: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        booleanAttribute = new BooleanAttribute({
          name: 'attribute',
          type: 'Boolean',
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        booleanAttribute = new BooleanAttribute({
          name: 'attribute',
          multiplicity: null,
          default: null
        });
      }).to.throw(AssertionError);
    });
  });

  context('functional tests', function () {
    it('expect to be a specialization of Attribute', function () {
      expect(classes.isGeneral(Attribute, BooleanAttribute)).to.equal(true);

      expect(new BooleanAttribute('myBooleanAttribute'))
        .to.be.an.instanceof(Attribute);
    });

    it('expect to have all properties storing the right values', function () {
      expect(booleanAttribute).to.have.property('name')
        .that.equals('attribute');

      expect(booleanAttribute).to.have.property('type')
        .that.equals('Boolean');

      expect(booleanAttribute).to.have.property('multiplicity')
        .that.equals('0..1');

      expect(booleanAttribute).to.have.property('default')
        .that.deep.equals({ propertyTest: 'justATest'});
    });

    it('expect to be not extensible', function () {
      expect(Object.isExtensible(booleanAttribute)).to.equal(false);

      expect(function () {
        booleanAttribute.doesNotExist = {};
      }).to.throw(TypeError);

      expect(booleanAttribute).to.not.respondTo('doesNotExist');
    });

    it('expect to not allow to delete property', function () {
      expect(function () {
        delete booleanAttribute.name;
      }).to.throw(Error);

      expect(booleanAttribute).to.have.property('name')
        .that.equals('attribute');

      expect(function () {
        delete booleanAttribute.type;
      }).to.throw(Error);

      expect(booleanAttribute).to.have.property('type')
        .that.equals('Boolean');

      expect(function () {
        delete booleanAttribute.multiplicity;
      }).to.throw(Error);

      expect(booleanAttribute).to.have.property('multiplicity')
        .that.equals('0..1');

      expect(function () {
        delete booleanAttribute.default;
      }).to.throw(Error);

      expect(booleanAttribute).to.have.property('default')
        .that.deep.equals({ propertyTest: 'justATest' });
    });

    it('expect to not allow to change property', function () {
      expect(function () {
        booleanAttribute.name = 'will not change';
      }).to.throw(Error);

      expect(booleanAttribute).to.have.property('name')
        .that.equals('attribute');

      expect(function () {
        booleanAttribute.type = 'will not change';
      }).to.throw(Error);

      expect(booleanAttribute).to.have.property('type')
        .that.equals('Boolean');

      expect(function () {
        booleanAttribute.multiplicity = 'will not change';
      }).to.throw(Error);

      expect(booleanAttribute).to.have.property('multiplicity')
        .that.equals('0..1');

      expect(function () {
        booleanAttribute.default = 'will not change';
      }).to.throw(Error);

      expect(booleanAttribute).to.have.property('default')
        .that.deep.equals({ propertyTest: 'justATest' });
    });

    it('expect to have the right default values', function () {
      booleanAttribute = new BooleanAttribute('attributeName');

      expect(booleanAttribute.name).to.equal('attributeName');
      expect(booleanAttribute.type).to.equal('Boolean');
      expect(booleanAttribute.multiplicity).to.equal('1');
      expect(booleanAttribute.default).to.equal(null);
    });
  });
});
