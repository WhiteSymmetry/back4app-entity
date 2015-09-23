'use strict';

var expect = require('chai').expect;
var Entity = require('../../../../src/back/models/Entity');

describe('Entity', function () {
  describe('.specify()', function () {
    it('expect to exist as a static method', function () {
      expect(Entity).itself.to.respondTo('specify');
    });
  });
});
