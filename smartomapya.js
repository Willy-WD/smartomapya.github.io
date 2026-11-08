
// Always start the app at the role-selection page
window.onload = function () {
    localStorage.removeItem("userRole");

    // Make sure the role selection screen is visible
    const roleSelection = document.getElementById("roleSelection");

    if (roleSelection) {
        roleSelection.style.display = "block";
    }
};
  
let currentRole = "";

let blue = 0;
let red = 0;

let currentAnswer = true;

function chooseRole(role, card){
    card.classList.add("selected");
    currentRole = role;
    localStorage.setItem(
        "userRole",
        role
    );

    setTimeout(function(){
        document.getElementById("rolePage").style.display = "none";
        document.getElementById("app").style.display = "block";
      
        updateRole();
        if(role === "farmer"){
            openScreen("farmerHome");
        }

        else if(role === "student"){
            openScreen("studentHome");
        }
    },450);
}

function updateRole(){
    const roleText =
        document.getElementById("roleText");
    const profileRole =
        document.getElementById("profileRole");

    if(currentRole === "farmer"){
        roleText.innerHTML =
            "Farmer tools and smart farming support.";
        profileRole.innerHTML =
            "Farmer";
    }

    else if(currentRole === "student"){
        roleText.innerHTML =
            "Agricultural learning and research tools.";
        profileRole.innerHTML =
            "Student";
    }
}

function openScreen(screenID){
    const screens =
        document.querySelectorAll(".screen");
    screens.forEach(function(screen){
        screen.classList.remove("active");
    });

    const selected =
        document.getElementById(screenID);

    if(selected){
        selected.classList.add("active");
    }

    updateNavigation(screenID);
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}

function goHome(){
    if(currentRole === "farmer"){
        openScreen("farmerHome");
    }
      
    else if(currentRole === "student"){

        openScreen("studentHome");
    }
}

function updateNavigation(screenID){

    document
        .getElementById("homeNav")
        .classList.remove("active");

    document
        .getElementById("profileNav")
        .classList.remove("active");

    if(
        screenID === "farmerHome" ||
        screenID === "studentHome"
    ){

        document
            .getElementById("homeNav")
            .classList.add("active");
    }

    if(screenID === "profileScreen"){

        document
            .getElementById("profileNav")
            .classList.add("active");
    }
}

function switchRole(){

    document.getElementById("app").style.display =
        "none";

    document.getElementById("rolePage").style.display =
        "flex";

    currentRole = "";

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}

const imageInput =
    document.getElementById("imageInput");

const preview =
    document.getElementById("preview");

imageInput.addEventListener(
    "change",
    function(){

        const file =
            this.files[0];

        if(file){

            preview.src =
                URL.createObjectURL(file);

            preview.style.display =
                "block";
        }
    }
);

function analyzeImage(){

    const result =
        document.getElementById("aiResult");

    if(!imageInput.files.length){

        alert(
            "Please upload an image first."
        );
        return;
    }

    result.style.display =
        "block";

    result.innerHTML = `

        <h3>Analysis Result</h3>

        <strong>Crop:</strong>
        Spinach

        <br><br>

        <strong>Weed:</strong>
        Broadleaf Weed

        <br><br>

        <strong>Confidence:</strong>
        92%

        <br><br>

        <strong>Recommendation:</strong>

        <br>

        Remove weeds manually or apply
        a suitable organic herbicide.
    `;
}

const diseaseInput =
    document.getElementById("diseaseInput");

const diseasePreview =
    document.getElementById("diseasePreview");

diseaseInput.addEventListener(
    "change",
    function(){

        const file =
            this.files[0];

        if(file){

            diseasePreview.src =
                URL.createObjectURL(file);

            diseasePreview.style.display =
                "block";
        }
    }
);

function analyzeDisease(){

    const result =
        document.getElementById(
            "diseaseResult"
        );


    if(!diseaseInput.files.length){

        alert(
            "Please upload an image first."
        );

        return;

    }


    result.style.display =
        "block";


    result.innerHTML = `

        <h3>Disease Analysis</h3>

        <strong>Disease:</strong>
        Leaf Blight

        <br><br>

        <strong>Severity:</strong>
        Moderate

        <br><br>

        <strong>Cause:</strong>

        <br>

        Possible fungal infection
        caused by excess moisture.

        <br><br>

        <strong>Recommendation:</strong>

        <br>

        Remove infected leaves.

        <br>

        Apply a suitable fungicide.

        <br>

        Avoid overwatering.

        <br>

        Improve air circulation.

    `;
}

function getAdvice(){

    const soil =
        document.getElementById("soil").value;

    const weather =
        document.getElementById("weather").value;

    const color =
        document.getElementById("Color").value;

    const pests =
        document.getElementById("pests").value;

    const result =
        document.getElementById("conditionResult");

    if(
        soil === "" ||
        weather === "" ||
        color === "" ||
        pests === ""
    ){
        alert("Please complete all fields." );
        return;
    }

    let advice = "<h3>Field Recommendation</h3>";

    if(soil === "dry"){
        advice += "Irrigate the field regularly.<br>";
    }

    if(soil === "moist"){
        advice += "Soil moisture is suitable for many crops.<br>";
    }

    if(soil === "wet"){
        advice += "Improve drainage to prevent root problems.<br>";
    }

    if(weather === "sunny"){
        advice += "Monitor crops for heat stress.<br>";
    }

    if(weather === "rainy"){
        advice += "Watch for fungal diseases and pests.<br>";
    }

    if(weather === "windy"){
        advice += "Consider windbreaks to protect crops.<br>";
    }

    if(color === "yellow"){
        advice += "Possible nitrogen deficiency. Check crop nutrition.<br>";
    }

    if(color === "green"){
        advice += "Crop health appears good. Continue monitoring.<br>";
    }

    if(pests === "yes"){
        advice += "Inspect crops and apply suitable pest control.<br>";
    }

    if(pests === "no"){
        advice += "Continue regular crop monitoring.<br>";
    }

    advice += "<br><strong>Suggested Crops:</strong><br>";

    if(soil === "dry"){
        advice += "Millet<br>Sorghum<br>";
    }

    if(soil === "moist"){
        advice += "Maize<br>Spinach<br>Tomatoes<br>";
    }

    if(soil === "wet"){
        advice += "Rice<br>Sugarcane<br>";
    }

    result.style.display = "block";
    result.innerHTML = advice;
}

function showTopic(topic){
    const result =
        document.getElementById( "researchResult");
    result.style.display = "block";

    if(topic === "soil"){
        result.innerHTML = `
            <h3>Soil Science</h3>

            Healthy soil provides nutrients,
            water and support for crops.

            <br><br>

            Common soil types include sandy,
            clay and loam soils.

            <br><br>

            Loam soil is considered suitable
            for many crops.`;
    }

    else if(topic === "disease"){
        result.innerHTML = `
            <h3>Crop Diseases</h3>

            Crop diseases can be caused by
            fungi, bacteria, viruses or pests.

            <br><br>

            Regular inspection and early
            treatment can help prevent
            serious crop damage.`;
    }

    else if(topic === "climate"){
        result.innerHTML = `
            <h3>Climate Change</h3>

            Climate change affects rainfall,
            temperature and crop production.

            <br><br>

            Farmers can adapt by using
            drought-resistant crops and
            efficient irrigation.`;
    }

    else if(topic === "precision"){
        result.innerHTML = `
            <h3>Precision Agriculture</h3>

            Precision agriculture uses
            technologies such as GPS,
            sensors, drones and AI.

            <br><br>

            These technologies can help
            improve farming efficiency
            and reduce waste.`;
    }

    else if(topic === "livestock"){
        result.innerHTML = `
            <h3>Livestock Husbandry</h3>

            Livestock farming involves
            caring for animals such as
            cattle, goats, sheep and poultry.

            <br><br>

            Proper animal management helps
            support production of meat,
            milk and eggs.`;
    }
}

function selectLevel(level){
    const quizArea =
        document.getElementById( "quizArea");
    const question =
        document.getElementById( "question");
    quizArea.style.display = "block";

    if(level === "89"){
        question.innerHTML = "Plants make their own food. True or False?";
        currentAnswer = true;
    }

    else if(level === "1011"){
        question.innerHTML = "Nitrogen helps leaf growth. True or False?";
        currentAnswer = true;
    }

    else if(level === "AS"){
        question.innerHTML = "Xylem transports sugars. True or False?";
        currentAnswer = false;
    }
}

function answer(choice){
    if(choice === currentAnswer){
        blue++;
    }

    else{
        red++;
    }

    document.getElementById(
        "score"
    ).innerHTML =
        "Blue: " + blue +
        " | Red: " + red;

    if(blue >= 5){
        alert("Blue Team Wins!");
        blue = 0;
        red = 0;
    }

    if(red >= 5){
        alert("Red Team Wins!");
        blue = 0;
        red = 0;
    }
}

window.addEventListener("load",
    function(){
        const savedRole =
            localStorage.getItem("userRole");

        if(savedRole){
            currentRole = savedRole;
            document.getElementById("rolePage"
            ).style.display = "none";
            document.getElementById("app"
            ).style.display = "block";

            updateRole();

            if(savedRole === "farmer"){
                openScreen("farmerHome");
            }
              
            else if(savedRole === "student"){
                openScreen("studentHome");
            }
        }
    }
);
