import Cookies from 'js-cookie';
const Swal = require('sweetalert2');

class Utility {
    static handleError(error){
        if(error?.response?.status==401)
            Cookies.deleteToken();
        else this.errorSnackBar('Ops! Ocorreu um erro, Tente novamente');
    }
    static questionSnackBar(message, then){
        Swal.fire({
            position: "center",
            title: message,
            icon: "question",
            showConfirmButton: true,
            confirmButtonText: "OK",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
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
    static numbers(value){
        const list = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        var sum = Number(value.replace(/\D/g, ''));
        value.split('').forEach(l=>{
            var idx = list.findIndex(x=>x==l);
            sum+=idx;
        })
        sum = sum * Number(process.env.VUE_APP_NUMBER)
        return sum;
    }
}
export default Utility;