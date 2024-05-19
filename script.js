const apiKey = 'Z3Y2fXDC/pfCWw3QzdWYIQ==1q7jD6mOvzNzwnz9'
const apiUrl = 'https://api.api-ninjas.com/v1/riddles'
const requestOptions = {
  method: 'GET',
  headers: {
    'X-Api-Key': 'Z3Y2fXDC/pfCWw3QzdWYIQ==1q7jD6mOvzNzwnz9',
    'Content-Type': 'application/json',
  },
  mode: 'cors',
}

fetch(apiUrl, requestOptions)
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    console.log(data)
    data = data[0]
    document.getElementById('q-box').innerHTML += `
    <h5>${data.question}</h5>
    <button onclick="getanswer('${data.answer}')">Get answer</button>
    <button onclick="nextButton()">Next Riddle</button>
    <button onclick="qshare('${data.question.replace(
      /'/g,
      "\\'",
    )}')">share</button>
    `
  })
  .catch((error) => {
    console.error('Error:', error)
  })

function nextButton() {
  document.getElementById('q-box').innerHTML = ''
  document.getElementById('answer').innerHTML = ''

  fetch(apiUrl, requestOptions)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data)
      data = data[0]
      document.getElementById('q-box').innerHTML += `
    <h5>${data.question}</h5>
    <button onclick="getanswer('${data.answer}')">Get answer</button>
    <button onclick="nextButton()">Next Riddle</button>
    <button class="details" id="q-details" onclick="qshare('${data.question}')">share</button>

    `
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
function getanswer(data) {
  document.getElementById('answer').innerHTML = data
}

async function qshare(data) {
  try {
    const shareData = {
      text: data,
    }
    await navigator.share(shareData)
  } catch (e) {
    console.log('error')
  }
}
function escapeHtml(string) {
  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s]
  })
}
