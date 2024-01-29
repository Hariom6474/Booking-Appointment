async function getFormValue(e) {
  e.preventDefault();
  let name = e.target.name.value;
  let email = e.target.email.value;
  let phone = e.target.phone.value;
  let myObj = {
    name: name,
    email: email,
    phone: phone,
  };
  try {
    const add = await axios.post("http://localhost:5000/user/add-user", myObj);
    // console.log(add);
    // console.log(myObj);
    myObj = add.data;
    showUserOnScreen(myObj);
  } catch (err) {
    console.log(err);
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
  li.setAttribute("data-item-id", myObj.id);
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
    let appointmentId = myObj.id;
    if (li && appointmentId) {
      deleteUser(appointmentId, li);
    }
  });
  editBtn.onclick = (e) => {
    let li = e.target.closest("li");
    const editingItemId = myObj.id;
    document.getElementById("name").value = myObj.name;
    document.getElementById("email").value = myObj.email;
    document.getElementById("phone").value = myObj.phone;
    // deleteUser(editingItemId, li);
    updateListItemText(editingItemId, myObj, li);
  };
  // e.target.reset();
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}

async function deleteUser(appointmentId, li) {
  try {
    const del = await axios.delete(
      `http://localhost:5000/user/delete-user/${appointmentId}`
    );
    if (del) {
      removeUserFromScreen(li);
    } else {
      console.log("delete userId not found");
    }
  } catch (err) {
    console.log(err);
  }
}

function removeUserFromScreen(li) {
  li.parentNode.removeChild(li);
}

function updateListItemText(itemId, myObj, li) {
  const editingItemId = itemId;
  document.getElementById("name").value = myObj.name;
  document.getElementById("email").value = myObj.email;
  document.getElementById("phone").value = myObj.phone;
  deleteUser(editingItemId, li);
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get("http://localhost:5000/user/get-user");
    console.log(res.data);
    for (let i = 0; i < res.data.length; i++) {
      showUserOnScreen(res.data[i]);
    }
  } catch (err) {
    console.error(err);
  }
});
