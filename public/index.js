const url = "https://blogpost-dori.onrender.com"



setInterval(() => {
    window.location.reload();
    alert("5 minute passed");
}, 5 * 60 * 1000);

const form = document.getElementById("form");
form.setAttribute("action", url + "/submit");

//Patch Function
function patchFunction(user_id, titleText, bodyText) {
    return fetch(url + "/users/" + user_id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: titleText,
            body: bodyText,
        }),
    })
        .then((res) => {
            if (!res.ok) throw Error();
            return res.json();
        })
        .catch((err) => console.log(err));
}

//Put Function
function putFunction(user_id, titleText, bodyText) {
    return fetch(url + "/users/" + user_id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: titleText,
            body: bodyText,
        }),
    })
        .then((res) => {
            if (!res.ok) throw Error();
            return res.json();
        })
        .catch((err) => console.log(err));
}

//Edit Function
function editFunction(user_id) {
    //selecting elements
    const parentDiv = document.getElementById(user_id);
    const titleChild = parentDiv.querySelector("h2");
    const bodyChild = parentDiv.querySelector("p");
    const editChild = parentDiv.querySelector(".editable");
    editChild.remove();

    //saving inner text
    const savedTitle = titleChild.innerText;
    const savedBody = bodyChild.innerHTML;

    //making content editable and changing apperence
    //making editable
    titleChild.setAttribute("contenteditable", "true");
    bodyChild.setAttribute("contenteditable", "true");

    //changing appearence
    titleChild.setAttribute("class", "change");
    bodyChild.setAttribute("class", "change");

    //Creating element
    const saveButton = document.createElement("button");
    const cancelButton = document.createElement("button");

    //Setting the text of the element
    saveButton.innerText = "Save";
    cancelButton.innerText = "Cancel";

    //Adding Event Listners
    cancelButton.addEventListener("click", () => {
        titleChild.removeAttribute("contenteditable");
        bodyChild.removeAttribute("contenteditable");

        titleChild.removeAttribute("class");
        bodyChild.removeAttribute("class");

        cancelButton.remove();
        saveButton.remove();

        titleChild.innerText = savedTitle;
        bodyChild.innerText = savedBody;
        parentDiv.append(editChild);
    });

    saveButton.addEventListener("click", () => {
        const titleInnerText = titleChild.innerText;
        const bodyInnerText = bodyChild.innerText;

        if (savedBody !== bodyInnerText && titleInnerText !== savedTitle)
            putFunction(user_id, titleInnerText, bodyInnerText);
        else if (savedBody === bodyInnerText && titleInnerText === savedTitle) {
        } else patchFunction(user_id, titleInnerText, bodyInnerText);

        titleChild.removeAttribute("contenteditable");
        bodyChild.removeAttribute("contenteditable");

        titleChild.removeAttribute("class");
        bodyChild.removeAttribute("class");

        cancelButton.remove();
        saveButton.remove();

        parentDiv.append(editChild);
    });

    //Appending elements
    parentDiv.append(cancelButton);
    parentDiv.append(saveButton);
}

//Delete Function
function deleteFunction(user_id) {
    return fetch(url + "/users/" + user_id, {
        method: "DELETE",
    })
        .then((res) => {
            if (!res.ok) throw Error();
            return;
        })
        .then(() => {
            const id_name = document.getElementById(user_id);
            id_name.remove();
        })
        .catch((err) => console.log(err));
}

//Get Function
function getFunction() {
    return fetch(url + "/users")
        .then((res) => {
            if (!res.ok) throw Error();
            return res.json();
        })
        .then((data) => {
            if (data.valueExist === false) return;

            const users = data.userList;

            //Aquiring main div to attach
            const mainDiv = document.getElementById("post-here");

            for (let key in users) {
                //creating required elements
                const innerDiv = document.createElement("div");
                const titleElement = document.createElement("h2");
                const bodyElement = document.createElement("p");
                const editButton = document.createElement("button");
                const deleteButton = document.createElement("button");

                //setting the attribute for the required element
                innerDiv.setAttribute("class", "hosting-div");
                innerDiv.setAttribute("id", key);
                editButton.setAttribute("class", "editable");
                deleteButton.setAttribute("class", "deletable");

                //Setting innerHTML
                titleElement.innerHTML = users[key].title;
                bodyElement.innerHTML = users[key].body;
                editButton.innerHTML = "Edit";
                deleteButton.innerHTML = "Delete";

                //Appending elements
                mainDiv.append(innerDiv);
                innerDiv.append(titleElement);
                innerDiv.append(bodyElement);
                innerDiv.append(deleteButton);
                innerDiv.append(editButton);

                //EventListners for custom functionality
                editButton.addEventListener("click", () => editFunction(key));
                deleteButton.addEventListener("click", () =>
                    deleteFunction(key)
                );
            }
        })
        .catch((err) => console.error(err));
}

getFunction();
