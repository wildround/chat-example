let socket = io.connect('http://localhost:8080');
const username = prompt("Enter username:");

$("form").submit(e => {
    e.preventDefault();
    if (!$("#message").val()) return false;
    socket.emit("chat message", { 
        name: username || "Anonimus", 
        msg: $("#message").val() 
    });
    $("#message").val("");
    return false;
});

socket.on("chat message", data => {
    if (data.name === username) {
        $("#messages").append($("<li>").addClass("myself").addClass("name").text(`${data.name}:`));    
        $("#messages").append($("<li>").addClass("myself").text(`${data.msg}`));    
    } else {
        $("#messages").append($("<li>").addClass("name").text(`${data.name}:`));    
        $("#messages").append($("<li>").addClass("").text(`${data.msg}`));   
        // $("#messages").append($("<li>").text(`${data.name}: ${data.msg}`));
    }
});
