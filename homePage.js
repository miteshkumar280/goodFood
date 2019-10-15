postDataURL = "http://localhost:3001/foodAPI/postFood"
getDataURL = "http://localhost:3001/foodAPI/getFood"
similarFood = "http://localhost:3001/foodAPI/getSimilarFood"
var ingredient1;
var ingredient2;
var ingredient3;
var youtubeLink;
var showHomePage = false;
dataArray = [];
var data;

function postData(postData) {
    if(postData == false){
    data = {
        "ingredient1": document.getElementById("ingredient1").value.toString(),
        "ingredient2": document.getElementById("ingredient2").value.toString(),
        "ingredient3": document.getElementById("ingredient3").value.toString(),
    }
}
else{
    data = {
        "ingredient1": document.getElementById("postIngredient1").value.toString(),
        "ingredient2": document.getElementById("postIngredient2").value.toString(),
        "ingredient3": document.getElementById("postIngredient3").value.toString(),
        "youtubeId" :  document.getElementById("youtubeLink").value.toString(),
    }
    dataArray.push(data);
}
}

function getFoodValue(postData) {
    if(postData == true){
        ingredient1 = document.getElementById("postIngredient1").value;
        ingredient2 = document.getElementById("postIngredient2").value;
        ingredient3 = document.getElementById("postIngredient3").value;
        youtubeId = document.getElementById("youtubeLink").value.toString();
    }
    else{
        ingredient1 = document.getElementById("ingredient1").value;
        ingredient2 = document.getElementById("ingredient2").value;
        ingredient3 = document.getElementById("ingredient3").value;
    }
}

function validation(postData) {
    getFoodValue(postData);
    if (ingredient1 == "" || ingredient2 == "" || ingredient3 == "") {
        alert("Please Enter all the Fields");
        return false;
    }
    else if(postData == true){
        if(youtubeId == ""){
            alert("Please Enter all the Fields");
            return false;
        }
        else{
            return true;
        }
    }
    else {
        return true;
    }
}

function getFood() {
    getValidation = validation(false);
    if (getValidation) {
        postData(false);
        getFoodLogs(data);
    }
}


function clearForm() {
    document.getElementById("form").reset();
}

function clearPostForm() {
    document.getElementById("postForm").reset();
}


function getFoodLogs(data) {
    console.log(data)
    axios.post(getDataURL, data)
        .then(res => {
            var dataArray = (res);
            console.log(dataArray);
            if(dataArray.data.length == 0){
                alert("No Match Found")
            }
            else{
            for (let i = 0; i < dataArray.data.length; i++) {
                document.getElementById("getFoodLogs").append(dataArray.data[i].ingredient1 + "," + dataArray.data[i].ingredient2 + "," + dataArray.data[i].ingredient3 +
                    "," + dataArray.data[i].youtubeId) + "\n"

                document.getElementById("youtubeLink").append("<a href=" + dataArray.data[i].youtubeId + " rel=" + external + ">" + "Google" + "</a>")
            }
        }
            alert(JSON.stringify(res));
        });
}


function similar() {
    console.log(data)
    axios.post(similarFood, data)
        .then(res => {
            var dataArray = (res);
            console.log(dataArray);
            if(dataArray.data.length == 0){
                alert("No Match Found")
            }
            else{
            for (let i = 0; i < dataArray.data.length; i++) {
                document.getElementById("getFoodLogs").append(dataArray.data[i].ingredient1 + "," + dataArray.data[i].ingredient2 + "," + dataArray.data[i].ingredient3 +
                    "," + dataArray.data[i].youtubeId) + "\n"

                document.getElementById("youtubeLink").append("<a href=" + dataArray.data[i].youtubeId + " rel=" + external + ">" + "Google" + "</a>")
            }
        }
            alert(JSON.stringify(res));
        });
}


function storeFoodData() {
    getValidation = validation(true);
    if(getValidation){
    postData(true);
    axios.post(postDataURL, dataArray)
        .then(res => {
            alert("success in saving Data")
            showHomePage = true;
        });
    }
}