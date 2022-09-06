const username = sessionStorage.getItem("username");
const mail = sessionStorage.getItem("mail");
const classes = ['pr', 'f', 'h', 'ph', 'b', 'c', 's'];
const docTitle = ' - Важните умения за живота, на които не те учат в училище - +умения';
let title = '';

if(!username || !mail) {
    //window.location.href = "index.html";
	document.querySelector('.logout').style.display = 'none';
} else {
	document.querySelectorAll('.login-reg').forEach((e) => {e.style.display = 'none'});
}

function on_load(){
    document.getElementById('user').innerText = 'Здравей ' + username;
    //payed = sessionStorage.getItem('payed');
    //if(payed == "true"){
    //    document.getElementById('paypal-button-container').style.display = 'none';
    //    document.getElementById('is_payed').innerHTML = "You are payed user";
    //}
    document.getElementById("LogOut").addEventListener("click", () => {
        localStorage.setItem("username", 0);
        localStorage.setItem("mail", 0);
        localStorage.setItem("user_id", 0);
        localStorage.setItem("user_key", 0);
		document.querySelector('.logout').style.display = 'block';
		document.querySelectorAll('.login-reg').forEach((e) => {e.style.display = 'block'});
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
                   document.querySelector("#categories").innerHTML += `
						<div class="category category-${classes[i]}"
							onclick="load_courses(${data.id[i].toString()}, '${data.title[i]}')" id="${data.id[i]}">
							<span>${data.title[i]}</span>
						</div>
					`;
               }
           });
}

function load_courses(id, title){
	document.title = title + docTitle;
	document.querySelector('#home').style.display = 'none';
    document.querySelector("#videos-container").style.display = "none";
	document.querySelector('#spinner').style.display = 'block';
	document.querySelector('#back-btn').style.display = 'block';
	document.querySelector('#back-btn').onclick = () => {
		document.title = 'Начало' + docTitle;
		document.querySelector("#courses-container").style.display = "none";
		document.querySelector('#home').style.display = 'block';
		document.querySelector('#back-btn').style.display = 'none';
	};
    fetch(`backend/categories/courses.php?category_id=${id}`)
        .then(function(response) {
            if (response.status >= 200 && response.status < 300)
                return response.text()
            throw new Error(response.statusText)
        })
        .then(function(response) {
			document.querySelector('#spinner').style.display = 'none';
                data = JSON.parse(response);
				document.querySelector('#courses-container').style.display = 'block';
				document.querySelector('#courses-title').innerHTML = title;
				document.querySelector("#courses").innerHTML = '';
                for (let i = 0; i < data.id.length; i++) {
                    document.querySelector("#courses").innerHTML += `
						<div class="course" onclick="load_lessons(${data.id[i].toString()}, '${(data.title[i]).toString()}', '${(data.description[i]).toString()}', '${title}')">
							<img src="./assets/thumbnails/${data.thumbnail[i]}">
							<h3>${data.title[i]}</h3>
							<span class="description">${data.description[i]}</span>
						</div>
					`;
					// , '${(data.keywords[i]).toString()}', '${(data.date[i]).toString()}', '${(data.likes[i]).toString()}', '${(data.thumbnail[i]).toString()}'

					/*
                    document.querySelector("#categories").innerHTML += `
						<div id="catalog${i}">
							<a href="#" onclick="videos(${data.id[i].toString()}, '${(data.title[i]).toString()}', '${(data.description[i]).toString()}', '${(data.keywords[i]).toString()}', '${(data.date[i]).toString()}', '${(data.likes[i]).toString()}', '${(data.thumbnail[i]).toString()}')">title: ${data.title[i]}
							</a>
							| description: ${data.description[i]}
							| keywords: ${data.keywords[i]}
							| date: ${data.date[i]}
							| likes: ${data.likes[i]}
							<br>
							<img height="100px" width="100px" src="assets/videos/${data.thumbnail[i]}">
						</div>`;
						*/
                }
        });
}

function load_lessons(course_id, title, description, categoryTitle){
	document.title = title + docTitle;
    document.querySelector("#courses-container").style.display = "none";
	document.querySelector('#spinner').style.display = 'block';
	document.querySelector('#back-btn').onclick = () => {
		document.title = categoryTitle + docTitle;
		document.querySelector("#videos-container").style.display = "none";
		document.querySelector('#courses-container').style.display = 'block';
		document.querySelector('#back-btn').onclick = () => {
			document.querySelector("#courses-container").style.display = "none";
			document.querySelector('#back-btn').style.display = 'none';
			document.querySelector('#home').style.display = 'block';
		};
	};
	title = title;
	videos = [];
    fetch(`backend/categories/videos.php?course_id=${course_id}&user_id=${localStorage.getItem("user_id")}`)
                    .then(function(response) {
                        if (response.status >= 200 && response.status < 300) {
                            return response.text()
                        }
                        throw new Error(response.statusText)
                    })
                    .then(function(response) {
						videos = [];
						document.querySelector('#spinner').style.display = 'none';
						document.querySelector('#videos-container').style.display = 'block';
						//document.querySelector("#videos").innerHTML = '';
                            data = JSON.parse(response);
                            for(var i = 0; i < data.title.length; i++) {
								videos.push({title: data.title[i], description: data.description[i], path: data.path[i]});
								if (i === 0) {
									document.querySelector("#videos-container").innerHTML = `
										<div id="video-container">
   										    <h1>${title}</h1>
											<div id="video">
												<video src="assets/videos/${data.path[i]}" controls>
											</div>
   										    <h3>${data.title[i]}</h3>
   										    <p class="description">${data.description[i]}</p>
   										 </div>
										 <div id="videos"></div>
										`;
									continue;
								}

                                document.querySelector("#videos").innerHTML += `
									<div class="video">
										<a class="title" onclick="load_video(${i})" class="title">${i+1}: ${data.title[i]}</a>
										<div class="description">${data.description[i]}</div>
									</div>`;
                            }
                        });
}

function load_video(index) {
    document.querySelector("#videos-container").innerHTML = `
		<div id="video-container">
   		    <h1>${title}</h1>
			<div id="video">
				<video src="assets/videos/${videos[index].path}" controls>
			</div>
			<h3>${videos[index].title}</h3>
   		    <p class="description">${videos[index].description}</p>
   		 </div>
		 <div id="videos"></div>
		`;

	for (let i = 0; i < videos.length; i++) {
		if (i == index)
			continue;

        document.querySelector("#videos").innerHTML += `
			<div class="video">
				<a class="title" onclick="load_video(${i})" class="title">${i+1}: ${data.title[i]}</a>
				<div class="description">${data.description[i]}</div>
			</div>`;
	}
}

/*
paypal.Buttons({
    // Sets up the transaction when a payment button is clicked
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: '0.01' // Can also reference a variable or function
          }
        }]
      });
    },
    // Finalize the transaction after payer approval
    onApprove: (data, actions) => {
      return actions.order.capture().then(function(orderData) {
        fetch(`backend/transaction.php?user_id=${localStorage.getItem("user_id")}`)
                    .then(function(response) {
                        if (response.status >= 200 && response.status < 300) {
                            return response.text()
                        }
                        throw new Error(response.statusText)
                    })
                    .then(function(response) {
                            data = JSON.parse(response);
                            if(data.status == "fine"){
                                alert("ПЛАЩАНЕТО Е УСПЕШНО");
                                window.location.href = "index.html";
                            }else{
                                alert("ГРЕШКА ПРИ ПЛАЩАНЕТО");
                            }
                        });
      });
    }
  }).render('#paypal-button-container');
  */
