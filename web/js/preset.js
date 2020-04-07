$(document).ready(function () {
    console.log("ready!");
    setTimeout(function () {
        // console.log("Loading...");
        $("#loading").fadeTo("slow", 0);
    }, 2000);
    setTimeout(function () {
        console.log("Started");
        $("#loading").attr("hidden", true);
    }, 3000);
    document.addEventListener('contextmenu', event => {
        console.log("Forbidden!");
        event.preventDefault()
    });
    document.body.addEventListener('keydown', event => {
        // console.log(event.keyCode);
        if ((event.which || event.keyCode) == 116) {
            console.log("Forbidden!");
            event.preventDefault();
        }
        if (event.ctrlKey && (event.which || event.keyCode) == 82) {
            console.log("Forbidden!");
            event.preventDefault()
        }
        if (event.ctrlKey && event.shiftKey && (event.which || event.keyCode) == 74) {
            console.log("Forbidden!");
            event.preventDefault()
        }
        if (event.ctrlKey && (event.which || event.keyCode) == 74) {
            console.log("Forbidden!");
            event.preventDefault()
        }
        if (event.ctrlKey && (event.which || event.keyCode) == 83) {
            console.log("Forbidden!");
            event.preventDefault()
        }
        if (event.ctrlKey && (event.which || event.keyCode) == 73) {
            console.log("Forbidden!");
            event.preventDefault()
        }
    });
});