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
    buttons: {
      "Add task": function () {
        let taskName = $("#task").val();

        if (taskName === "") {
          return false;
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

});
