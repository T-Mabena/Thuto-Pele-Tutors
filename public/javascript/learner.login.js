var loader = document.querySelector(".loader")
function loading() {
    loader.style.display = 'none'
}

const login = () => {

    let email = document.querySelector("#email-el").value
    let password = document.querySelector("#password1").value

    if (email === "") {
        document.querySelector("#email-el").style.border = "1px solid red"
        return false
    }
    if (password === "") {
        document.querySelector("#password1").style.border = "1px solid red"
        return false
    }

    const data = [{
        Email: email,
        Password: password
    }]

    const options = {
        method: 'POST',
        headers: {"Content-type": "application/JSON"},
        body: JSON.stringify(data)
    }

    fetch('/api/auth/learner/login', options)
    .then(res => {return res.json()})
    .then(info => {

        if(info.code !== 40){
            let html = `
                <div class="alert alert-dismissible fade show alert-danger" role="alert">
                    <button class="btn-close" type="button" data-bs-dismiss="alert" aria-label="close"></button>
                    <strong>${info.message}</strong>
                </div>
                `

                document.querySelector('.msg').innerHTML += html;
        }
        else{
            
            let userid = info.id;
            let token = info.token;
            localStorage.setItem('token', token);
            location.href = '/learner/home' +'/'+ userid +'/'+ token;
        }
    })

    document.querySelector("#password1").value = "";
}
function viewPassword()
{
  var passwordInput = document.getElementById('password-field');
  var passStatus = document.getElementById('pass-status');
 
  if (passwordInput.type == 'password'){
    passwordInput.type='text';
    passStatus.className='fa-solid fa-eye-slash';
    
  }
  else{
    passwordInput.type='password';
    passStatus.className='fa-solid fa-eye';
  }
}