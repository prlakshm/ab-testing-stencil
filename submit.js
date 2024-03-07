window.addEventListener("DOMContentLoaded", () => {
    const dialog = document.querySelector("dialog");
    const openDialog = document.getElementById("working-button");
    if (openDialog) {
        openDialog.addEventListener("click", () => {
            dialog.showModal();
        });
    }
});
