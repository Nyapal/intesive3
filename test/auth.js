// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const server = require("../app");
// const should = chai.should();
// chai.use(chaiHttp);

// // Agent that will keep track of our cookies
// const agent = chai.request.agent(server);

// const User = require("../models/user");

// describe("User", function() {
//   //LOGIN
//   it("should not be able to login if they have not registered", function(done) {
//     agent.post("/login", { email: "wrong@wrong.com", password: "nope" }).end(function(err, res) {
//       res.status.should.be.equal(401);
//       done();
//     });
//   });

//   //SIGNUP
//   it('should be able to signup', function(done) {
//     User.findOneAndRemove({ username: 'testSignUp'}, function() {
//       agent
//         .post('/sign-up')
//         .send({ username: 'testSignUp', password: 'pw'})
//         .end(function(err, res) {
//           console.log(res.body)
//           res.should.have.status(200);
//           agent.should.have.cookie('nToken')
//         done()
//       })
//     })
//   })

//   after(function () {
//     agent.close()
//   });
// })

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const should = chai.should();
chai.use(chaiHttp);

// Agent that will keep track of our cookies
const agent = chai.request.agent(server);

const User = require("../models/user");

describe("User", function() {
    it("should not be able to login if they have not registered", function(done) {
        agent.post("/login", { email: "wrong@wrong.com", password: "nope" }).end(function(err, res) {
          res.status.should.be.equal(401);
          done();
        });
      });
    
    // signup ****** broken ;( come back to me pls *********
    // it("should be able to signup", function(done) {
    //     User.findOneAndRemove({ username: "testone" }, function() {
    //     agent
    //         .post("/sign-up")
    //         .send({ username: "testone", password: "password" })
    //         .end(function(err, res) {
    //         console.log(res.body);
    //         res.should.have.status(200);
    //         agent.should.have.cookie("nToken");
    //         done();
    //         });
    //     });
    // });
    after(function () {
        agent.close()
      });
});