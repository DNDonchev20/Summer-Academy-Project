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
    var mail = document.querySelector("#mail").value;
    var pass = document.querySelector("#pass").value;

    document.querySelectorAll(".error")[0].innerHTML = "";
    document.querySelectorAll(".error")[1].innerHTML = "";

    document.getElementById("generalError").style.display = "none";


    if(mail.length > 5 && mail.length < 45 && mail.includes("@") && mail.includes(".")){
        if(pass.length > 5 && pass.length < 40 && !pass.includes("!") && !pass.includes("$") && !pass.includes("&") && !pass.includes("+") && !pass.includes("-")){
            fetch(`backend/login.php?mail=${mail}&pass=${pass}`)
                    .then(function(response) {
                        if (response.status >= 200 && response.status < 300) {
                            return response.text()
                        }
                        throw new Error(response.statusText)
                    })
                    .then(function(response) {
						console.log(response);
                            data = JSON.parse(response);
                            if(data.msg){
                                document.getElementById("generalError").style.display = "block";
                                document.getElementById("generalError").innerHTML = data.msg;
                            }else{
                                let nameUser = data.data.user_id;
                                let userKey = data.data.user_key;
                                localStorage.setItem("user_id", nameUser);
                                localStorage.setItem("user_key", userKey);
                                window.location.href = "./index.html";
                            }
                        });
        }else{
            document.querySelectorAll(".error")[1].innerHTML = "Въведете парола. Паролата ви не може да съдържа: !, $, &, +, -";
        }
    }else{
        document.querySelectorAll(".error")[0].innerHTML = "Въведете валиден E-Mail адрес";
    }
});
