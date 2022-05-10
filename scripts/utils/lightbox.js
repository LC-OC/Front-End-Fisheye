const lightbox = document.getElementById("lightboxDiv");


function closeLightbox() {
    lightbox.style.display = "none";
}

document.addEventListener('keydown', function(e) {
    let keyCode = e.keyCode;
    if (keyCode === 27) {
        closeLightbox();
    }
})


