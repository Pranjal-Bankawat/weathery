let appController = (() => {
    let dayUserOn = 0;
    let currentWeatherL;
    let currentWeatherM;
    return{
        setDay : (flag = 0) => {
            if(flag == -1){
                if(dayUserOn > 0){ dayUserOn--; }
            }
            else if(flag == 1){
                if(dayUserOn <= 4){ dayUserOn++; }
            }

            return dayUserOn;
        },

        saveWeatherInfo : weather => {
            currentWeatherL = weather[0];
            currentWeatherM = weather[1];
        },

        giveWeatherInfo : () =>{
            return [currentWeatherL,currentWeatherM];
        },

        testing : () => {
            console.log(currentWeatherL[0]);
        }
    }
})();

let displayController = (() => {
    
    let formatNumber = num => {
        newNum = num.toFixed(2);
        return newNum;
    }

    let dataShow = (obj,more='') => {
        document.querySelector(`.${more}max-temp p`).innerHTML = `${formatNumber(obj.max_temp)}`;
        document.querySelector(`.${more}curr-temp p`).innerHTML = `${formatNumber(obj.the_temp)}`;
        document.querySelector(`.${more}min-temp p`).innerHTML = `${formatNumber(obj.min_temp)}`;
        document.querySelector(`.${more}humidity p`).innerHTML = `${obj.humidity}`;
        document.querySelector(`.${more}weather-state p`).innerHTML = `${obj.weather_state_name}`;
        document.querySelector(`.${more}wind-direction p`).innerHTML = `${obj.wind_direction_compass}`;
    }

    let dataClear = (more='') => {
        document.querySelector(`.${more}max-temp p`).innerHTML = ``;
        document.querySelector(`.${more}curr-temp p`).innerHTML = ``;
        document.querySelector(`.${more}min-temp p`).innerHTML = ``;
        document.querySelector(`.${more}humidity p`).innerHTML = ``;
        document.querySelector(`.${more}weather-state p`).innerHTML = ``;
        document.querySelector(`.${more}wind-direction p`).innerHTML = ``;
    }
    return {
        getId : async () =>{
            let inputPlace = document.querySelector('.search-box').value;
            let idJSON = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${inputPlace}`);
            let id = await idJSON.json();
            let placeId = id[0].woeid;
            return placeId;
        },
        getData : async id =>{
            let infoJSON = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${id}`);
            let info = infoJSON.json();
            return info;
        },
        clearData : () => {
            dataClear();
        },
        showData : (weatherObj,day = 0) => {
            let weatherOfTheDay = weatherObj[day];
            dataShow(weatherOfTheDay);
        },
        showMoreData : (weatherObjBasic,weatherObjAdvance,day = 0) => {
            let weatherOfTheDayB = weatherObjBasic[day];
            let weatherOfTheDayA = weatherObjAdvance;
            let add = 'show-more_';

            document.querySelector(`.${add}title p`).innerHTML = `${weatherOfTheDayA.title}`;
            document.querySelector(`.${add}location p`).innerHTML = `${weatherOfTheDayA.location_type}`;
            document.querySelector(`.${add}time-zone p`).innerHTML = `${weatherOfTheDayA.timezone_name}`;
            document.querySelector(`.${add}air-pressue p`).innerHTML = `${formatNumber(weatherOfTheDayB.air_pressure)}`;
            document.querySelector(`.${add}visibility p`).innerHTML = `${formatNumber(weatherOfTheDayB.visibility)}`;
            document.querySelector(`.${add}predictability p`).innerHTML = `${weatherOfTheDayB.predictability}`;

            dataShow(weatherOfTheDayB,add);
        },
        clearMoreData : () =>{
            let add = 'show-more_';
            dataClear(add);
        },
        showBtn : (curr = 0) => {
            if(curr == 0){
                document.querySelector('.navigate-right').style.visibility = 'visible';
                document.querySelector('.navigate-left').style.visibility = 'hidden';
            }
            else if(curr > 0 && curr <4){
                document.querySelector('.navigate-left').style.visibility = 'visible';
                document.querySelector('.navigate-right').style.visibility = 'visible';
            }
            else if(curr == 4){
                document.querySelector('.navigate-right').style.visibility = 'hidden';
            }
        },
        hideBtn : ()=> {
            document.querySelector('.navigate-right').style.visibility = 'hidden';
            document.querySelector('.navigate-left').style.visibility = 'hidden';
        },
        dayAndTime : () =>{   
            let day = new Date();
            let hours = new Date();
            let minutes = new Date();
            let currDay = day.getDay();
            let currHours = hours.getHours();
            let currMinutes = minutes.getMinutes();

            if(currHours > 12){
                currHours -= 12;
                document.querySelector('.am_pm').innerHTML = 'pm';
            }
            else{
                document.querySelector('.am_pm').innerHTML = 'am';
            }
            
            let daysArr = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
            document.querySelector('.time').innerHTML = `${currHours}:${currMinutes}`;
            document.querySelector('.day').innerHTML = `${daysArr[currDay]}`;
            document.getElementById('dayAndDate-name_js').classList.add('dayAndDate_slider');

        },
        showCol : () =>{
            const divList = document.querySelectorAll('.output div');
            divList.forEach(e=>{
                let id = e.id;
                if(id == 'js_box_1' || id == 'js_box_4')
                document.getElementById(`${id}`).classList.add('col1');
                else if(id == 'js_box_2' || id == 'js_box_5')
                document.getElementById(`${id}`).classList.add('col2');
                else if(id == 'js_box_3' || id == 'js_box_6')
                document.getElementById(`${id}`).classList.add('col3');
            });
        },
        hideCol : () =>{
            const divList = document.querySelectorAll('.output div');
            divList.forEach(e=>{
                let id = e.id;
                if(id == 'js_box_1' || id == 'js_box_4')
                document.getElementById(`${id}`).classList.remove('col1');
                else if(id == 'js_box_2' || id == 'js_box_5')
                document.getElementById(`${id}`).classList.remove('col2');
                else if(id == 'js_box_3' || id == 'js_box_6')
                document.getElementById(`${id}`).classList.remove('col3'); 
            });
        },
        cityNameShow : () =>{
            let inputPlace = document.querySelector('.search-box').value;
            document.querySelector('.city-name').innerHTML = `${inputPlace}`;
            document.getElementById('city-name_js').classList.add('city-name_slider');
        },
        cityNameHide : () =>{
            document.querySelector('.city-name').innerHTML = ``;
            document.getElementById('city-name_js').classList.remove('city-name_slider');
            document.getElementById('dayAndDate-name_js').classList.remove('dayAndDate_slider');
        },
        clearField : () =>{
            document.querySelector('.search-box').value = '';
            document.querySelector('.search-box').blur();
        }
    }
})();

let globalController = ((appCtrl,displayCtrl) => {
    //Setup of all the eventlistners
    let setupEventListners = () => {

        document.querySelector('.search-icon').addEventListener('click',searchPlace);
        
        document.addEventListener('keypress', function(e) {
            if(e === 13 || e.which === 13)
                searchPlace();
        });
        const navigateBtns = document.querySelectorAll('.navigate-page');
        navigateBtns.forEach(e => {
            e.addEventListener('click',changePageContent);
        });

        document.querySelector('.more-details').addEventListener('click',showMore);

        document.querySelector('.close-icon').addEventListener('click',closeShowMore);
    }

    let giveData = async () => {
        let woeid = await displayCtrl.getId(); //getting the id
        let weatherAll = await displayCtrl.getData(woeid);  //getting the data for 5 days
        let weather = await weatherAll.consolidated_weather;  //Filtering the data
        return [weather,weatherAll];
    }

    //Saving input
    let searchPlace = async () => {
        
        //Preparing UI for the info to show
        displayCtrl.hideCol();
        displayCtrl.cityNameHide();
        displayCtrl.clearData();
        displayCtrl.clearMoreData();
        displayCtrl.hideBtn();
        document.getElementById('more-details_js').classList.remove('more-details_show');

        let currWeather = await giveData();   //Getting the weather
        appCtrl.saveWeatherInfo(currWeather);   //Saving the info of curr weather
        displayCtrl.showData(currWeather[0]);  //Displaying the data
        displayCtrl.showMoreData(currWeather[0],currWeather[1]);

        //Animating back all the elements of the page
        displayCtrl.showCol();
        displayCtrl.cityNameShow();
        displayCtrl.dayAndTime();
        displayCtrl.showBtn();
        displayCtrl.clearField();

        document.getElementById('more-details_js').classList.add('more-details_show');        
    }

    //Changing data as day changes
    let changePageContent = e =>{

        let targetBtn = e.target.classList[0]; //getting the class of the clicked button
        let flag = 0;
        let currentWeather = appCtrl.giveWeatherInfo();
        if(targetBtn == 'prev-page'){
            flag = -1;
            let day = appCtrl.setDay(flag);
            displayCtrl.showBtn(day);
            displayCtrl.clearData();
            displayCtrl.clearMoreData();
            displayCtrl.showMoreData(currentWeather[0],currentWeather[1],day);
            displayCtrl.showData(currentWeather[0],day);
        }
        else if(targetBtn == 'next-page'){
            flag = 1;
            let day = appCtrl.setDay(flag);
            displayCtrl.showBtn(day);
            displayCtrl.clearData();
            displayCtrl.clearMoreData();
            displayCtrl.showMoreData(currentWeather[0],currentWeather[1],day);
            displayCtrl.showData(currentWeather[0],day);
        }

    }

    //Adding functionality to show more btn
    let showMore = () =>{
        document.querySelector('.output').style.opacity = '0';
        document.getElementById('show-more_js').classList.add('show-more_slider');
    }

    let closeShowMore = () => {
        document.querySelector('.output').style.opacity = '1';
        document.getElementById('show-more_js').classList.remove('show-more_slider');
    }

    return {
        init : () => setupEventListners()
    }
})(appController,displayController);

globalController.init();
