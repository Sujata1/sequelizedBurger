$(document).ready(function () {
    clickAddBurgerButtonListener();
    clickDeleteAllBurgersButtonListener();
});


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

        if (validateForm()) {
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
        else {
            $("#burger-name-error").text("Blank Burger Name is not allowed!!");
        }
    });


}

function clickDeleteAllBurgersButtonListener() {
    $("#delete-all").on("click", function (event) {
        event.preventDefault();

        $.ajax("/api/burgers/", {
            type: "DELETE"
        }).then(function () {
            // Reload the page to get the updated list
            location.reload();
        });
    });
}
