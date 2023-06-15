var loader = document.querySelector(".loader")
function loading() {
    loader.style.display = 'none'
}
const storageClear = () =>{
    localStorage.clear();
}
storageClear();

var progress = document.getElementById('progress')
var col = document.querySelector('.step-col')

var cancel = document.getElementById('calcel')

var form0 = document.getElementById('form0')
var form1 = document.getElementById('form1')
var form2 = document.getElementById('form2')
var form3 = document.getElementById('form3')
var form4 = document.getElementById('form4')
var form5 = document.getElementById('form5')

var nxt0 = document.getElementById('next0')
var nxt1 = document.getElementById('next1')
var nxt2 = document.getElementById('next2')
var nxt3 = document.getElementById('next3')
var nxt4 = document.getElementById('next4')

var back0 = document.getElementById('back0')
var back1 = document.getElementById('back1')
var back2 = document.getElementById('back2')
var back3 = document.getElementById('back3')
var back4 = document.getElementById('back4')


cancel.addEventListener('click', ()=>{
    localStorage.clear()

    swal("Info", "It's okay, just think about it, Thank You!", "info")
    setTimeout(()=>{
        location.href = "/"
    }, 2000)
})

nxt0.addEventListener('click', ()=>{
    form0.style.left = '-500px'
    form1.style.left = '45px'
    progress.style.width = '20%'
    col.style.color = 'white'

})
nxt1.addEventListener('click', ()=>{

    let name = document.getElementById('ful-name').value
    let surname = document.getElementById('last-name').value
    let dob = document.getElementById('dob').value


    if(name ==="" || surname === "" || dob === ""){
        alert("Please make sure all the fields have been filled before you can proceed to the next step.")
    }
    else{

        let personal_Details =[{
            Name: name,
            Surname: surname,
            DoB: dob
        }]

        localStorage.setItem("Personal Details", JSON.stringify(personal_Details))

        form1.style.left = '-450px'
        form2.style.left = '35px'
        progress.style.width = '40%'
    }


})
nxt2.addEventListener('click', ()=>{

    let phone = document.getElementById('phone-el').value
    let altNum = document.getElementById('alt-el').value
    let about = document.getElementById('about').value


    if(phone ==="" || altNum === ""){
        alert("Please make sure all the fields have been filled before you can proceed to the next step.")
    }
    else{

        let contact_Details =[{
            Phone: phone,
            AltPhone: altNum,
            About: about
        }]
        

        localStorage.setItem("Contact", JSON.stringify(contact_Details))

        form2.style.left = '-500px'
        form3.style.left = '45px'
        progress.style.width = '60%'
    }

})
nxt3.addEventListener('click', ()=>{

    let address = document.getElementById('address-el').value
    let city = document.getElementById('city-el').value
    let gender = document.getElementById('gender-el').value


    if(address ==="" || city === ""){
        alert("Please make sure all the fields have been filled before you can proceed to the next step.")
    }
    else{
        
        let location_Details =[{
            Address: address,
            City: city,
            Gender: gender,
        }]

        localStorage.setItem('Location', JSON.stringify(location_Details));
    
        form3.style.left = '-500px'
        form4.style.left = '45px'
        progress.style.width = '80%'
    }

})
nxt4.addEventListener('click', ()=>{

    let subName = document.getElementById('special').value
    let subPrice = document.getElementById('price').value
    let method = document.getElementById('method-el').value

    if(subName ==="" || subPrice === "" || method === ""){
        alert("Please make sure all the fields have been filled before you can proceed to the next step.")
    }
    else{
        
        let subject_Details =[{
            Subject_Name: subName,
            Subject_price: subPrice,
            Method: method
        }]

        localStorage.setItem('Subject', JSON.stringify(subject_Details));

        form4.style.left = '-500px'
        form5.style.left = '45px'
        progress.style.width = '100%'
    }

})

back0.addEventListener('click', ()=>{

    form0.style.left = '45px'
    form1.style.left = '500px'
    progress.style.width = '20%'
})

back1.addEventListener('click', ()=>{

    let personal = localStorage.getItem("Personal Details")
    let data = JSON.parse(personal) 

    document.getElementById('ful-name').value = data[0].Name
    document.getElementById('last-name').value = data[0].Surname
    document.getElementById('dob').value = data[0].DoB

    form1.style.left = '45px'
    form2.style.left = '500px'
    progress.style.width = '40%'
})

back2.addEventListener('click', ()=>{

    let cont = localStorage.getItem("Contact")
    let data = JSON.parse(cont) 

    document.getElementById('phone-el').value = data[0].Phone
    document.getElementById('alt-el').value = data[0].AltPhone
    document.getElementById('about').value = data[0].About

    form2.style.left = '45px'
    form3.style.left = '500px'
    progress.style.width = '60%'
})

back3.addEventListener('click', ()=>{
    let location = localStorage.getItem("Location")
    let data = JSON.parse(location)

    document.getElementById('address-el').value = data[0].Address
    document.getElementById('city-el').value = data[0].City
    document.getElementById('gender-el').value = data[0].Gender

    form3.style.left = '45px'
    form4.style.left = '500px'
    progress.style.width = '80%'
})

back4.addEventListener('click', ()=>{

    let subject = localStorage.getItem("Subject")
    let data = JSON.parse(subject)

    document.getElementById('special').value = data[0]. Subject_Name
    document.getElementById('price').value = data[0]. Subject_price
    document.getElementById('method-el').value = data[0].Method
    

    form4.style.left = '45px'
    form5.style.left = '500px'
    progress.style.width = '100%'
})


const register =() =>{

    let email = document.getElementById('email-el').value
    let pass1 = document.getElementById('password1').value
    let pass2 = document.getElementById('password2').value
    let img = document.getElementById('photo').files[0]


    if(img === '' || img== undefined){
        swal('Error', 'Choose profile photo!', 'error')
        return false;
    }
    if (email === "" || pass1 === "" || pass2 === ""){
        swal("Error", "Please ensure that all required input fields are filled!!!", "error")
        return false;
    }
    if (pass1 !== pass2) {
        swal("Error","Passwords don't match!!!", "error")
        return false;
    }
    else{

        let personal = localStorage.getItem("Personal Details")
        let data = JSON.parse(personal)

        let cont = localStorage.getItem("Contact")
        let dataCont = JSON.parse(cont)

        let subject = localStorage.getItem("Subject")
        let dataSub = JSON.parse(subject)

        let location = localStorage.getItem("Location")
        let dataLoc = JSON.parse(location)

        let account = {
            Email: email,
            Password: pass2
        }
        const fd = new FormData()
        fd.append('Name', data[0].Name);
        fd.append('Surname', data[0].Surname);
        fd.append('DoB', data[0].DoB);

        fd.append('Phone', dataCont[0].Phone);
        fd.append('AltPhone', dataCont[0].AltPhone);
        fd.append('About', dataCont[0].About);

        fd.append('Address', dataLoc[0].Address);
        fd.append('City', dataLoc[0].City);
        fd.append('Gender', dataLoc[0].Gender);
        
        fd.append('SubName', dataSub[0].Subject_Name);
        fd.append('SubPrice', dataSub[0].Subject_price);
        fd.append('Opt', dataSub[0].Method);

        fd.append('Email', email);
        fd.append('Password', pass2);
        fd.append('Profile', img);


        //const newData = JSON.stringify(applicationData);
         

        const options = {
            method: "POST", 
            //headers: {"Content-type": "application/JSON"},
            body: fd
        }

        loader.style.display = 'block'
        fetch('/api/auth/tutor/application', options)
        .then(res => {return res.json()})
        .then(info => {
            loader.style.display = 'none'
            if(info.code === 200){
                swal("Success", info.message, "success")
                setTimeout(() => {
                    location.href = '/tutor/login';
                }, 3000);
            }else{
                swal("Error", info.message, "error")
            }
            // location.href = '/tutor/login';
            //location.reload();
        })
      
        // auth.createUserWithEmailAndPassword(email, pass1)
        // .then(() => {
        //  // Signed in 

        //     db.collection("Tutor").doc(auth.currentUser.uid).set({
        //         Name: data[0].Name,
        //         Surname: data[0].Surname,
        //         Method: data[0].Method,
		//         Phone: dataCont[0].Phone,
        //         About_Me: dataCont[0].About,
		//         Alternative_Number: dataCont[0].AltPhone,
        //         Email: email,
        //         Subject: dataSub[0].Subject_Name,
        //         Price: dataSub[0].Subject_price
                
        //     },merge = true)
        //     .then(() => {

        //         loader.style.display = 'none'
                
        //         swal("Success", "Successfully  registered.", "success")
        //         setTimeout(()=>{

        //             location.href = "tutor-login.html"
        //         }, 2000)
                
        //     })
        //     .catch((error) => {
        //         loader.style.display = 'none'
        //         swal("Error", error , "error")
        //     });
        // })
        // .catch((er) => {

        //     loader.style.display = 'none'

        //     //alert(er)
        //     swal("Error", er , "error")

        // });

    }
}