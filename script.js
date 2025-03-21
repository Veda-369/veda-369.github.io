async function loadSections() {
    document.getElementById("projectsContent").innerHTML = await (await fetch("projects.html")).text();
    document.getElementById("techStackContent").innerHTML = await (await fetch("techstack.html")).text();
    document.getElementById("photographyContent").innerHTML = await (await fetch("photography.html")).text();
    document.getElementById("contactContent").innerHTML = await (await fetch("contact.html")).text();
}
loadSections();
