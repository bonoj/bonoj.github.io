function displayProjectModal(projectId) {
    switch(projectId) {
    case 1:
        document.getElementById("proj1").style.display = "block";
        break;
    case 2:
        document.getElementById("proj2").style.display = "block";
        break;
    case 3:
        document.getElementById("proj3").style.display = "block";
        break;
    case 4:
        document.getElementById("proj4").style.display = "block";
        break;
    case 5:
        document.getElementById("proj5").style.display = "block";
        break;
    case 6:
        document.getElementById("proj6").style.display = "block";
        break;
    }
}

function hideProjectModal(projectId) {
    switch(projectId) {
    case 1:
        document.getElementById("proj1").style.display = "none";
        break;
    case 2:
        document.getElementById("proj2").style.display = "none";
        break;
    case 3:
        document.getElementById("proj3").style.display = "none";
        break;
    case 4:
        document.getElementById("proj4").style.display = "none";
        break;
    case 5:
        document.getElementById("proj5").style.display = "none";
        break;
    case 6:
        document.getElementById("proj6").style.display = "none";
        break;
    }
}
