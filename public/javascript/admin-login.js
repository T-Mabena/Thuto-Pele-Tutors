var loader = document.querySelector(".loader")
function loading() {
    loader.style.display = 'none'
}

const login = () => {

    let email = document.querySelector("#email-el").value
    let password = document.querySelector("#pass-el").value

    let data = {
        Email: email,
        Password: password
    }

    //loader.style.display = 'block'

    fetch('/api/admin/login', {
        method: 'POST',
        headers: { "Content-type": "application/JSON" },
        body: JSON.stringify(data)
    })
    .then(info => { return info.json() })
    .then(results => {
        let userid = results.id;
        let token = results.token;

        if(results.code !== 40){
            let html = `
            <div class="alert alert-dismissible fade show alert-danger" role="alert">
                <button class="btn-close" type="button" data-bs-dismiss="alert" aria-label="close"></button>
                <strong>${results.message}</strong>
            </div>
            `

            document.querySelector('.msge').innerHTML += html;
        }
        else{
            location.href = `/admin/home/${results.id}/${results.token}`;
        }
    })

    document.querySelector("#pass-el").value = "";
    // auth.signInWithEmailAndPassword(email, password)
    // .then((results) => {
    // var user = results.user;

    
    // location.href = "admin-home.html"
   
    // })
    // .catch((error) => {
    //     loader.style.display = 'none'
    //     swal("Error",error,"error")
    // });
}
document.querySelector('.reset-btn').addEventListener('click', ()=>{

    location.href = '/api/auth/forgot-password';
})