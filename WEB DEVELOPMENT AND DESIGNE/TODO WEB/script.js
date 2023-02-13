
// LOCAL STORAGE
const itemArry = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []

// THIS IS FOR USER TO SET YOUR OWN NAME
function UserName() {
    const nameInput = document.querySelector("#name");
    const username = localStorage.getItem('username') || ''

    nameInput.value = username;

    nameInput.addEventListener('change', (e) => {
        localStorage.setItem('username', e.target.value)
    })
}

// THIS SHOW CURRENT DATE 
function DisplayDate() {
    let date = new Date()
    date = date.toString().split(" ")
    // console.log(date)
    document.querySelector('#date').innerHTML = date[1] + " " + date[2] + " " + date[3]
}


//CREATE A NEW ITEM AND PUSH THE LOACL STORAGE
document.querySelector('#enter').addEventListener('click', () => {
    const item = document.querySelector("#item")
    createitem(item)

})

function createitem(item) {
    itemArry.push(item.value)
    localStorage.setItem("items", JSON.stringify(itemArry))
    location.reload()
}

//THIS IS MODEL OF SHOWING ITEM IN TODO LIST AND THIS GONE LOOP
function DisplayItem() {
    let items = ""
    for (let i = 0; i < itemArry.length; i++) {
        items += ` 
        <div class="item">
            <div class="input_controller">
            <textarea disabled>${itemArry[i]}</textarea>
                <div class="edit_controller">
                    <input type="checkbox" id="checkbox" >
                    <i class="fa-solid fa-pen-to-square editBtn"></i>
                    <i class="fa-solid fa-trash delBtn"></i>
                </div>
            </div>
            <div class="update_controller">
                <button class="saveBtn">Save</button>
                <button class="cancelBtn">Cancel</button>
            </div>
        </div>
        
        `
    }
    document.querySelector(".to_do_list").innerHTML = items
    DelteListeners()
    EditListerers()
    SaveListerners()
    CancelListerners()
}



//WHEN USER CLICK CHECKBOX THEY GOT ITEM CHECK MEANS COMPLETE
function taskComplete() {
    const tasks = document.querySelectorAll(".item");

    tasks.forEach((task, i) => {
        task.addEventListener("change", () => {
            if (task.querySelector("input[type='checkbox']").checked) {
                task.style.background = "#0de00dcc";
                task.style.textDecoration = "line-through";
                localStorage.setItem("taskComplete_" + i, JSON.stringify({
                    state: "checked",
                    background: "green"
                }));
            } else {
                task.style.background = "inherit";
                task.style.textDecoration = "none";
                localStorage.removeItem("taskComplete_" + i);
            }
        });
    });

    tasks.forEach((task, i) => {
        const savedState = JSON.parse(localStorage.getItem("taskComplete_" + i));
        if (savedState && savedState.state === "checked") {
            task.querySelector("input[type='checkbox']").checked = true;
            task.style.background = savedState.background;
            task.style.textDecoration = "line-through";
        }
    });
}


//DELET ITEM FORM THE LSIT
function DelteListeners() {
    let delBtn = document.querySelectorAll(".delBtn");
    delBtn.forEach((db, i) => {
        db.addEventListener("click", () => { deleteItem(i) })
    })
}

function deleteItem(i) {
    itemArry.splice(i, 1)
    localStorage.setItem("items", JSON.stringify(itemArry))
    location.reload()
}

// EDIT ITEM FORM THE LIST 
function EditListerers() {
    const editBtn = document.querySelectorAll(".editBtn")
    const update_controller = document.querySelectorAll(".update_controller")
    const inputs = document.querySelectorAll(".input_controller  textarea")

    editBtn.forEach((eb, i) => {
        eb.addEventListener("click", () => {
            update_controller[i].style.display = "block"
            inputs[i].disabled = false;
        })
    })
}

// WHEN USER EDIT THE ITEM AND CLICK SAVE BUTTON 
function SaveListerners() {
    const saveBtn = document.querySelectorAll(".saveBtn")
    const inputs = document.querySelectorAll(".input_controller  textarea")

    saveBtn.forEach((sb, i) => {
        sb.addEventListener("click", () => {
            updateItem(inputs[i].value, i);
        })
    })
}

function updateItem(text, i) {
    itemArry[i] = text
    localStorage.setItem("items", JSON.stringify(itemArry))
    location.reload()
}

// WHEN USER EDIT THE ITEM THEY I AM NOT GONE CHANGE THIS ITEM THERE IS CANCEL BUTTON TO ABORT
function CancelListerners() {
    const cancelBtn = document.querySelectorAll(".cancelBtn")
    const update_controller = document.querySelectorAll(".update_controller")
    const inputs = document.querySelectorAll(".input_controller  textarea")

    cancelBtn.forEach((cb, i) => {
        cb.addEventListener("click", () => {
            update_controller[i].style.display = "none"
            inputs[i].disabled = true;
        })
    })
}



//SEARCH TODOS FORM YOUR ITEM
let searchTextBox = document.getElementById("search")
searchTextBox.addEventListener("input", () => {
    let itemList = document.querySelectorAll(".item")
    Array.from(itemList).forEach(function (item) {
        let searchText = item.getElementsByTagName("textarea")[0].innerText
        let searchTextVal = searchTextBox.value;
        let re = RegExp(searchTextVal, 'gi')
        if (searchText.match(re)) {
            item.style.display = "block"
        }
        else {
            item.style.display = "none"
        }
    })
})




window.onload = function () {
    UserName()
    DisplayDate()
    DisplayItem()
    taskComplete()
}
