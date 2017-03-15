'use strict';

$(document).ready(function () {
  $("#add-todo").button({
    icons: { primary: "ui-icon-circle-plus" }
  }).click(function () {
    let input = $("#task");

    if (input.val().length > 0) {
      input.val("");
    }

    $("#new-todo").dialog("open");
  });

  $("#new-todo").dialog({
    modal: true,
    autoOpen: false,
    width: "fit-content",
    buttons: {
      "Add task": function () {
        let $task = $("#task");
        let taskName = $task.val();

        if (taskName === "") {
          $task.effect("highlight", 1000);
          return {};
        }

        let $newTask = $(
            `<li>
              <span class='done'>%</span>
              <span class='delete'>x</span>
              <span class='task'>${taskName}</span>
             </li>`
        );

        $("#todo-list").prepend($newTask);
        $newTask.hide().show("clip", 250).effect("highlight", 1000);

        $(this).dialog("close");
      },
      "Cancel": function () {
        $(this).dialog("close");
      }
    }
  });

  $("#todo-list").on("click", ".done", function () {
    let $taskItem = $(this).parent("li");
    $taskItem.slideUp(250, function () {
      let $this = $(this);
      $this.detach();
      $("#completed-list").prepend($this);
      $this.slideDown();
    });
  }).on("click", ".delete", function () {
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

  $(".sortable").sortable({
    connectWith: ".sortable",
    cursor: "pointer",
    placeholder: "ui-state-highlight",
    cancel: ".delete, .done"
  });
});
