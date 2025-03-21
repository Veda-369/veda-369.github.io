const roles = ["Data Analyst", "Data Engineer", "Wildlife Photographer"];
let roleIndex = 0;

function changeRole() {
    document.getElementById("changingRole").textContent = roles[roleIndex];
    roleIndex = (roleIndex + 1) % roles.length;
}

setInterval(changeRole, 3000);
