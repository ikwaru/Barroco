
/* Aquesta funció és per a què les fotos s'obrin en gran i a més mostrin el text que li he posat */

function obrirfoto(imgElement) {
    const galeriagran = document.getElementById('galeriagran');
    const galeriagranImg = document.getElementById('galeriagran-img');
    const títol_obra = document.getElementById('títol_obra');

    galeriagran.style.display = 'flex'; 
    galeriagranImg.src = imgElement.src; 
    títol_obra.textContent = imgElement.getAttribute('data-title');
}

function tancarfoto() {
    const galeriagran = document.getElementById('galeriagran');
    galeriagran.style.display = 'none'; 
}

/* Això és per a que la secció canvïi les dues columnes quan utilitzes la barra de navegació,
perquè per defecte solament et deixa dirigir-te a una única secció */

function canviar_galeria(seccioId) {
    const seccio = document.getElementById(seccioId);
    if (seccio) {
        seccio.scrollIntoView({ behavior: 'auto' });
    }
}