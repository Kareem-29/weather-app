

const container = document.querySelector('.container');
const search = document.querySelector('.search-bar button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');



window.addEventListener('keydown', handleKeyboardInput);
function handleKeyboardInput(event){
    const key = event.key;
    if (key === 'Enter'){
        searchcity();
    }
}

function searchcity(){

   const APIKey = 'f20190b2899ddfc862558e0f46a6b3fd'; 
   const city = document.querySelector('.search-bar input').value;

   if(city === '')
    return;

   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {
        if(json.cod === '404'){
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display= 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display= 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch(json.weather[0].main){
            case 'Clear':
                image.src = 'img/clear.png'
                break;
            
            case 'Rain':
                image.src = 'img/rain.png'
                break;
                
            case 'Clouds':
                image.src = 'img/cloud.png'
                break;

            case 'Mist':
                image.src = 'img/mist.png'
                break;

            case 'Snow':
                image.src = 'img/snow.png'
                break;

            default:
                image.scr = '';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px' 
       
    });
};

