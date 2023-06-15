var loader = document.querySelector(".loader")
function loading() {
    loader.style.display = 'none'
}
const forgetPassword = () => {

  let eml = document.getElementById("email-el").value;

  if (eml === "") {
    let html = `
    <div class="alert alert-dismissible fade show alert-danger" role="alert">
      <button class="btn-close" type="button" data-bs-dismiss="alert" aria-label="close"></button>
      <strong>Please do not test us!!! Enter email or return back home.</strong>
    </div>
    `

    document.querySelector('.msg').innerHTML += html;

    return false;
  }

  //   const fd = new FormData()
  //   fd.append('email', email)

  fetch('/api/auth/forgot-password', {
    method: 'POST',
    headers: {"Content-type": "application/JSON"},
    body: JSON.stringify({email: eml})
  })
  .then(res => {return res.json()})
  .then(info => {
    let html = `
    <div class="alert alert-dismissible fade show alert-${info.type}" role="alert">
      <button class="btn-close" type="button" data-bs-dismiss="alert" aria-label="close"></button>
      <strong>${info.message}</strong>
    </div>
    `

    document.querySelector('.msg').innerHTML += html;
  })

}