document.addEventListener("DOMContentLoaded",()=>{
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
    const btns = document.querySelectorAll(`btn-cu-eliminar`);
    console.log(btns);
    btns.forEach(btn => {
        btn.onclick = () => {
            console.log("AJAX");
            const id_casoUso = btn.dataset.idCU;
            fetch(`http://localhost:3000/proyecto/${id_proyecto}/casos-uso`, {
                method: "DELETE",
                body: JSON.stringify({ id_casoUso: id_casoUso }),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken
                }
            }).then(response => { return response; }).catch(err => console.log(err));
        }
    });
    
});