console.log(3000);

$("#add").on("click", function () {
  const name = $("#name").val();
  const deadline = $("#deadline").val();
  const status = $("#status").val();
  console.log(name, deadline, status);

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
      console.log(data)
      render()
      $('#close').trigger('click')
    })
    .catch((err) => console.log(err));
});

function render(){
  $.ajax({
    url: "/todo",
    type: "GET",
  })
    .then((data) => {
      $('.todo').html('')
      $('.doing').html('')
      $('.done').html('')
      data.map((item) => {
        let div = `
      <tr>
        <td>${item.name}</td>
        <td>${item.deadline}</td>
        <td>
          <button>...</button>
          <button onclick = 'out(${item})')>X</button>
        </td>
      </tr>
      `;
        $(`.${item.status}`).append(div);
      });
    })
    .catch((err) => console.log(err));
}

function Delete(item){
  console.log('Được',item);
}


render()