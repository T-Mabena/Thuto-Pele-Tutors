var loader = document.querySelector(".loader")
function loading() {
    loader.style.display = 'none'
}

const Login = () => {

        let email = document.querySelector("#email-el").value;
        let password = document.querySelector("#pass").value;
    
        if(email === "" || password === ""){
            let html = `
                <div class="alert alert-dismissible fade show alert-danger" role="alert">
                    <button class="btn-close" type="button" data-bs-dismiss="alert" aria-label="close"></button>
                    <strong>Please Fill in your cridentials!!!</strong>
                </div>
                `

                document.querySelector('.msge').innerHTML += html;

                return false;
        }
        // const fb = new FormData()
        // fb.append("Email", email)
        // fb.append("Password", password)
        const data = [{
            Email: email,
            Password: password
        }]

        const options = {
            method: 'POST',
            headers: {'Content-type': 'application/JSON'},
            body: JSON.stringify(data)
        }

        fetch('/api/auth/tutor/login', options)
        .then(res => {return res.json()})
        .then(info => {

            let userid = info.id;
            let token = info.token;
    
            if(info.code !== 40){
                let html = `
                <div class="alert alert-dismissible fade show alert-danger" role="alert">
                    <button class="btn-close" type="button" data-bs-dismiss="alert" aria-label="close"></button>
                    <strong>${info.message}</strong>
                </div>
                `

                document.querySelector('.msge').innerHTML += html;
            }
            else{
                location.href = '/tutor/home' +'/'+ userid +'/'+ token;
            }
        })
    
        document.querySelector("#pass").value = "";


        //loader.style.display = 'block'
    
        // auth.signInWithEmailAndPassword(email, password)
        // .then((results) => {
        // var user = results.user;
        //     location.href = "tutor-home.html"
       
        // })
        // .catch((error) => {
        //     swal("Error",error,"error")
        //     loader.style.display = 'none'
        //     swal("Error",error,"error")
        // });

    
}