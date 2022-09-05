const pass = () => {}

var username = sessionStorage.getItem("username");
var mail = sessionStorage.getItem("mail");
if(username != null && username.length > 2 && mail != null && mail.length > 2){
    pass();
}else{
    window.location.href = "index.html";
}

function videos(course_id, title, description, keywords, date, views, thumbnail){
    document.querySelector("#catalog").innerHTML = `<div><a href="#" >title: ${title} </a>| description: ${description} | keywords: ${keywords} | date: ${date} | views: ${views} <br> <img height="100px" width="100px" src="assets/videos/${thumbnail}"></div>`;
    fetch(`backend/categories/videos.php?course_id=${course_id}`)
                    .then(function(response) {
                        if (response.status >= 200 && response.status < 300) {
                            return response.text()
                        }
                        throw new Error(response.statusText)
                    })
                    .then(function(response) {
                        document.querySelector("#videos").innerHTML = "";
                            data = JSON.parse(response);
                            for(var i = 0; i < data.title.length; i++) {
                                document.querySelector("#videos").innerHTML += `<div id='videos${i}'>title: ${data.title[i]} | description: ${data.description[i]} | <br> <video height="150px" src="assets/videos/${data.path[i]}" controls></div>`;
                            }
                        });
}


function load(id){
    document.querySelector("#videos").innerHTML = "";
    fetch(`backend/categories/courses.php?category_id=${id}`)
                    .then(function(response) {
                        if (response.status >= 200 && response.status < 300) {
                            return response.text()
                        }
                        throw new Error(response.statusText)
                    })
                    .then(function(response) {
                        document.querySelector("#catalog").innerHTML = "";
                            data = JSON.parse(response);
                            for(var i = 0; i < data.id.length; i++) {
                                document.querySelector("#catalog").innerHTML += `<div id="catalog${i}"><a href="#" onclick="videos(${data.id[i].toString()}, '${(data.title[i]).toString()}', '${(data.description[i]).toString()}', '${(data.keywords[i]).toString()}', '${(data.date[i]).toString()}', '${(data.views[i]).toString()}', '${(data.thumbnail[i]).toString()}')">title: ${data.title[i]} </a>| description: ${data.description[i]} | keywords: ${data.keywords[i]} | date: ${data.date[i]} | views: ${data.views[i]} <br> <img height="100px" width="100px" src="assets/videos/${data.thumbnail[i]}"></div>`;
                            }
                        });
}

function loaded(){
    document.getElementById("LogOut").addEventListener("click", () => {
        localStorage.setItem("user_id", 0);
        localStorage.setItem("user_key", 0);
        window.location.href = "index.html";
    });
    fetch(`backend/categories/categories.php`)
                    .then(function(response) {
                        if (response.status >= 200 && response.status < 300) {
                            return response.text()
                        }
                        throw new Error(response.statusText)
                    })
                    .then(function(response) {
                            data = JSON.parse(response);
                            for(var i = 0; i < data.id.length; i++) {
                                document.querySelector("#categories").innerHTML += `<a href="#" onclick="load(${data.id[i].toString()})" id="${data.id[i]} class="categorie" style="width:fit-content;">${data.title[i]} | </a>`;
                            }
                        });
}