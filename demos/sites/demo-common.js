function demoToast(message) {
  let el = document.getElementById("demo-toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "demo-toast";
    el.setAttribute("role", "status");
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(demoToast._timer);
  demoToast._timer = setTimeout(() => el.classList.remove("show"), 2800);
}

function demoCta(message) {
  demoToast(message);
}
