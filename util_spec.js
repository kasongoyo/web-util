(() => {
    'use strict';

    //dependencies
    const chai = require('chai');
    const expect = chai.expect;
    const faker = require('faker');
    const Helpers = require('./util');


    describe('Helpers', function () {

        describe('Parse Query Function', function () {

            it('should parse id query params to mongodb friendly', function () {
                const query = { id: faker.random.uuid() };
                const actual = Helpers.parseQuery({ query }).conditions;
                const expected = { _id: query.id };
                expect(expected).to.eql(actual);
            });


            it('should parse fields key successfully', function () {
                const query = { id: faker.random.uuid(), fields: `${faker.random.word()},${faker.random.word()}` };
                const actual = Helpers.parseQuery({ query }).fields;
                const expected = query.fields.split(',')[0];
                expect(actual).to.contain(expected);
            });


            it('should parse query string successfully', function () {
                const query = { id: faker.random.uuid(), name: faker.name.firstName() };
                const actual = Helpers.parseQuery({ query }).conditions;
                expect(actual).to.have.all.keys('_id', 'name');
            });
        });

    });

})();