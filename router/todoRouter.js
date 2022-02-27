const todo = require("express").Router();
const TodoModel = require("../model/TodoModel");

todo.get('/', function (res, res) {
    TodoModel.find().then(data => res.json(data))
      .catch(err => res.json(err));
  })

todo.post("/", (req, res) => {
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

todo.delete("/:id", (req,res) => {
  TodoModel.deleteOne({_id: req.params.id})
  .then(data => { res.json({mess: 'Delete Thành Công'})})
  .catch(err => { res.json({mess: 'Delete Lỗi'})})
})

todo.put("/put/:id", (req, res) => {
  // console.log(req.body);
  TodoModel.updateOne({_id: req.params.id},{
    status: req.body.status,
    name: req.body.name,
    deadline: new Date(req.body.deadline),
  }).then( data => {
    res.json({mess: 'Update Thành Công'})
  })
  .catch( err => {
    res.json({mess: 'Update lỗi', err})
  })
});

module.exports = todo;
