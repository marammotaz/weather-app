// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();


//API URL
const URL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Personal API Key for OpenWeatherMap API
const myAPI = ",&appid=816068a55b1e887df6da0988c48b2ffc&units=metric";

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", generate);


/* Function called by event listener */
// tried not to use try and catch in all functions so here i used .then
function generate() {
  const countryZip = document.querySelector("#zip").value;
  const yourFeelings = document.querySelector("#feelings").value;
  
  getData(URL, countryZip, myAPI).then((data) => {
    console.log(data);
    if (data.cod !== 200)
      return alert("Please enter correct zip code")
    postData("/add", {date: newDate, city: data.name, temp: data.main.temp, content: yourFeelings,});
    UIupdate();
  });
}

/* Function to GET Web API Data*/
// tried not to use try and catch in all functions so here i tried to make it in one step
const getData = async (URL, countryZip, myAPI) => {
    return await (await fetch(URL + countryZip + myAPI)).json();
};

/* Function to POST data */
// by using try and catch this time
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const entry = await response.json();
    console.log(entry);
    return entry;
  } catch (error) {
    console.log(error);
  }
};

/* Function to GET Project Data and update UI*/
const UIupdate = async () => {
  const req = await fetch("/all");

  try {
    const details = await req.json();

    document.getElementById("date").innerHTML = `Today's Date: ${details.date}`;
    document.getElementById("city").innerHTML = `City: ${details.city}`;
    document.getElementById("temp").innerHTML = `The Temp is: ${Math.round(details.temp)} &degC`;
    document.getElementById("content").innerHTML = `I am feeling ${details.content}`;
  } catch (error) {
    console.log(error);
  }
};
