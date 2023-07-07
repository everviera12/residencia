// // dataTables jQuery
$(document).ready(function () {
  $("#tabla-productos").DataTable({
    responsive: true,
  });
});

// alerta para confirmar alta de producto


// alerta de eliminar un producto
function confirmar(id_producto) {
  Swal.fire({
    title: "Do you want to delete the register?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Confirm",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Eliminando registro...",
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        setTimeout(() => {
          window.location = "/delete/" + id_producto;
        }, 1000);
        Swal.fire({
          title: "Successfully deleted",
          icon: "success",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      });
    }
  });
}
