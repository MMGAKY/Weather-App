

let btnContact = document.getElementById("contact").addEventListener('click', function(){

  window.location = "./contact.html"


})



let inputSearch = document.getElementById("search")

let btnFind = document.getElementById("find")


btnFind.addEventListener('click', function(){
  getWeather(inputSearch.value)
})

inputSearch.addEventListener("input" , function(){

  console.log(inputSearch.value)

  getWeather(inputSearch.value)
  
})

getWeather("cairo")


let weatherInfo =[];

async function getWeather(country){

try {
  
  let t = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=03f2166c13fe419f926153727240612&q=${country}&days=3`)

  let response = await t.json()

  weatherInfo = response
  

  console.log(weatherInfo)


  displayCurrent(response),
  displayAnother(response.forecast.forecastday)

} catch (error) {
  
}

}






function displayCurrent(data){


  const { location, current } = data;

   let container =`
    
      <div class="today-forecast w-25 mx-3">
            <div class="forecast-header d-flex  justify-content-between px-3">
              <h6 class="day">${new Date().toLocaleString('en-US', { weekday: 'long' })}</h6>
              <h6 class="date">${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}</h6>
            </div>
    
            <div class="forecast-content">
              <h3 class="location ms-3 mb-3 fs-3">${location.name}</h3>
             
              <div class="degree d-flex justify-content-evenly">
                <div class="num text-center fw-bold">
                  <span>${current.temp_c}</span>
                  <sup>o</sup>
                  <span>C</span>
                </div>

                <div class="forecast-icon">
                  <img src="https:${current.condition.icon}" alt="">
        
                </div>
              </div>
              
            </div>
    
         
    
            <div class="custom ms-4 mb-4 text-info my-2">${current.condition.text}</div>
    
            <span class="ms-2 pb-4  "><img src="./images/icon-umberella.png" alt="">
            
              20%
            </span>
            <span class="ms-2  pb-4   "><img src="./images/icon-wind.png" alt="">
            
              18km/h
            </span>
            <span class="ms-2  pb-4  "><img src="./images/icon-compass.png" alt="">
            
              East
            </span>
          </div>
    
    
    
    
    
    `



document.getElementById("forecast").innerHTML = container

}


function displayAnother(forecastday){

  let respones = '';

  for (let i = 1; i < forecastday.length; i++)

    respones+=`
    
      <div class="forecast2 w-25 mx-3">
            <div class="forecast-header text-center text-white ">
              <div class="day">${new Date(forecastday[i].date).toLocaleString('en-US', { weekday: 'long' })}</div>
            
            </div>
    
            <div class="forecast-content text-center text-white">
              <div class="forecast-icon">
                <img src="https:${forecastday[i].day.condition.icon}" alt="">
              </div>
              <div class="degree">
                <div class="nums fw-bold fs-3">
                 <span> ${forecastday[i].day.maxtemp_c}</span>
                  <sup>o</sup>
                 <span>C</span>
                </div>
              </div>
              <small>
              ${forecastday[i].day.mintemp_c}
              <sup>o</sup>
              </small>
            </div>
    
      <div class="custom text-info text-center mt-3">${forecastday[i].day.condition.text}</div>
    
          

          
        </div>
    
    
    `;
    document.getElementById("forecast").innerHTML += respones

}