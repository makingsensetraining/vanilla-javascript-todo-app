var addButtonElement = document.getElementById("addButton");
var itemDescriptionElement = document.getElementById("ItemDescription");
var toDoListElement = document.getElementById("toDoList");

var item = (function() {
  var id = 0;

  return function(description) {
    this.id = id++;
    this.description = description;
    this.checked = false;
  }

})();

var toDoList = (function() {
  var itemsList = [];

  return {
    addItem: function(description) {
      //Create new item and add to the model
      var newItem = new item(description);
      itemsList.push(newItem);
      //Add to the view
      var itemElement = createItemElement(newItem.id, newItem.description);
      toDoListElement.appendChild(itemElement);
      //Clear the text-box
      itemDescriptionElement.value = "";
    },

    removeItem: function(id) {
      var itemSelected = document.getElementById("item" + id);
      //Remove from the model
      for (var i = 0; i < itemsList.length; i++) {
        if (itemsList[i].id == id) {
          itemsList.splice(i, 1);
        }
      }
      //Remove from the view
      toDoListElement.removeChild(itemSelected);
    },

    toggleDone: function(id) {
      var itemSelectedText = document.getElementById("descriptionText" + id);

      for (var i = 0; i < itemsList.length; i++) {
        if (itemsList[i].id == id) {
          if (itemsList[i].checked) {
            //Model
            itemsList[i].checked = false;
            //View
            itemSelectedText.setAttribute("class", "");
          } else {
            //Model
            itemsList[i].checked = true;
            //View
            itemSelectedText.setAttribute("class", "item-selected");
          }
        }
      }
    }
  }
})();

//Create the HTML structure for the items
function createItemElement(id, desciption) {
  //<li id="item#">
  var itemElement = document.createElement("li");
  itemElement.setAttribute("id", "item" + id);

  //<div class="div-description" id="divDescription#">
  var itemDescriptioncontainerElement = document.createElement("div");
  itemDescriptioncontainerElement.setAttribute("class", "div-description")
  itemDescriptioncontainerElement.setAttribute("id", "divDescription" + id);

  //<span id="descriptiontext#"> Text </span></div>
  var descriptionText = document.createElement("span");
  descriptionText.setAttribute("id", "descriptionText" + id);
  descriptionText.appendChild(document.createTextNode(desciption));
  itemDescriptioncontainerElement.appendChild(descriptionText);

  itemElement.appendChild(itemDescriptioncontainerElement);

  //<div class="div-actions">
  var actionscontainerElement = document.createElement("div");
  actionscontainerElement.setAttribute("class", "div-actions")

  //<imput type="checkbox" name="checkItem" id="checkbox#" onclick="toDoList.toggleDone(#)">
  var checkboxElement = document.createElement("input");
  checkboxElement.setAttribute("type", "checkbox");
  checkboxElement.setAttribute("name", "checkItem");
  var idCheckbox = "checkbox" + id;
  checkboxElement.setAttribute("id", idCheckbox);
  checkboxElement.setAttribute("onclick", "toDoList.toggleDone(" + id + ")");
  actionscontainerElement.appendChild(checkboxElement);

  //<imput type="button" name="deleteButton" class="delete-button" value="DEL" id="deleteButton#" onclick="todoList.removeItem(#)"></div></li>
  var deleteButtonElement = document.createElement("input");
  deleteButtonElement.setAttribute("name", "deleteButton");
  deleteButtonElement.setAttribute("type", "button");
  deleteButtonElement.setAttribute("class", "delete-button");
  deleteButtonElement.setAttribute("value", "DEL");
  var idDeleteButton = "deleteButton" + id;
  deleteButtonElement.setAttribute("id", idDeleteButton);
  deleteButtonElement.setAttribute("onclick", "toDoList.removeItem(" + id + ")");
  actionscontainerElement.appendChild(deleteButtonElement);

  itemElement.appendChild(actionscontainerElement);

  return itemElement;
}

function sendDescriptionValue() {
  if (itemDescriptionElement.value.length != 0) {
    toDoList.addItem(itemDescriptionElement.value);
  }
}

//Add event to Enter key up
itemDescriptionElement.addEventListener("keyup", function(event) {
  if (event.keyCode == 13) {
    sendDescriptionValue();
  }
});

//Add function for onclick event
addButtonElement.onclick = function() {
  sendDescriptionValue();
}
