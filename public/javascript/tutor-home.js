// Loader
var loader = document.querySelector(".loader")
function loading() {
    loader.style.display = 'none'
}
loading()
//Modal
let booking = document.querySelector('#edit-btn')
let modal = document.querySelector('.modal-container')
let closeBtn = document.querySelector('.close-btn')

const editBtn = () => {
  modal.classList.add('active')
}

const close_btn = () => {
  modal.classList.remove('active')
}

//End

let sideBarBtn=document.querySelectorAll(".switch-bar")
let divContainer=document.querySelectorAll(".switch-content")

let btn1=   document.querySelector(".btn1")
let btn2=   document.querySelector(".btn2")
let btn3=   document.querySelector(".btn3")
let btn4=   document.querySelector(".btn4")

btn1.addEventListener(("click"),()=>{
  switchBtn(0,0)

})

btn2.addEventListener(("click"),()=>{
  switchBtn(1,1)

})

btn3.addEventListener(("click"),()=>{
  switchBtn(2,2)

})

btn4.addEventListener(("click"),()=>{
  switchBtn(3,3)

})

const switchBtn = (divSelected,btnSelected) => {

    sideBarBtn.forEach(element => {
        element.classList.remove("active")
       });
       sideBarBtn[btnSelected].classList.add("active")
       
       divContainer.forEach(element => {
         element.classList.remove("active")
        });
       
       divContainer[divSelected].classList.add("active")
}
const dataTable = ()=> {

  $(document).ready( function () {
    $('#table-id').DataTable();
  } );

  $(document).ready( function () {
    $('#tabled-id').DataTable();
  } );
}
dataTable();

const showCalender = () => {

  let dayList = document.querySelector(".days")
  let monthName = document.querySelector(".month-name")
  let yearName = document.querySelector(".year")
  let prevbtn = document.querySelector(".prev")
  let nextbtn = document.querySelector(".next")
 
   let dt = new Date()
   let month = dt.getMonth() + 1
   let year = dt.getFullYear()
   let currentDay = dt.getDate()
 
   let monthsNames = [
     "January",
     "February",
     "March",
     "April",
     "May",
     "June",
     "Jully",
     "August",
     "September",
     "October",
     "November",
     "December"
   ]




  monthName.innerHTML = monthsNames[month - 1]
  yearName.innerHTML = year
  dayList.innerHTML = ''

  daysInMonth = new Date(year, month , 0).getDate()

  for (day= 1; day <= daysInMonth; day++) {
    
    const days = document.createElement("li")

    if (day <= 0) {
      days.innerHTML = ""
      dayList.appendChild(days)
    
    }else if (day === currentDay && month === dt.getMonth() + 1 && year === dt.getFullYear()) {
      days.setAttribute('class', 'present')
      days.innerHTML = day
      dayList.appendChild(days)
    }
    else{
      days.innerHTML = day
      dayList.appendChild(days)
    }
  }
}

showCalender()

const next = () => {
  if (month === 12) {
    month = 1
    month += 1
  }else{
    month += 1
  }
  showCalender()
}
const prev = () => {
  if (month === 1) {
    month = 12
    month -= 1
  }else{
    month -= 1
  }
  showCalender()

}


const fillTable = () => {

  let tbl = document.querySelector("#tutor-table")
  let tbl_h = document.getElementById("t-hearder")
  let module_options = document.getElementById("module_options")

  let color = "";
  let t_head = "";
  let div = ""
  let html = ""
  let nam = 0
  
  const uid = document.getElementById("uid").value;
  
  fetch('/api/tutor/bookings', {
    method: "POST",
    headers: { "Content-type": "application/JSON"},
    body: JSON.stringify({uid})
  })
  .then(res => {return res.json()})
  .then(bk => {

    const booking = bk.book;
    

    if (!booking) {
      swal("Info", "We could not find any bookings for you!", "info");

    } else {
    
      if (booking != null) {
       
          booking.forEach((element, i) => {

            if (element.Status === "Successful") {
              color = "text-success"
            } else if(element.Status === "Declined"){
              color = "text-danger"
            }
            else{
              color = "text-warning"
            }
          
            div = `
              <tr>
                <td>${i}</td>
                <td>${element.Learner_Name}</td>
                <td>${element.Learner_Surname}</td>
                <td>${element.Learner_Email}</td>
                <td>${element.Learner_Phone}</td>
                <td>${element.Module}</td>
                <td style="font-weight: 500;" class=${color}>${element.Status}</td>
                <td>
                  <a href="#" class="text-success" onclick= "StatusUpdate('${element._id}')" data-bs-toggle="modal" data-bs-target="#exampleModalCenter"><i class="fas fa-edit fa-lg mx-1"></i></a>
                </td>
              </tr>
            `
            html += div;
            tbl.innerHTML = html
          });

      } else {
        
      }
      
    }
  })
  
}
fillTable();

const StatusUpdate = (id) =>{
  document.querySelector(".update").addEventListener('click', () =>{

    const update = document.querySelector("#status").value;
    const status = {
      id: id,
      st: update
    };

    fetch('/api/tutor/update/status', {
      method: "POST",
      headers: { "Content-type": "application/JSON" },
      body: JSON.stringify(status)
    })
    .then(res => {return res.json()})
    .then(info => {
      
      if (!info.code == 111) {
        swal("Error", info.message, "error");
      } else {
        swal("Success", info.message, "success");
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
    })
  })
}

const updateProfile = () => {

      let email = document.querySelector("#email-add").value
      let namba = document.querySelector("#cell").value
      let altphone = document.querySelector("#alt-phone").value

      let name = document.querySelector("#first-name").value
      let sur = document.querySelector("#last-name").value
      let gen = document.querySelector("#gender").value

      let city = document.querySelector("#city-el").value
      let loc = document.querySelector("#location").value
      let addr = document.querySelector("#address").value 

      let spec = document.querySelector("#special").value
      let pric = document.querySelector("#price").value

      let img = document.querySelector('#profile-img').files[0];
      const fd = {
        Name: name,
        Email: email,
        Photo: img
      }
    
      // const fd = new FormData()
      //   fd.append('Name', name);
      //   fd.append('Surname', sur);
      //   fd.append('Gender', gen);
      //   fd.append('Phone', namba);
      //   fd.append('AltPhone', altphone);
      //   //fd.append('About', dataCont[0].About);
      //   fd.append('SubName', spec);
      //   fd.append('SubPrice', pric);
      //   //fd.append('Opt', dataSub[0].Method);

      //   fd.append('Email', email);
      //   fd.append('Address', addr);
      //   fd.append('City', city);
      //   fd.append('Location', loc);
      //   fd.append('Profile', img);


        // console.log(fd)
        // fetch('/api/auth/update/tutor', {
        //   method: 'POST',
        //   // headers: {'Content-type': 'application/JSON'},
        //   body: fd
        // })
        // .then(res => {
        //   return res.json()
        // })
        // .then( results => alert(results.message))

      //let pic = document.querySelector("#pic").value 

  //  auth.onAuthStateChanged((user) => {
  //   let uid = user.uid

  //   if (user) {
  //     let namba = document.querySelector("#cell").value
  //     let spec = document.querySelector("#special").value
  //     let email = document.querySelector("#email-add").value
  //     let loc = document.querySelector("#location").value
  //     let addr = document.querySelector("#address").value 
  //     let pric = document.querySelector("#price").value
  //     let gen = document.querySelector("#gender").value
  //     let altphone = document.querySelector("#alt-phone").value
  //     let city = document.querySelector("#city-el").value
  //     //let pic = document.querySelector("#pic").value 

  //     loader.style.display = 'block'
  //     db.collection("Tutor").doc(uid).update({
  //       Cell: namba,
  //       Specialization: spec,
  //       Email: email,
  //       Location: loc,
  //       Address: addr,
  //       Price: pric,
  //       Gender: gen,
  //       Alt_Phone: altphone,
  //       City: city
  //     })
  //     .then(() => {

  //       loader.style.display = 'none'
  //       swal("Success", "profile successfully updated.", "success")
  //       setTimeout(() => {
  //         location.reload()
  //     }, 2000);

  //     })
  //     .catch((er) =>{
  //       swal("Error", er, "error")
  //     })
  //   }
  //  })
}

const fillSelect = () => {
  let div = ""

  let selectID = document.getElementById("module_options")
  auth.onAuthStateChanged((user) => {

    let id = user.uid
    if (user) {

      db.collection("Tutor").doc(id).get()
      .then((subject) => {
          
          div = `
          <option value="#">Please Select Module...</option>
          <option value="${subject.data().Specialization}">${subject.data().Specialization}</option>
          `
          selectID.innerHTML = div
        
      })
      .catch((er) => {
        swal("Error", er, "error")
      })
    }
  })
}


const announcement = () => {

  let module = document.getElementById("module_options").value;
  let message = document.querySelector("#message").value;
  let urgent = document.querySelector(".urgent");
  const uid = document.getElementById("uid").value;
  const t_name = document.getElementById("t_name").value;
  const t_sname = document.getElementById("t_sname").value;

  let sttus = "";

  //loader.style.display = 'block'

  if (urgent.checked == true) {
    sttus = "urgent"
  } else {
    sttus = "normal"
  }

  // const fd = new FormData()
  // fd.append('status', sttus)
  // fd.append("module", module)
  // fd.append("message", message)

  const fd = {
    status:  sttus,
    module:  module,
    message:  message,
    id: uid,
    T_Name: t_name,
    T_SName: t_sname
  }

  fetch('/api/tutor/new/announcement', {
    method: "POST",
    headers: { "Content-type": "application/JSON" },
    body: JSON.stringify({ fd })
  })
  .then(res => {return res.json()})
  .then(info => {
    if (info.code === 123) {
      swal("Success", info.message, "success")
    } else {
      swal("Error", info.message, "error")
    }
  })
}

const get_announcement = () => {

  let tblDiv = document.querySelector("#annonce-table");
  const uid = document.getElementById("uid").value;
  let html = ""
  let div = ""
  

  fetch("/api/get/tutor/announcement", {
    method: "POST",
    headers: { "Content-type": "application/JSON" },
    body: JSON.stringify({ uid })
  })
  .then(res => {return res.json()})
  .then(info => {

    const ann = info.data;
    if (!ann) {
      swal("Error", "Oops! Something went wrong.", "error")
    } else if(ann !== null){

      ann.forEach((element, i) => {

        div = `
          <tr>

              <td>${i}</td>
              <td>${element.Posted_On}</td>
              <td>${element.Module}</td>
              <td>${element.Message}</td>
              <td>
                <a href="#" class="text-danger" onclick="delete_announce('${element._id}')"><i class="fas fa-trash fa-lg mx-1"></i></a>
              </td>
              
          </tr>
        `
        html += div;
        tblDiv.innerHTML = html;

      });

    }else{
      swal("Error", "Oops! We could not find data.", "error")
    }

  })

}
get_announcement();

const delete_announce = (indexID) => {

  swal({
    title: "Are you sure you want to delete this announcement?",
    text: "Once deleted, There's no turning back!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((Delete) => {

    if(Delete){

      fetch('/api/delete/announcement', {
        method: 'POST',
        headers: { "Content-type": "application/JSON" },
        body: JSON.stringify({ id: indexID })
      })
      .then(res => { return res.json() })
      .then(info => {
        if (info.code == 158) {
          swal("Success", info.message, "success");
          setTimeout(() => {
            location.reload();
          }, 3000);
        } else {
          swal("Error", info.message, "error");
        }
      })
    }
    else {
      loader.style.display = 'none'
      swal("Info","Announcement has been spared for now!, good choice","info");
    }

  });

}
document.querySelector(".logout-btn").addEventListener('click', () => {
  //location.href = '/learner/api/auth/learner/logout';
  let token = document.querySelector('.uid').textContent;

  let options = {
    method: 'POST',
    headers: {'Content-type': 'application/JSON'},
    body: JSON.stringify([{tk: token}])
  }

  fetch('/api/auth/tutor/logout', options)
  .then(results => {return results.json()})
  .then(res => {
    if (res.code !== 111) {
      alert('Error!')
    }
    location.href = '/tutor/login';
  })
  
})