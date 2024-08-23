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
    static successSnackBar(message, timer){
        Swal.fire({
            position: "bottom-right",
            title: "<div translate=\"no\" style='display:flex; align-items:center; color:white; font-size:17px; font-weight:400;' class='font-quicksand'>" + message + "</div>",
            icon: null,
            showConfirmButton: false,
            timer: timer,
            background: '#19B377',
            customClass: {
                popup: 'custom-swal-popup',
                title: 'custom-swal-title',
            },
            backdrop: false,
        });
    }
    static errorSnackBar(message, timer){
        Swal.fire({
            position: "bottom-right",
            title: "<div translate=\"no\" style='display:flex; align-items:center; color:white; font-size:17px; font-weight:400;' class='font-quicksand'>" + message + "</div>",
            icon: null,
            showConfirmButton: false,
            timer: timer,
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