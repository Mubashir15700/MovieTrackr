import Swal from "sweetalert2";

const ConfirmationDialog = {
    confirmAction: (
        title: string = "Are you sure?",
        text: string = "Are you sure you want to proceed?",
        confirmButtonText: string = "Confirm",
        confirmButtonColor: string = "#007bff",
        cancelButtonText: string = "Cancel",
    ) => {
        return Swal.fire({
            title,
            text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor,
            cancelButtonColor: "#6c757d",
            cancelButtonText,
            confirmButtonText,
        });
    },
};

export default ConfirmationDialog;
