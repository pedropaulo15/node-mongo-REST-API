const expect = require('expect');
const request = require('supertest');
const { ObjectId } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [{
  _id: new ObjectId(),
  text: 'First test todo'
}, {
  _id: new ObjectId(),
  text: 'Second test todo'
}]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then (() => {
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

        Todo.find({text}).then((todos) => {
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
          expect(todos.length).toBe(2);
          // Finish the execution of the code.
          done();
        }).catch((e) => {
          done(e);
        })
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`) // converting the todo ID from int to String, in order to pass it in the URL
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return a 404 if todo not found', (done) => {
    const id = new ObjectId().toHexString();
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
   });
 
   it('should return 404 for non-object ids', (done) => {
     request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
   });
});

describe('DELETE /todos/:id', () => {
  it('should DELETE todo by ID', (done) => {
    const id = todos[0]._id.toHexString();
    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(id);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        // Make sure the id was actually deleted by trying to fetch the data after it was already deleted.
        Todo.findById(id).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return a 404 if todo not found', (done) => {
    const id = new ObjectId().toHexString();
    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object IDs', (done) => {
    request(app)
     .delete('/todos/123')
     .expect(404)
     .end(done);
  });
});
