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
    static questionSnackBar(message, then){
        Swal.fire({
            position: "center",
            title: message,
            icon: "question",
            showConfirmButton: true,
            showCancelButton: true,
            customClass: {
                popup: 'custom-swal-popup',
                title: 'custom-swal-title',
            },
            backdrop: true,
        }).then((result)=>{
            if(result.isConfirmed && then) then();
        });
    }
    static successSnackBar(message, timer, then){
        Swal.fire({
            position: "center",
            title: message,
            icon: "success",
            showConfirmButton: true,
            timer: timer,
            customClass: {
                popup: 'custom-swal-popup',
                title: 'custom-swal-title',
            },
            backdrop: true,
        }).then(()=>{
            if(then) then();
        });
    }
    static errorSnackBar(message, timer){
        Swal.fire({
            position: "center",
            title: message,
            icon: "error",
            showConfirmButton: true,
            timer: timer,
            customClass: {
                popup: 'custom-swal-popup',
                title: 'custom-swal-title',
            },
            backdrop: true,
        });
    }
}
export default Utility;