(function () {
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const movieTypePanel = document.getElementById('movie-type-panel')
  const moviePanel = document.getElementById('movie-panel')
  const data = []
  const movieType = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }

  axios.get(INDEX_URL).then((response) => {
    data.push(...response.data.results)
    console.log(data)
    displayTypeList(movieType)
    displayMovie(data, movieType)
    recordMovieGenres(data)

  }).catch((err) => console.log(err))


  //add event listener for movie type selection
  movieTypePanel.addEventListener('click', function (event) {
    let typeSelection = Number(event.target.dataset.movieTypeId)
    console.log(typeSelection)
    displayMovieByType(data, typeSelection)

  })


  //display movie type in movieTypePanel

  function displayTypeList(allMovieType) {
    let htmlContent = ''
    for (let prop in allMovieType) {
      htmlContent += ` <a class="list-group-item list-group-item-action" data-toggle="list" data-movie-type-id="${prop}" role="tab">${allMovieType[prop]}</a>`
    }
    movieTypePanel.innerHTML = htmlContent
  }

  //display movies in the  moviePanel

  function displayMovie(data) {
    //console.log(movieType[1])
    let htmlContent = ''

    data.forEach(function (item, index) {
      let movieStyle = []
      let movieStyleHtmlContent = ''
      //將所有genres由數字轉換成對應的文字並儲存在html
      item.genres.forEach(function (element) {
        movieStyleHtmlContent += `<span class="badge badge-pill badge-light">${movieType[element]}</span>`
      })
      htmlContent += `  
      <div class="col-sm-3">
      <div class="card mb-2">
      <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
      <div class="card-body movie-item-body">
        <p class="card-title"><strong>${item.title}</strong></p>
        <p class="card-genres">${movieStyleHtmlContent}</p>
      </div>
    </div>
  </div>`
    })
    moviePanel.innerHTML = htmlContent
  }

  //display movie panel by the selected type

  function displayMovieByType(data, typeSelect) {
    let htmlContent = ''
    data.forEach(function (element) {
      let movieStyleHtmlContent = ''
      for (let i = 0; i < element.genres.length; i++) {
        if (element.genres[i] === typeSelect) {
          //console.log(element)
          //將所有genres由數字轉換成對應的文字並儲存在html
          element.genres.forEach(function (index) {
            movieStyleHtmlContent += `<span class="badge badge-pill badge-light">${movieType[index]}</span>`
          })
          htmlContent += `  
            <div class="col-sm-3">
            <div class="card mb-2">
            <img class="card-img-top " src="${POSTER_URL}${element.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <p class="card-title"><strong>${element.title}</strong></p>
              <p class="card-genres">${movieStyleHtmlContent}</p>
            </div>
          </div>
        </div>`
          //Once the selected type is found in the movie genres, end the loop.
          break
        }
      }
    })
    moviePanel.innerHTML = htmlContent
  }
})()