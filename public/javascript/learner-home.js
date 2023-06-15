
const dataTable = ()=> {

  $(document).ready( function () {
    $('#learner_tbl').DataTable();
  } );
}
dataTable();

const displayProfile = () => {

    auth.onAuthStateChanged((user) => {
        if (user) {
          var uid = user.uid;
          db.collection("Learners").doc(uid).get()
          .then((userData) => {

            let name = userData.data().Name
            let init = name.split("")
            let initName = init[0] + " " + userData.data().Surname
            document.querySelector(".name-el").innerHTML = initName
          })
          .catch((error) => {

            alert(error)
          })

        } else {
          location.href = "learner-login.html"
        }
      });
}

const fillTable = () => {

  let tbl = document.querySelector("#learner-table")
  let subDiv = document.querySelector(".subjects")
  let color = "";

  let div = ""
  let html = ""

  let par2 = ""
  let par = ""
  
  const uid = document.getElementById("uid").value;

  fetch('/api/learner/bookings', {
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
                <td>${element.Module}</td>
                <td>${element.Tutor_Name}</td>
                <td>${element.Tutor_Surname}</td>
                <td>${element.Tutor_Email}</td>
                <td style="font-weight: 500;" class=${color}>${element.Status}</td>
              </tr>
            `

            html += div;
            tbl.innerHTML = html;

            switch (element.Status) {
              case "Successful":
                par = `
                  <p style="font-weight: 500;" class="text-success">${element.Module}</p>
                `
  
                par2 += par;
                subDiv.innerHTML = par2;
                
                break;
            
              default:
                break;
            }

          });

      } else {
        
      }
      
    }
  })
  
}
fillTable();

const getAnnouncement = () => {

  let cont = document.querySelector(".content-ann")
  const uid = document.getElementById("uid").value;
  let html = ""
  let div = ""


  fetch('/api/learner/get/announcementt', {
    method: "POST",
    headers: { "Content-type": "application/JSON"},
    body: JSON.stringify({uid})
  })
  .then(res => {return res.json()})
  .then(bk => {

    const announce = bk.data;
  
    if (!announce) {
      swal("Info", "We could not find any bookings for you!", "info");

    } else {
    
      if (announce != null) {
       
          announce.forEach(element => {

               div = `

                  <div class="annou-contents">
                      <div class="module-details">
                          <div class="title-cont">
                              <strong>${element.Module}</strong>
                              <p>Date posted: ${element.Posted_On}</p>
                              <p>Dear {${element.Module}} Learner:</p>
                          </div>

                          <div class="body-cont">
                              <p class="messagge">${element.Message}</p>
                          </div>

                          <div class="end-cont">
                              <p>Regards.</p>
                              <p>${element.Posted_By}.</p>
                          </div>
                      </div>
                      <p></p>
                  </div>

              `

            html += div;
            cont.innerHTML = html;

          });

      } else {
        
      }
      
    }
  })

  // db.collection("Announcement").where('Module', '==', sub).onSnapshot((results) => {

  //   results.forEach(info => {
      
  //     div = `

  //       <div class="annou-contents">
  //           <div class="module-details">
  //               <div class="title-cont">
  //                   <strong>${info.data().Module}</strong>
  //                   <p>Date posted: ${info.data().Date_Posted}</p>
  //                   <p>Dear {${info.data().Module}} Learners:</p>
  //               </div>

  //               <div class="body-cont">
  //                   <p class="messagge">${info.data().Message}</p>
  //               </div>

  //               <div class="end-cont">
  //                   <p>Regards.</p>
  //                   <p>${info.data().Posted_By}.</p>
  //               </div>
  //           </div>
  //           <p></p>
  //       </div>

  //     `
  //     html += div
  //     cont.innerHTML = html
  //   });
    
  // })
}
getAnnouncement();

document.querySelector('.logout-btn').addEventListener('click', ()=>{

  const token = document.querySelector('.webToken').textContent;

  fetch('/learner/api/auth/learner/logout', {
    method: 'POST',
    headers: {"Content-type": "application/JSON"},
    body: JSON.stringify({tk: token})
  })
  .then(res => {return res.json()})
  .then(info => {
      if(info.code === 180){

        localStorage.clear();
        location.href= '/learner/login';
      }
    })
})