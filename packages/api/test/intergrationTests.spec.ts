import apiApp from "../src/index";
import { expect, assert } from "chai";
import chai from 'chai';
import chaiHttp from 'chai-http';
let should = chai.should();

chai.use(chaiHttp);
// Not working yet 

describe("API connection test", () => {

  it("should successfully call api", (done) => {

    // Need to handle chai type error below
    // Also need to add event for DB connection so we know to proceed with tests
    chai.request(apiApp)
        .get('/')
        .end((err, res) => {
              res.should.have.status(200);
          done();
        });
    expect(2).to.equal(2);
  });

});

export {};