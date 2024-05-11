import Swal from "sweetalert2";

export const DefaultSwalToast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
})

export const DefaultSuccessSwalToast = () => {
    DefaultSwalToast.fire({
        icon: 'success',
        text: 'Sukces'
    })
}