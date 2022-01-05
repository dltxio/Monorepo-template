const chai = require("chai");


describe("Unit tests", () => {

  it("should successfully do math", () => {
    const number: number = 1 + 1;

    chai.expect(2).to.equal(number);
})

});
