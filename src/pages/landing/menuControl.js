const menuInput = document.querySelector("#menuInput")

menuInput.addEventListener("change", (e) => {
    document.body.style.overflow = e.target.checked ? "hidden" : ""
})