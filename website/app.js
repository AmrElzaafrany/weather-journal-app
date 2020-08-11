/* Global Variables */

const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "98955c5e32bba4ba6b565b90f92c1f68";

let button = document.querySelector('#generate');

let weather = async function (url) {

    return await fetch(url)
        .then(response => response.json())
        .then(data => data)


}


const generator = async function () {
    await updateUI();

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
    console.log(data);

    await updateUI(data);
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
    let UI_Data;
    //Get data from owr own server
    if (data == null) {
        UI_Data = await getData("/projectData");
    } else {
        UI_Data = await postData("/projectData", data);
    }
    console.log(UI_Data);

    //Updating the UI
    dateDiv.innerText = UI_Data.date;
    tempDiv.innerText = UI_Data.temp;
    contentDiv.innerText = UI_Data.content;
}


button.addEventListener("click", generator);
