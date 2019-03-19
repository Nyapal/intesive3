const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()
const Item = require('../models/item')

const sampleItem = {
  'name': 'iPhone',
  'desc': 'black iPhone 6'
}

chai.use(chaiHttp)

describe('Items', ()  => {

  // TEST INDEX
  it('should index ALL items on / GET', (done) => {
    chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.html
          done()
        })
  })

  // TEST NEW
  it('should display new form on /items/new GET', (done) => {
    chai.request(server)
      .get(`/items/new`)
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.html
          done()
        })
  })

  // TEST CREATE
  it('should create a SINGLE item on /items POST', (done) => {
    chai.request(server)
        .post('/items')
        .send(sampleItem)
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.html
          done()
        })
  })

  // TEST SHOW
  it('should show a SINGLE item on /items/<id> GET', (done) => {
    var item = new Item(sampleItem)
    item.save((err, data) => {
      chai.request(server)
        .get(`/items/${data._id}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.html
          done()
        })
    })
  })

  // TEST EDIT
  it('should edit a SINGLE item on /items/<id>/edit GET', (done) => {
    let item = new Item(sampleItem)
    item.save((err, data) => {
      chai.request(server)
        .get(`/items/${data._id}/edit`)
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.html
          done()
        })
    })
  })

  // TEST UPDATE
  it('should update a SINGLE item on /item/<id> PUT', (done) => {
    let item = new Item(sampleItem)
    item.save((err, data)  => {
     chai.request(server)
      .put(`/items/${data._id}?_method=PUT`)
      .send({'name': 'Updating the name'})
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.html
        done()
      })
    })
  })

  // TEST DELETE
  it('should delete a SINGLE item on /items/<id> DELETE', (done) => {
    let item = new Item(sampleItem)
    item.save((err, data) => {
      chai.request(server)
        .delete(`/items/${data._id}?_method=DELETE`)
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.html
          done()
        })

    })
  })

  after(() => {
    Item.deleteMany({name: 'iPhone'}).exec((err, items) => {
      console.log(items)
      items.remove()
    })
  })

})