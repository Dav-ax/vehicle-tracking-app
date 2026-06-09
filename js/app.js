const app = document.getElementById("app");

// Simulación de estados

const APP_STATE = "loading";

// loading
// error
// success

switch(APP_STATE){

    case "loading":
        loadView("../views/loading.html");
        break;

    case "error":
        loadView("../views/error.html");
        break;

    case "success":
        loadView("../views/fleet.html");
        break;
}

async function loadView(view){

    const response = await fetch(view);

    const html = await response.text();

    app.innerHTML = html;
}