console.log("IT’S ALIVE!");

function $$ (selector, context = document) {
	return Array.from(context.querySelectorAll(selector));
}

// let navLinks = $$("nav a");

// let currentLink = navLinks.find(a => a.host === location.host && a.pathname === location.pathname);
// currentLink?.classList.add("current");

let pages = [
    {url: "", title: "Home"},
    {url: "contact/", title: "Contacts"},
    {url: "CV/", title: "CV"},
    {url: "projects/", title: "Projects"}
];

let nav2 = document.createElement("nav");
document.body.append(nav2);

for (let p of pages) {
    let url = p.url;
    let title = p.title;
    // nav2.insertAdjacentHTML("beforeend", `<a href="${ url }">${ title }</a>` );
    
    let a = document.createElement("a");
    a.href = url;
    a.textContent = title;
    nav2.append(a);

    const ARE_WE_HOME = document.documentElement.classList.contains("home");
    url = !ARE_WE_HOME && !url.startsWith("http") ? "../" + url : url;

    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add("current");
        a.classList.toggle("current", a.host === location.host && a.pathname === location.pathname);
    }
}
