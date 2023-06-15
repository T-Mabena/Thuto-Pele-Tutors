var loader = document.querySelector(".loader")
function loading() {
    loader.style.display = 'none'
}

const register =() =>{

    let names = document.querySelector("#name-el").value
    let surname = document.querySelector("#last-name").value
    let email = document.querySelector("#email-el").value
    let adress = document.getElementById("address").value
    let phone = document.querySelector("#phone-el").value
    let pass1 = document.querySelector("#password1").value
    let pass2 = document.querySelector("#password2").value
    let subject = document.querySelector("#subjects").value


    if (names === "" || surname === ""){
        //swal("Error"," Name Or Surname Input is Empty!!!", "error")
        return false;
    }
    if (email === "" || phone === "") {
        //swal("Error","Email Or Phone Number Input is Empty!!!","error")
        return false;
    }
    if (pass1 !== pass2) {
        //swal("Error","Passwords don't match!!!", "error")
        return false;
    }
    else{

        const info =[{
            Name: names,
            Surname: surname,
            Phone: phone,
            Email: email,
            Subjects: subject,
            Address: adress,
            Password: pass2
        }]

        //loader.style.display = 'block'

        const data = {
            method: "POST", 
            headers: {"Content-type": "application/JSON"},
            body: JSON.stringify(info)
        }
        fetch('/api/auth/learner/register', data)
        .then((responce) => {
            return responce.json();
         })
         .then((results)=>{
            if(results.code !== 200)
            {
                alert(results.message)
                return false;

            }else{

                swal("Success", results.message, "success")
                // alert(results.message)
                setTimeout(() => {
                    location.href = "/learner/login";
                }, 5000);
            }
         })

        document.querySelector("#name-el").value = ""
        document.querySelector("#last-name").value = ""
        document.querySelector("#email-el").value = ""
        document.getElementById("address").value = ""
        document.querySelector("#phone-el").value = ""
        document.querySelector("#password1").value = ""
        document.querySelector("#password2").value = ""
        document.querySelector("#subjects").value = ""
    }
}

 