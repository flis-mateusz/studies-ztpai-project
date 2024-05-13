import Swal from "sweetalert2";

export const DefaultSwalToast = Swal.mixin({
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
})

export const DefaultSuccessSwalToast = () => {
    DefaultSwalToast.fire({
        icon: 'success',
        text: 'Sukces'
    })
}