import Swal from 'sweetalert2/dist/sweetalert2.js';

const alert = {
    success: msg => {
        Swal.fire({
            icon: "success",
            position: "top-end",
            showConfirmButton: false,
            toast: "true",
            timer: 5000,
            text: "   " + msg
        });
    },
    promptDelete: (deleteFn, data = '') => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0C0C0C",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete !"
        }).then(result => {
            if (result.value) {
                deleteFn(data);
            }
        });
    },
    promptSure: (deleteFn, data = '') => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#192B3E",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, am Sure!"
        }).then(result => {
            if (result.value) {
                deleteFn(data);
            }
        });
    },
    promptAction: (callFn, msg = '',data='') => {
        Swal.fire({
            title: "Are you sure?",
            text: msg.length==0?"You won't be able to revert this!":msg,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#192B3E",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, am Sure!"
        }).then(result => {
            if (result.value) {
                callFn(data);
            }
        });
    },
    promptWithContent: (placeholder, callFn, param) => {
        Swal.fire({
            input: 'text',
            inputPlaceholder: placeholder,
            showCancelButton: true
        }).then(result => {
            if (result.value) {
                callFn(result.value, param);
            }
        })
    },
    error: msg => {
        Swal.fire({
            icon: "error",
            position: "center",
            showConfirmButton: false,
            timer: 5000,
            html: " " + msg
        });
    },
    success_center: msg => {
        Swal.fire({
            icon: "success",
            position: "center",
            showConfirmButton: false,
            timer: 5000,
            text: "   " + msg
        });
    },
    info_center: msg => {
        Swal.fire({
            icon: "info",
            position: "center",
            showConfirmButton: false,
            // timer: 5000,
            text: "   " + msg
        });
    },
    info_center_html: msg => {
        Swal.fire({
            icon: "info",
            position: "center",
            showConfirmButton: false,
            // timer: 5000,
            html: "   " + msg
        });
    }
}

export { alert }