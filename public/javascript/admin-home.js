var loader = document.querySelector(".loader")
function loading() {
    loader.style.display = 'none'
}

// PROFILE
const openNav = () => {
  document.getElementById("mySidenav").style.width = "350px";
}

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
}
// END

let sideBarBtn=document.querySelectorAll(".side-bar-list")
let divContainer=document.querySelectorAll(".is-active")

let btn1=   document.querySelector(".btn1")
let btn2=   document.querySelector(".btn2")
let btn3=   document.querySelector(".btn3")
let btn4=   document.querySelector(".btn4")
let btn5=   document.querySelector(".btn5")

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

btn5.addEventListener(("click"),()=>{
  switchBtn(4,4)

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

//JQUERY TABLE DESIGN
const dataTable = ()=> {

  $(document).ready( function () {
    $('#learners').DataTable();
  } );

  $(document).ready( function () {
    $('#tutors').DataTable();
  } );

  $(document).ready( function () {
    $('#accepted').DataTable();
  } );

  $(document).ready( function () {
    $('#bookings').DataTable();
  } );
}
//dataTable();

//JQUERY END

//REGISTERED LEARNERS:
let num_learners = 0;
const registerd_learners = () => {

  let reg_tbl = document.querySelector("#registered-learners")
  let html = ""
  let div = ""


   loader.style.display = 'block'

   fetch('/api/admin/read/learners')
   .then(res => { return res.json(); })
   .then(info => {
      const learner = info.data;
      
      if (!learner) {
        swal("Info", "No Leaner available", "info");
      } else if(learner != null) {

        learner.forEach((element, i) => {
          num_learners++
        
              div = `
        
                <tr>
                    <td>${i}</td>
                    <td>${element.Name}</td>
                    <td>${element.Surname}</td>
                    <td>${element.Email}</td>
                    <td>${element.Phone}</td>
                    <td>
                    <a href="#" class="text-danger" onclick="Delete_Learner('${element._id}')"><i class="fas fa-trash fa-lg mx-1"></i></a>
                  </td>
                </tr>
              `
              html += div;
              reg_tbl.innerHTML = html;
              document.querySelector(".reg_learners").textContent = num_learners
              loader.style.display = 'none';
        });

      }else{
        swal("Error", "Something went wrong", "error");
      }

   })
  //  db.collection("Learners").onSnapshot((results) => {

  //    results.forEach(element => {
  //       if (element.data()) {
  //           num_learners++
      
  //           div = `
      
  //             <tr>
  //                 <td>${element.data().Name}</td>
  //                 <td>${element.data().Surname}</td>
  //                 <td>${element.data().Email}</td>
  //                 <td>${element.data().Phone}</td>
  //                 <td><button class= "btn btn-danger btn-sm" onclick = "delete_learner('${element.id}')">Delete</button></td>
  //             </tr>
  //           `
  //           html += div;
  //           reg_tbl.innerHTML = html;
  //           document.querySelector("#learner-entries").value = num_learners
  //           document.querySelector(".reg_learners").textContent = num_learners
  //           loader.style.display = 'none'

  //       } else {
  //         reg_tbl.innerHTML = `
  //           <h3>No Learner Registered Yet.</h3>
  //         `
  //       }
  //     });


  // })
}
registerd_learners();

const Learner_Bookings = () => {

  let html = ""
  let div = ""
  let learner_tbl = document.querySelector("#learner-table");
  let color = "";

  //LOADER
  loader.style.display = 'block'

  fetch('/api/admin/read/learner/bookings')
   .then(res => { return res.json(); })
   .then(info => {
      const bk = info.data;
      
      if (!bk) {
        swal("Info", "No Leaner Bookings available", "info");
      } else if(bk != null) {

        bk.forEach((element, i) => {
          num++

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
                <td>${element.Module}</td>
                <td>${element.Tutor_Name}</td>
                <td>${element.Tutor_Surname}</td>
                <td style="font-weight: 500;" class=${color}>${element.Status}</td>
            </tr>
          `
          html += div;
          learner_tbl.innerHTML = html;
          document.querySelector(".booking-num").textContent = num
          loader.style.display = 'none';
        });

      }else{
        swal("Error", "Something went wrong", "error");
      }

   })

  // db.collection("Bookings").onSnapshot((results) => {

  //     // if (snapshot.data!.docs.isEmpty) or snapshot.exists()

  //     // .onSnapshot(snapshot => {
  //     //   if (snapshot.size) {
  //     //     // we have something
  //     //     ** Handle returned data **
  //     //   } else {
  //     //     // it's empty
  //     //   }
  //     // })


  //     //FOR get():
  //     // .get()
  //     //       .then((querySnapshot) => {           
  //     //           querySnapshot.forEach((doc) => {
    
  //     //               if (doc.exists) {
  //     //                   console.log(doc)                    
  //     //               } else {
  //     //                   console.log('nothing')
  //     //               }
      
  //   results.forEach(element => {
  //     if (element.data()) {
  //         num++
    
  //         div = `
    
  //           <tr>
  //               <td>${element.data().Learner_Name}</td>
  //               <td>${element.data().Learner_Surname}</td>
  //               <td>${element.data().Learner_Email}</td>
  //               <td>${element.data().Subject}</td>
  //               <td>${element.data().Tutor_Name}</td>
  //               <td>${element.data().Tutor_Surname}</td>
  //               <td>${element.data().Tutor_Email}</td>
  //               <td>${element.data().Status}</td>
  //           </tr>
  //         `
  //         html += div;
  //         learner_tbl.innerHTML = html;
  //         document.querySelector("#num-entries").value = num
  //         document.querySelector(".booking-num").textContent = num
  //         loader.style.display = 'none'

  //       } else {
  //         learner_tbl.innerHTML = `
  //           <h3>No Bookings At This Moment.</h3>
  //         `
  //       }
  //   });
  // })
}
Learner_Bookings();

const Delete_Learner = (id) => {
    swal({
        title: "Are you sure?",
        text: "Once deleted, There's no turning back!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {

        if(willDelete){
          
          //LOADER
          loader.style.display = 'block';

          fetch('/api/admin/delete/learner', {
            method: "POST",
            headers: { "Content-type": "application/JSON" },
            body: JSON.stringify({ id })
          })
          .then(res => { return res.json(); })
          .then(info => {
            if (info.code === 125) {
              swal("Success", info.message, "success");

              loader.style.display = 'none';
              setTimeout(() => {
                location.reload();
              }, 2000)

            } else {
              swal("Error", info.message, "error");
            }
          })

        }
        else {
          //loader.style.display = 'none'
          swal("Info","Learner has been spared for now, good choice!","info");
        }

      });

}

//REGISTERED TUTORS
let numtutors = 0;
const registered_tutors = () =>{

  let html = ""
  let div = ""

  let tutor_tbl = document.querySelector("#table-body")
  loader.style.display = 'block'

  fetch('/api/admin/read/tutors')
   .then(res => { return res.json(); })
   .then(info => {
      const tutor = info.data;
      
      if (!tutor) {
        swal("Info", "No Leaner available", "info");
      } else if(tutor != null) {

        tutor.forEach((element, i) => {
          numtutors++;
        
              div = `
        
                <tr>
                  <td>${element.Name}</td>
                  <td>${element.Surname}</td>
                  <td>${element.Gender}</td>
                  <td>${element.Subject_Name}</td>
                  <td>${element.Email}</td>
                  <td>${element.Phone}</td>
                  <td>
                      <a href="#" class="text-danger" onclick="Delete_Tutor('${element._id}')"><i class="fas fa-trash fa-lg mx-1"></i></a>
                  </td>
                </tr>
              `
              html += div;
              tutor_tbl.innerHTML = html;
              document.querySelector(".reg_tutor").textContent = numtutors
              loader.style.display = 'none';
        });

      }else{
        swal("Error", "Something went wrong", "error");
      }

   })
  // db.collection("Tutor").onSnapshot((results) => {

  //   results.forEach(tutor => {

  //     if (tutor.data()) {
  //         numtutors++
    
  //         div = `
    
  //           <tr>
  //               <td>${tutor.data().Name}</td>
  //               <td>${tutor.data().Surname}</td>
  //               <td>${tutor.data().Gender}</td>
  //               <td>${tutor.data().Specialization}</td>
  //               <td>${tutor.data().Email}</td>
  //               <td>${tutor.data().Cell}</td>
  //               <td><button class= "btn btn-danger btn-sm" onclick = "delete_tutor('${tutor.id}')">Delete</button></td>
  //           </tr>
  //         `
  //         html += div;
  //         tutor_tbl.innerHTML = html;
  //         document.querySelector("#num-tutors").value = numtutors
  //         document.querySelector(".reg_tutor").textContent = numtutors
  //         loader.style.display = 'none'

  //     } else {
  //       tutor_tbl.innerHTML = `
  //         <h3>No Tutor Available.</h3>
  //       `
  //     }
  //     });

  // })
}
registered_tutors();

const Delete_Tutor = (id) => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, There's no turning back!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {

    if(willDelete){

      //LOADER
      loader.style.display = 'block';

      fetch('/api/admin/delete/tutor', {
        method: "POST",
        headers: { "Content-type": "application/JSON" },
        body: JSON.stringify({ id })
      })
      .then(res => { return res.json(); })
      .then(info => {
        if (info.code === 125) {
          swal("Success", info.message, "success");

          loader.style.display = 'none';
          setTimeout(() => {
            location.reload();
          }, 2000)

        } else {
          swal("Error", info.message, "error");
        }
      })


    }
    else {
      loader.style.display = 'none'
      swal("Info","Tutor has been spared for now.","info");
    }

  });


}
//END===========

//ALL ACCEPTED LEARNERS

const accepted_learners = () => {

  let namba = 0;
  let html = "";
  let div = "";
  let color = "";

  let learner_accepted = document.querySelector("#accepted-learner")
 
  loader.style.display = 'block';
  fetch('/api/admin/read/accepted/learners')
   .then(res => { return res.json(); })
   .then(info => {
      const accepted_learner = info.data;
      
      if (!accepted_learner) {
        swal("Info", "No Leaner available", "info");
      } else if(accepted_learner != null) {

        accepted_learner.forEach((element, i) => {
        
          namba++
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
                <td>${element.Module}</td>
                <td>${element.Tutor_Name}</td>
                <td>${element.Tutor_Surname}</td>
                <td style="font-weight: 500;" class=${color}>${element.Status}</td>
            </tr>
          `
          html += div;
          learner_accepted.innerHTML = html;
          document.querySelector(".learner-acc").textContent = namba;
          loader.style.display = 'block';

        });

      }else{
        swal("Error", "Something went wrong", "error");
      }

   })

  // db.collection("Bookings").where('Status', '==', 'Accepted').onSnapshot((results) => {

  //   results.forEach(element => {
  //     namba++

  //         div = `
    
  //         <tr>
  //             <td>${element.data().Learner_Name}</td>
  //             <td>${element.data().Learner_Surname}</td>
  //             <td>${element.data().Learner_Email}</td>
  //             <td>${element.data().Subject}</td>
  //             <td>${element.data().Tutor_Name}</td>
  //             <td>${element.data().Tutor_Surname}</td>
  //             <td>${element.data().Tutor_Email}</td>
  //             <td>${element.data().Status}</td>
  //         </tr>
  //       `
  //       html += div;
  //       learner_accepted.innerHTML = html;
  //       document.querySelector("#learner-accepted").value = namba
  //       document.querySelector(".learner-acc").textContent = namba

  //   });

  // })
}
accepted_learners();
//END...............

//CHART DESIGN
let num = 0
const chartt = () => {

  var xValues = ["Registered Learners", "Registered Tutors", "Learners' Bookings", "Learners Accepted"];
  var yValues = [50, 45, 40, 35, 30, 25, 20, 15, 10, 5];
  var barColors = ["red", "green","blue","orange"];

  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      legend: {display: false},
      title: {
        display: true,
        text: "Thuto-Pele Data 2023"
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
//chartt()
//CHART END


// Logout
document.querySelector(".logout").addEventListener('click', () => {
  let token = document.getElementById('tken').value;

  fetch('/api/admin/logout', {
    method: 'POST',
    headers: {'Content-type': 'application/JSON'},
    body: JSON.stringify({ token })
  })
  .then(res => {return res.json(); })
  .then(x => {
    location.href="/admin";
  })
  
})