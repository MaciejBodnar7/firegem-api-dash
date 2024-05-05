const body = document.getElementById("body")
const imgAuthor = document.getElementById("img-author")

//render backround img
const bgRender = async cb => {
  fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => cb(data))
    .catch(err => {
      body.style.backgroundImage = `url(https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDE2NzA&ixlib=rb-1.2.1&q=80&w=1080)`
      imgAuthor.textContent = `There was a problem with your background image, please refresh your site!`
    })
}

//callback
bgRender(bg => {
  console.log(bg)
  body.style.backgroundImage = `url(${bg.urls.full})`
  imgAuthor.textContent = `By: ${bg.user.name}`
})
