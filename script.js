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

$(document).mouseup(function(e)
{
    var container = $(document.getElementById("proj1"));

    // If the click target is neither the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
        container.hide();
    }
});

$(document).mouseup(function(e)
{
    var container = $(document.getElementById("proj2"));

    // If the click target is neither the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
        container.hide();
    }
});

$(document).mouseup(function(e)
{
    var container = $(document.getElementById("proj3"));

    // If the click target is neither the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
        container.hide();
    }
});

$(document).mouseup(function(e)
{
    var container = $(document.getElementById("proj4"));

    // If the click target is neither the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
        container.hide();
    }
});

$(document).mouseup(function(e)
{
    var container = $(document.getElementById("proj5"));

    // If the click target is neither the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
        container.hide();
    }
});

$(document).mouseup(function(e)
{
    var container = $(document.getElementById("proj6"));

    // If the click target is neither the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
        container.hide();
    }
});