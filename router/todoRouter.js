const todo = require("express").Router();
const TodoModel = require("../model/TodoModel");

todo.get('/', function (res, res) {
    TodoModel.find().then(data => res.json(data))
      .catch(err => res.json(err));
  })

todo.post("/", (req, res) => {
  console.log(req.body);
  TodoModel.create({
    status: req.body.status,
    name: req.body.name,
    deadline: new Date(req.body.deadline),
  }).then( data => {
    res.json({mess: 'Thành Công'})
  })
  .catch( err => {
    res.json({mess: 'Thất bại', err})
  })
});

module.exports = todo;
