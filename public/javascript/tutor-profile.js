var loader = document.querySelector(".loader")

function loading() {
    loader.style.display = 'none'
}

const generateProfile = () => {

    let empty = document.querySelector("#picture-el").value

    let names = document.querySelector("#names-el").value
    let surname = document.querySelector("#surname-el").value
    let Cell = document.querySelector("#cell-no").value
    let email = document.querySelector("#email-el").value
    let location = document.querySelector("#location-el").value
    let address = document.querySelector("#address-el").value
    let special = document.querySelector("#special-el").value
    let price = document.querySelector("#price-el").value
    let gender = document.querySelector("#gender").value
    let tit = document.querySelector("#title-el").value
    let photo = document.querySelector("#picture-el").files[0]


    if (empty === "") {

        auth.onAuthStateChanged((user) => {
            
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              var uid = user.uid;
                loader.style.display = 'block'

                db.collection("Tutor").doc(uid).set({
                    Name: names,
                    Surname: surname,
                    Cell: Cell,
                    Email: email,
                    Location: location,
                    Address: address,
                    Specialization: special,
                    Price: "R" + price,
                    Gender: gender,
                    Title: tit
                })
                .then((userData) => {
                    loader.style.display = 'none'
                    alert("Successfully created a profile.") 
                    
                    location.ref("tutor-home.html")
                })
                .catch((error) => {
                    loader.style.display = 'none'
                    alert(error)
                });

            }
        });
    }
    else{

        auth.onAuthStateChanged((user) => {
            
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              var uid = user.uid;
    
              const storage = firebase.storage().ref("Profile Photo")
                let today = new Date()
                let time = today.getTime()
    
                let metaData = {
                    contentType: photo.type
    
                }
    
                let name = time + " " + photo.name
    
                let task = storage.child(name).put(photo, metaData)
    
                task.on("state_changed", function progress(snapshot){
                    
                    let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    
                    document.getElementById("progress-el").value = percentage
                    document.getElementById("percentage").innerHTML = "Uploading... " + percentage.toFixed(0) + "%"
                })
    
                task.then((imageFile) => imageFile.ref.getDownloadURL()).then((url) =>{

                    loader.style.display = 'block'

                    db.collection("Tutor").doc(uid).set({
                        Name: names,
                        Surname: surname,
                        Cell: Cell,
                        Email: email,
                        Location: location,
                        Address: address,
                        Specialization: special,
                        Price: "R" + price,
                        Gender: gender,
                        PhotoLink: url,
                        Title: tit
                    })
                    .then((userData) => {
                        alert("Successfully created a profile.")
                    })
                    .catch((error) => {
                        loader.style.display = 'none'
                        alert(error)
                    });
                });
                
    
            } else {
            // User is signed out
                location.href = "tutor-login.html"
            }
        });
    }
}       

let log = document.querySelector(".logout-btn")
log.addEventListener('click', () => {
    auth.signOut()
    .then(() => {
        location.href = "tutor-login.html"
    })
    .catch((error) => {
        alert(error)
        console.log(error)
    })
    
})