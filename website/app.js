/* Global Variables */

const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "98955c5e32bba4ba6b565b90f92c1f68&units=imperial";

let button = document.querySelector('#generate');

let weather = async function (url) {

    return await fetch(url)
        .then(response => response.json())
        .then(data => data)


}


const generator = async function () {


    const zip = document.querySelector("#zip").value;
    const url = baseURL + zip + "&appid=" + apiKey;
    let content = document.querySelector("#feelings").value;

    let weatherData = await weather(url);
    console.log(weatherData.main.temp);
    let temp = weatherData.main.temp;


    // Create a new date instance dynamically with JS
    let d = new Date();
    let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();



    let data = {
        date: newDate,
        temp: temp,
        content: content
    }

    // await updateUI();

    await postData("/projectData", data);
   await updateUI()

}

const getData = async function (url) {

    let response = await fetch(url)
    try {
        let data = await response.json();
        console.log(data);
        return data;

    } catch (err) {
        console.log(err);
    }

}

const postData = async function (url, data) {

    const response = await fetch(url, {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return (await response.json()).data;

}


const updateUI = async function (data = null) {
    const dateDiv = document.getElementById('date');
    const tempDiv = document.getElementById('temp');
    const contentDiv = document.getElementById('content');
    let UI_Data = await getData("/projectData");


    //Updating the UI
    dateDiv.innerHTML = UI_Data.date;
    tempDiv.innerHTML = UI_Data.temp;
    contentDiv.innerHTML = UI_Data.content;
}


button.addEventListener("click", generator);
