const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

beforeEach((done) => {
  Todo.remove({}).then(() => {
    done();
  });
});

describe('POST /todos', () => {
  // The done() method is a callback that makes the request async
  it('should create a new todo', (done) => {
    const text = 'Test todo test';

    request(app)
      .post('/todos') // path URL
      .send({text}) // content
      .expect(200) // request status
      .expect((res) => { // response content
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          // done() method finish the execution of the code
          // in case there is an error.
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          // Finish the execution of the code.
          done();
        }).catch((e) => {
          done(e);
        })
      });
  });

  it('should not create todo with invalid body data', (done) => {

    request(app)
      .post('/todos') // path URL
      .send({}) // content
      .expect(400) // request status
      .end((err, res) => {
        
        if (err) {
          // done() method finish the execution of the code
          // in case there is an error.
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(0);
          // Finish the execution of the code.
          done();
        }).catch((e) => {
          done(e);
        })
      });
  });
});