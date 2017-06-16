// $(function() {
//     $('.toggler').click(function() {
//         $(this).find('div').slideToggle();
//     });
// });

function stackDown(){
    document.getElementById("f1_container").style.zIndex = "-1";
}

function stackUp(){
    document.getElementById("f1_container").style.zIndex = "1";
}


function displayProjectModal() {
    document.getElementById("jsTest").style.display = "block";
}

function hideProjectModal() {
    document.getElementById("jsTest").style.display = "none";
}