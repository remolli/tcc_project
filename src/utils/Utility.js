const Swal = require('sweetalert2')
class Utility {
    static handleError(error){
        console.log('----Ocorreu um erro----')
        console.log(error);
        // console.log(error)
        // let errorMessage = msg || i18n.t('general.error');
        // if (error.response && error.response.data && error.response.data.message) {
        //     errorMessage = error.response.data.message;
        // }
        this.errorSnackBar('Ops! Ocorreu um erro, Tente novamente');
    }
    static successSnackBar(message){
        Swal.fire({
            position: "bottom-right",
            title: "<div style='display:flex; align-items:center; color:white; font-size:17px; font-weight:400;' class='font-quicksand'>" + message + "</div>",
            icon: null,
            showConfirmButton: false,
            timer: 4000,
            background: '#19B377',
            customClass: {
                popup: 'custom-swal-popup',
                title: 'custom-swal-title',
            },
            backdrop: false,
        });
    }
    static errorSnackBar(message){
        Swal.fire({
            position: "bottom-right",
            title: "<div style='display:flex; align-items:center; color:white; font-size:17px; font-weight:400;' class='font-quicksand'>" + message + "</div>",
            icon: null,
            showConfirmButton: false,
            timer: 4000,
            background: '#F4483B',
            customClass: {
                popup: 'custom-swal-popup',
                title: 'custom-swal-title',
            },
            backdrop: false,
        });
    }
}
export default Utility;