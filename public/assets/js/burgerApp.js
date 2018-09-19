$(document).ready(function () {
    clickDevourItButtonListener();
    clickAddBurgerButtonListener();
    clickDeleteAllBurgersButtonListener();
});

function clickDevourItButtonListener() {
    $(".btn-devourit").on("click", function (event) {
        event.preventDefault();
        var customername = $(".customer").val();
        var id = $(this).data("burgerid");
        console.log("burgerId: " + id);
        var newDevoured = true;
        var newDevouredState = {
            devoured: newDevoured,
            customername: customername
          };
       
        // Send the PUT request.
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevouredState
          }).then(
            function() {
              console.log("changed devoured to", newDevoured);
              // Reload the page to get the updated list
              location.reload();
            }
          );
    });
}

function clickAddBurgerButtonListener() {
    $("#addBurger").on("click", function (event) {
        event.preventDefault();
        var name = $("[name=burger-name]").val().trim();

         // Form validation
    function validateForm() {
        var isValid = true;
         if (name === "") {
            isValid = false;
          }
          return isValid;
      };

      if(validateForm()){
        var newBurger = {
            burger_name: name
        };

        // Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                location.reload();
            }
        );
    }
    else{
        $("#burger-name-error").text("Blank Burger Name is not allowed!!");
    }
    });


}

function clickDeleteAllBurgersButtonListener(){
    $("#delete-all").on("click", function (event) {
        event.preventDefault();

        $.ajax("/api/burgers/", {
            type: "DELETE"
        }).then(function() {
            // Reload the page to get the updated list
            location.reload();
        });
    });
}
