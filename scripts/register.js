var ssPass = false;
document.querySelector("#showHidePass").addEventListener("click", () => {
    ssPass = !ssPass;
    if(ssPass){
        document.querySelector("#showHidePass").innerHTML = '<a title="HIDE PASSWORD"><i class="fa-solid fa-eye-slash"></i></a>';
        document.querySelector("#pass").type = "text";
    }else{
        document.querySelector("#showHidePass").innerHTML = '<a title="SHOW PASSWORD"><i class="fa-solid fa-eye"></i></a>';
        document.querySelector("#pass").type = "password";
    }
});

document.querySelector("button").addEventListener("click",  () => {
    var name = document.querySelector("#name").value;
    var mail = document.querySelector("#mail").value;
    var pass = document.querySelector("#pass").value;

    document.querySelectorAll(".error")[0].innerHTML = "";
    document.querySelectorAll(".error")[1].innerHTML = "";
    document.querySelectorAll(".error")[2].innerHTML = "";

    if(name.length > 5 && name.length < 40){
            if(mail.length > 5 && mail.length < 45 && mail.includes("@") && mail.includes(".")){
                if(pass.length > 5 && pass.length < 40 && !pass.includes("!") && !pass.includes("$") && !pass.includes("&") && !pass.includes("+") && !pass.includes("-")){
                    document.querySelector("#generalError").style.display = "none";
                    fetch(`./backend/register.php?name=${name}&mail=${mail}&pass=${pass}`)
                        .then(function(response) {
                            if (response.status >= 200 && response.status < 300) {
                                return response.text()
                            }
                            throw new Error(response.statusText)
                        })
                        .then(function(response) {
                                data = JSON.parse(response);
                                console.log(data.err);
                                if(data.err){
                                    document.querySelector("#generalError").style.display = "block";
                                    document.querySelector("#generalError").innerHTML = `${data.err}`;
                                } else {
                                    let userKey = data.user_key;
                                    let userId = data.user_id;
                                    localStorage.setItem("user_id", userId);
                                    localStorage.setItem("user_key", userKey);
                                    window.location.href = "./index.html";
                                }
                        })
                    }else{
                        document.querySelectorAll(".error")[2].innerHTML = "Въведете валина парола, с минимална дължина от 6 знака и максимална от 40, паролата може да съдържа: Букви, Цифри, Специални символи(без: &, !, $, -, +)";
                    }
            }else{
                document.querySelectorAll(".error")[1].innerHTML = "Въведете валиден E-MAIL адрес";
            }
    }else{
        document.querySelectorAll(".error")[0].innerHTML = "Въведете валидно име (по-дълго от 5)";
    }
});