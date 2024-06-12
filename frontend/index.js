const API_ID = "c1c53aab9b6b4fbda7207cd16b3b2b86";

const addBtn = document.getElementById("add-btn");

const listBox = document.getElementById("list");

document.addEventListener("DOMContentLoaded", async () => {
  let res = await getAllData();
  console.log(res);
  for (let item of res) {
    let expenseAmount = item.amount;
    let description = item.description;
    let category = item.category;
    let _id = item.id;

    addListItem(expenseAmount, description, category, _id);
  }
});

addBtn.addEventListener("click", async () => {
  console.log("here");

  //Get Values
  let expenseAmount = document.getElementById("exp-amount").value;
  let description = document.getElementById("desc").value;
  let category = document.getElementById("category").value;

  //Adding to database
  let res = await postData(expenseAmount, description, category);

  //adding to html
  addListItem(expenseAmount, description, category, res.id);
});

listBox.addEventListener("click", async (e) => {
  if (e.target.classList.contains("del-btn")) {
    console.log("del-btn clicked");
    let parent = e.target.parentElement;
    await deleteData(parent.getAttribute("_id"));
    listBox.removeChild(parent);
  } else if (e.target.classList.contains("edit-btn")) {
    let parent = e.target.parentElement;
    let parentId = parent.getAttribute("_id");

    let vars = prompt("Add Amount, Description and Group separated by space");
    if (vars == null) return;
    vars = vars.split(" ");
    listBox.removeChild(parent);
    await putData(vars[0], vars[1], vars[2], parentId);
    addListItem(vars[0], vars[1], vars[2], parentId);
    console.log("edit-btn clicked");
  }
});

async function postData(amount, desc, cat) {
  try {
    let res = await axios.post(`http://localhost:4000`, {
      amount: amount,
      description: desc,
      category: cat,
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

async function getAllData() {
  try {
    let Data = await axios.get(`http://localhost:4000/`);
    console.log(Data.data);
    return Data.data;
  } catch (e) {
    console.log(e);
  }
}

async function deleteData(id) {
  try {
    await axios.delete(`http://localhost:4000/${id}`);
  } catch (e) {
    console.log(e);
  }
}

async function putData(amount, desc, cat, _id) {
  try {
    await axios.put(`http://localhost:4000/${_id}`, {
      amount: amount,
      description: desc,
      category: cat,
    });
  } catch (e) {
    console.log(e);
  }
}

function addListItem(amount, desc, cat, _id) {
  //Add to List
  let amountNode = document.createTextNode(amount + " - ");
  let descriptionNode = document.createTextNode(desc + " - ");
  let categoryNode = document.createTextNode(cat + " ");

  //Delete Btn
  let deleteBtnNode = document.createElement("button");
  let deleteBtnText = document.createTextNode("Delete");
  deleteBtnNode.classList.add("del-btn", "btn", "btn-danger");
  deleteBtnNode.appendChild(deleteBtnText);

  //Edit Btn
  let editBtnNode = document.createElement("button");
  let editBtnText = document.createTextNode("Edit");
  editBtnNode.classList.add("edit-btn", "btn", "btn-secondary");
  editBtnNode.appendChild(editBtnText);

  //Creating List Item & append
  let listItem = document.createElement("li");
  listItem.appendChild(amountNode);
  listItem.appendChild(descriptionNode);
  listItem.appendChild(categoryNode);
  listItem.appendChild(editBtnNode);
  listItem.appendChild(deleteBtnNode);

  listItem.setAttribute("_id", _id);
  document.getElementById("list").appendChild(listItem);
}
