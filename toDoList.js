var app = (function() {
      var addButtonElement = document.getElementById("addButton");
      var itemDescriptionElement = document.getElementById("ItemDescription");
      var toDoListElement = document.getElementById("toDoList");

      var item = (function() {
        var id = 0;
        return function(description, toggleDone) {
          this.id = id++;
          this.description = description;
          this.checked = toggleDone;
        };
      })();

      var toDoList = (function() {
        var itemsList = [];
        return {
          loadItems: function() {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                itemsList = JSON.parse(this.responseText);
                itemsList.forEach(function(element) {
                  toDoList.addItem(element.description, element.checked);
                });
              }
            };
            xhttp.open("GET", "/data/items.json", true);
            xhttp.send();
          },

          addItem: function(description, toggleDone) {
            //Create new item and add to the model
            var newItem = new item(description, toggleDone);
            itemsList.push(newItem);
            //Add to the view
            var itemElement = createItemElement(newItem.id, newItem.description, toggleDone);
            toDoListElement.appendChild(itemElement);
            //Clear the text-box
            itemDescriptionElement.value = "";
          },

          removeItem: function(id) {
            var itemSelected = document.getElementById("item" + id);
            //Remove from the model
            itemsList.forEach(function(element, index) {
              if (element.id == id) {
                itemsList.splice(index, 1);
              }
            });
            //Remove from the view
            toDoListElement.removeChild(itemSelected);
          },

          toggleDone: function(id) {
            var itemSelectedText = document.getElementById("descriptionText" + id);
            itemsList.forEach(function(element, index) {
              if (element.id == id) {
                if (element.checked) {
                  //Model
                  element.checked = false;
                  //View
                  itemSelectedText.setAttribute("class", "");
                } else {
                  //Model
                  element.checked = true;
                  //View
                  itemSelectedText.setAttribute("class", "item-selected");
                }
              }
            });
          }
        };
      })();

      //Create the HTML structure for the items
      function createItemElement(id, desciption, toggleDone) {
        //<li id="item#">
        var itemElement = document.createElement("li");
        itemElement.setAttribute("id", "item" + id);

        //<div class="div-description">
        var itemDescriptioncontainerElement = document.createElement("div");
        itemDescriptioncontainerElement.setAttribute("class", "description");

        //<span id="descriptiontext#"> Text </span></div>
        var descriptionText = document.createElement("span");
        descriptionText.setAttribute("id", "descriptionText" + id);
        descriptionText.appendChild(document.createTextNode(desciption));
        itemDescriptioncontainerElement.appendChild(descriptionText);
        itemElement.appendChild(itemDescriptioncontainerElement);

        //<div class="div-actions">
        var actionscontainerElement = document.createElement("div");
        actionscontainerElement.setAttribute("class", "actions");

        //<imput type="checkbox">
        var checkboxElement = document.createElement("input");
        checkboxElement.setAttribute("type", "checkbox");
        if (toggleDone) {
          checkboxElement.checked = true;
          descriptionText.setAttribute("class", "item-selected");
        }

        checkboxElement.addEventListener("click", function(e) {
          toDoList.toggleDone(id);
        });
        actionscontainerElement.appendChild(checkboxElement);

        //<imput type="button" class="delete-button"></div></li>
        var deleteButtonElement = document.createElement("button");
        deleteButtonElement.appendChild(document.createTextNode("DEL"));
        deleteButtonElement.setAttribute("class", "delete-button");
        deleteButtonElement.addEventListener("click", function(e) {
          toDoList.removeItem(id);
        });
        actionscontainerElement.appendChild(deleteButtonElement);
        itemElement.appendChild(actionscontainerElement);
        return itemElement;
      }

      toDoList.loadItems();

      function sendDescriptionValue() {
        if (itemDescriptionElement.value.length) {
          toDoList.addItem(itemDescriptionElement.value, false);
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
      };
})();
