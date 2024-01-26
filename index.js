var editingItemId = null;
function getFormValue(e) {
  e.preventDefault();
  let name = e.target.name.value;
  let email = e.target.email.value;
  let phone = e.target.phone.value;
  let myObj = {
    name: name,
    email: email,
    phone: phone,
  };
  if (editingItemId) {
    axios
      .put(
        `https://crudcrud.com/api/1378906cc4124c9496bdc6dbd9dc7551/appointmentData/${editingItemId}`,
        myObj
      )
      .then((response) => {
        console.log(response.data);
        updateListItemText(editingItemId, myObj);
        editingItemId = null;
      })
      .catch((err) => console.error(err));
  } else {
    axios
      .post(
        "https://crudcrud.com/api/1378906cc4124c9496bdc6dbd9dc7551/appointmentData",
        myObj
      )
      .then((response) => {
        showUserOnScreen(myObj);
        console.log(response.data);
      })
      .catch((err) => console.error(err));
  }
}

function showUserOnScreen(myObj) {
  let elem = JSON.stringify(myObj);
  let ulist = document.querySelector(".list-group");
  let li = document.createElement("li");
  let button = document.createElement("input");
  var editBtn = document.createElement("input");
  editBtn.type = "button";
  editBtn.value = "editBtn";
  editBtn.value = "Edit";
  button.type = "button";
  button.value = "Delete";
  button.id = "myButton";
  li.setAttribute("data-item-id", myObj._id);
  li.appendChild(
    document.createTextNode(`${myObj.name} - ${myObj.email} - ${myObj.phone}`)
  );
  li.appendChild(button);
  li.appendChild(editBtn);
  li.className = "list-group-items";
  if (ulist) {
    ulist.appendChild(li);
  }
  button.addEventListener("click", function (e) {
    let li = e.target.closest("li");
    let appointmentId = myObj._id;
    if (li && appointmentId) {
      axios
        .delete(
          `https://crudcrud.com/api/1378906cc4124c9496bdc6dbd9dc7551/appointmentData/${appointmentId}`
        )
        .then((res) => ulist.removeChild(li))
        .catch((err) => console.error(err));
    }
  });
  editBtn.onclick = (e) => {
    let li = e.target.closest("li");
    editingItemId = myObj._id;
    // if (li) {
    //   axios
    //     .delete(
    //       `https://crudcrud.com/api/1378906cc4124c9496bdc6dbd9dc7551/appointmentData/${editingItemId}`
    //     )
    //     .then((res) => ulist.removeChild(li))
    //     .catch((err) => console.error(err));
    document.getElementById("name").value = myObj.name;
    document.getElementById("email").value = myObj.email;
    document.getElementById("phone").value = myObj.phone;
    // }
  };
  // e.target.reset();
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}

function updateListItemText(itemId, myObj) {
  let ulist = document.querySelector(".list-group");
  let li = ulist.querySelector(`[data-item-id="${itemId}"]`);
  if (li) {
    li.textContent = `${myObj.name} - ${myObj.email} - ${myObj.phone}`;
  }
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/1378906cc4124c9496bdc6dbd9dc7551/appointmentData"
    )
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        showUserOnScreen(response.data[i]);
      }
      console.log(response.data);
    })
    .catch((err) => console.error(err));
});
