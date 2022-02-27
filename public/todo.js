console.log(3000);

$("#add").on("click", function () {
  const name = $("#name").val();
  const deadline = $("#deadline").val();
  const status = $("#status").val();
  // console.log(name, deadline, status);

  $.ajax({
    type: "POST",
    url: "/todo",
    data: {
      name: name,
      deadline: deadline,
      status: status,
    },
  })
    .then((data) => {
      console.log(data);
      render();
      $("#close").trigger("click");
    })
    .catch((err) => console.log(err));
});

render();

function render() {
  $.ajax({
    url: "/todo",
    type: "GET",
  })
    .then((data) => {
      $("#todo").html("");
      $("#doing").html("");
      $("#done").html("");
      data.map((item, value) => {
        let div = `
      <tr>
        <td ><h5>${item.name}</h5></td>
        <td>${item.deadline}</td>
        <td class = 'listsua'>
        <button type="button" id="update${value}" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        <i class="fa-solid fa-wrench"></i>
        </button>
          <button id="delete${value}" class = "delete"><i class="fa-solid fa-delete-left"></i></button>
        </td>
      </tr>
      `;

        $(`#${item.status}`).append(div);

        $("#delete" + value).data("out", item);
        $("#delete" + value).on("click", function () {
          // console.log(this);
          out($(this).data("out"));
        });

        $("#update" + value).data("update", item);
        $("#update" + value).on("click", function () {
          // console.log(this);
          update($(this).data("update"));
        });
      });
    })
    .catch((err) => console.log(err));
}

function out(item) {
  $.ajax({
    url: `/todo/${item._id}`,
    type: "DELETE",
  })
    .then((data) => {
      $("#todo").html("");
      $("#doing").html("");
      $("#done").html("");
      // console.log(data)
      render();
    })
    .catch((err) => console.log(err));
}

function update(item) {
  $("#up").on("click", function () {
    const nameup = $("#nameup").val();
    const deadlineup = $("#deadlineup").val();
    const statusup = $("#statusup").val();
    console.log(nameup, deadlineup, statusup);

    $.ajax({
      type: "PUT",
      url: `/todo/put/${item._id}`,
      data: {
        name: nameup,
        deadline: deadlineup,
        status: statusup,
      },
    })
      .then((data) => {
        $(`#${item.status}`).html("");
        $("tr").html("");
        $("#nameup").val("");
        $("#deadlineup").val("");
        $("#tat").trigger("click");
        render();
      })
      .catch((err) => console.log(err));
  });
}
