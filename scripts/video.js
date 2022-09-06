const pass = () => {}

var category = 0;
var username = sessionStorage.getItem("username");
var mail = sessionStorage.getItem("mail");
var admin = sessionStorage.getItem("admin");
if(username != null && username.length > 2 && mail != null && mail.length > 2 && admin == "true"){
    pass();
}else{
    window.location.href = "index.html";
}

function choose(id, title, length){
    category = id;
    document.querySelector(`#category${id}`).innerHTML = `<u><b> ${title} </b></u>`;
    document.querySelector(`#category_inp`).value = id;
}


function loaded(){
    document.getElementById("LogOut").addEventListener("click", () => {
        localStorage.setItem("user_id", 0);
        localStorage.setItem("user_key", 0);
        window.location.href = "index.html";
    });

    fetch(`backend/categories/courses_show.php`)
                    .then(function(response) {
                        if (response.status >= 200 && response.status < 300) {
                            return response.text()
                        }
                        throw new Error(response.statusText)
                    })
                    .then(function(response) {
                            data = JSON.parse(response);
                            for(var i = 0; i < data.id.length; i++) {
                                document.querySelector("#categories").innerHTML += `<a  href="#" onclick="choose(${data.id[i].toString()}, '${data.title[i].toString()}', ${data.id.length})" id="category${data.id[i]}" class="categorie" style="width:fit-content; text-decoration: none;"> ${data.title[i]} </a> | `;
                            }
                        });
}