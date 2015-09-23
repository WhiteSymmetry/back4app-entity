//
// Created by davimacedo on 22/09/15.
//

'use strict';

var chai = require('chai');
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var classes = require('../../../../src/back/utils/classes');

describe('classes', function () {
  describe('generalization', function () {
    context('interface tests', function () {
      it('expect to exist as an inner method', function () {
        expect(classes).to.respondTo('generalization');
      });

      it('expect to work with functions', function () {
        classes.generalization(function () {}, function () {});
      });

      it('expect to throw AssertionError with objects', function () {
        expect(function () {
          classes.generalization({}, {});
        }).to.throw(AssertionError);

        expect(function () {
          classes.generalization(function () {}, {});
        }).to.throw(AssertionError);
      });
    });

    context('functional tests', function () {
      var GeneralClass;
      var SpecificClass;
      var g;
      var s;

      it('expect to run without error', function () {
        GeneralClass = function (ga1, ga2) {
          var g = this;

          g.ga1 = ga1;
          g.ga2 = ga2;
        };

        GeneralClass.prototype.gm1 = function () {
          return 'gm1';
        };

        GeneralClass.prototype.gm2 = function () {
          return 'gm2';
        };

        GeneralClass.gsa1 = 'gsa1';
        GeneralClass.gsa2 = 'gsa2';

        GeneralClass.gsm1 = function () {
          return 'gsm1';
        };

        GeneralClass.gsm2 = function () {
          return 'gsm2';
        };

        SpecificClass = function (ga1, ga2, sa) {
          var s = this;

          GeneralClass.call(s, ga1, ga2);

          s.sa = sa;
        };

        classes.generalization(SpecificClass, GeneralClass);

        SpecificClass.prototype.gm1 = function () {
          return 'sm1';
        };

        SpecificClass.prototype.sm = function () {
          return 'sm';
        };

        SpecificClass.gsa1 = 'ssa1';
        SpecificClass.ssa = 'ssa';

        SpecificClass.gsm1 = function () {
          return 'ssm1';
        };

        SpecificClass.ssm = function () {
          return 'ssm';
        };

        g = new GeneralClass('ga1', 'ga2');
        s = new SpecificClass('sa1', 'sa2', 'sa');
      });

      it(
        'expect instances to be of correct types',
        function () {
          expect(s).to.be.an.instanceof(SpecificClass);
          expect(s).to.be.an.instanceof(GeneralClass);
          expect(g).to.be.an.instanceof(GeneralClass);
        }
      );

      it(
        'expect attributes to be correctly inherited',
        function () {
          expect(g).to.have.property('ga1')
            .that.equals('ga1');
          expect(g).to.have.property('ga2')
            .that.equals('ga2');

          expect(s).to.have.property('ga1')
            .that.equals('sa1');
          expect(s).to.have.property('ga2')
            .that.equals('sa2');
          expect(s).to.have.property('sa')
            .that.equals('sa');
        }
      );

      it(
        'expect instance methods to be correctly inherited',
        function () {
          expect(g.gm1()).to.equal('gm1');
          expect(g.gm2()).to.equal('gm2');

          expect(s.gm1()).to.equal('sm1');
          expect(s.gm2()).to.equal('gm2');
          expect(s.sm()).to.equal('sm');
        }
      );

      it(
        'expect static attributes to be correctly inherited',
        function () {
          expect(GeneralClass).to.have.property('gsa1')
            .that.equals('gsa1');
          expect(GeneralClass).to.have.property('gsa2')
            .that.equals('gsa2');

          expect(SpecificClass).to.have.property('gsa1')
            .that.equals('ssa1');
          expect(SpecificClass).to.have.property('gsa2')
            .that.equals('gsa2');
          expect(SpecificClass).to.have.property('ssa')
            .that.equals('ssa');
        }
      );

      it(
        'expect static methods to be correctly inherited',
        function () {
          expect(GeneralClass.gsm1()).to.equal('gsm1');
          expect(GeneralClass.gsm2()).to.equal('gsm2');

          expect(SpecificClass.gsm1()).to.equal('ssm1');
          expect(SpecificClass.gsm2()).to.equal('gsm2');
          expect(SpecificClass.ssm()).to.equal('ssm');
        }
      );
    });
  });
});
