const body = document.getElementById("body")
const imgAuthor = document.getElementById("img-author")
const crypto = document.getElementById("crypto")
const centerDiv = document.getElementById("center-div")

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
  body.style.backgroundImage = `url(${bg.urls.full})`
  imgAuthor.textContent = `By: ${bg.user.name}`
})

let cryptoArr = []

const cryptoRender = async cb => {
  try {
    const resp = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin?localization=true")
    if (!resp.ok) {
      throw Error("Something went wrong")
    }
    const data = await resp.json()

    const respTwo = await fetch("https://api.coingecko.com/api/v3/coins/ethereum?localization=true")
    if (!resp.ok) {
      throw Error("Something went wrong")
    }
    const dataTwo = await respTwo.json()

    const respThree = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin?localization=true")
    if (!resp.ok) {
      throw Error("Something went wrong")
    }
    const Threedata = await respThree.json()

    cryptoArr.push(data)
    cryptoArr.push(dataTwo)
    cryptoArr.push(Threedata)
    cb(cryptoArr)
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}

cryptoRender(arr => {
  const postArr = arr
    .map(item => {
      return `
      <div class="crypto-box flex gap-1 items-center">
      <img src="${item.image.small}" alt="">
        <div class="flex flex-col pl-2">
          <p class="font-bold">${item.name}</p>
          <p>🎯: $${item.market_data.current_price.usd}</p>
          <p>👆: $${item.market_data.high_24h.usd}</p>
          <p>👇: $${item.market_data.low_24h.usd}</p>
        </div>
      </div>
    `
    })
    .join("")
  crypto.innerHTML = postArr
})

const centerDivF = () => {
  const currentdate = new Date()

  centerDiv.innerHTML = `
  <p>${currentdate.getHours()}:${currentdate.getMinutes()}</p>
  <p class="text-lg">${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}</p>
  `
}

centerDivF()
