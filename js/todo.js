'use strict';

$(document).ready(function () {
  // The button for adding a task and the event listener on it
  $("#add-todo").button({
    icons: { primary: "ui-icon-circle-plus" }
  }).click(function () {
    let title = $("#task-title");
    let description = $("#task-description");

    if (title.val().length > 0) {
      title.val("");
    }

    if (description.val().length > 0) {
      description.val("");
    }

    // the dialog for new task items
    let $newTodo = $("#new-todo").dialog({
      modal: true,
      autoOpen: false,
      width: "fit-content",
      buttons: {
        "Add task": function () {
          let $taskTitle = $("#task-title");
          let taskTitle = $taskTitle.val();

          if (taskTitle === "") {
            $taskTitle.effect("highlight", 1000);
            return {};
          }

          let $taskDescription = $("#task-description");
          let taskDescription = $taskDescription.val();

          let $newTask = $(
              `<li class="task-item">
              <span class='done'>%</span>
              <span class='task'>${taskTitle}</span>
              <div class="edit-n-delete">
                <span class='edit'>r</span>
                <span class='delete'>x</span>
              </div>
              <div class="description">
                <p>${taskDescription}</p>
              </div>
            </li>
            `
          );

          $newTask.children(".description").hide();

          $("#todo-list").prepend($newTask);
          $newTask.hide().show("clip", 250).effect("highlight", 1000);

          $(this).dialog("close");
        },
        "Cancel": function () {
          $(this).dialog("close");
        }
      }
    });

    $newTodo.dialog("open");
  });

  // ======== only for todo-list =============
  $("#todo-list").on("click", ".done", function () {
    // the event listener on done button
    let $taskItem = $(this).parent("li");
    $taskItem.slideUp(250, function () {
      let $this = $(this);
      $this.detach();
      $("#completed-list").prepend($this);
      $this.slideDown();
    });

  }).on("click", ".edit", function () {
    // the event listener on edit button

    let $taskItem = $(this).parent("li");
    let title = $taskItem.children(".task").val();
    console.log(title);  // FIXME undefined
    $("#new-todo #task-title").val(title);
    let description = $taskItem.children(".description").val();
    console.log(description);  // FIXME undefined
    $("#new-todo #task-description").val(description);

    let $editTodo = $("#new-todo").dialog({
      modal: true,
      autoOpen: false,
      width: "fit-content",
      title: "Update todo",
      buttons: {
        "Update": function () {
          let $taskTitle = $("#task-title");
          let taskTitle = $taskTitle.val();

          if (taskTitle === "") {
            $taskTitle.effect("highlight", 1000);
            return {};
          }

          let $taskDescription = $("#task-description");
          let taskDescription = $taskDescription.val();

          let $newTask = $(
              `<li class="task-item">
              <span class='done'>%</span>
              <span class='task'>${taskTitle}</span>
              <div class="edit-n-delete">
                <span class='edit'>r</span>
                <span class='delete'>x</span>
              </div>
              <div class="description">
                <p>${taskDescription}</p>
              </div>
            </li>
            `
          );

          $newTask.children(".description").hide();

          $("#todo-list").prepend($newTask);
          $newTask.hide().show("clip", 250).effect("highlight", 1000);

          $(this).dialog("close");
        },
        "Cancel": function () {
          $(this).dialog("close");
        }
      }
    });

    $editTodo.dialog("open");


  });

  // ============= for both lists ===============
  $(".sortable").on("click", ".task", function () {
    // the event listener on task title to toggle description
    let $description = $(this).parent("li").children(".description");
    $description.slideToggle();


  }).on("click", ".delete", function () {
    // the event listener on delete button
    let $taskItem = $(this).parent("li");
    let taskName = $taskItem.children(".task").text();

    let dialog = $(
        `<div id='confirm-deletion' title='Confirm deletion'>
          <p>
            <span class='ui-icon ui-icon-alert'></span>
            Do you want to delete ${taskName}</span>
          </p>
        </div>`
    );

    dialog.dialog({
      modal: true,
      autoOpen: false,
      width: "fit-content",
      buttons: {
        "Confirm": function () {
          $(this).dialog("close");

          $taskItem.effect("puff", function () {
            $(this).remove();
          });
        },
        "Cancel": function () {
          $(this).dialog("close");
        }
      }
    });

    dialog.dialog("open");
  });

  // making all task items sortable
  $(".sortable").sortable({
    connectWith: ".sortable",
    cursor: "pointer",
    placeholder: "ui-state-highlight",
    cancel: ".delete, .done, .edit"
  });
});
