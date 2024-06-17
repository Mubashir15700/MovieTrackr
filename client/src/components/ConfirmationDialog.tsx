import Swal from "sweetalert2";

const ConfirmationDialog = {
    confirmAction: (
        title: string = "Are you sure?",
        text: string = "Are you sure you want to proceed?",
        confirmButtonText: string = "Confirm",
        confirmButtonColor: string = "#3085d6",
        cancelButtonText: string = "Cancel",
    ) => {
        return Swal.fire({
            title,
            text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor,
            cancelButtonColor: "#5bc0de",
            cancelButtonText,
            confirmButtonText,
        });
    },
};

export default ConfirmationDialog;
