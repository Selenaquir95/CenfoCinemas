

function UserViewController() {
    this.ViewName = "Users";
    this.ApiEndPointName = "User";

    //Metodo Constructor
    this.InitView = function () {
        console.log("User init view --> ok");
        this.LoadTable();

        //Asignar eventos a los botones
        $('#btnCreate').click(function () {
            var vc = new UserViewController();
            vc.Create();
        });
        $('#btnUpdate').click(function () {
            var vc = new UserViewController();
            vc.Update();
        });
        $('#btnDelete').click(function () {
            var vc = new UserViewController();
            vc.Delete();
        });
        $('#btnSearchById').click(function () {
            var vc = new UserViewController();
            vc.LoadTableById();
        });
        $('#btnSearchByUserCode').click(function () {
            var vc = new UserViewController();
            vc.LoadTableByUserCode();
        });
        $('#btnSearchByEmail').click(function () {
            var vc = new UserViewController();
            vc.LoadTableByEmail();
        });
    }

    //Metodo cargar tabla
    this.LoadTable = function () {

        //URL del API a invocar
        //https://localhost:7147/api/User/RetrieveAll

        var ca = new ControlActions();
        var service = this.ApiEndPointName + "/RetrieveAll";
        var urlService = ca.GetUrlApiService(service);


        var columns = [];
        columns[0] = { 'data': 'id' }
        columns[1] = { 'data': 'userCode' }
        columns[2] = { 'data': 'name' }
        columns[3] = { 'data': 'email' }
        columns[4] = { 'data': 'birthDate' }
        columns[5] = { 'data': 'status' }

        $('#tblUser').dataTable({
            "ajax": {
                url: urlService,
                "dataSrc": ""
            },
            columns: columns
        });
        //asignar eventos de carga de datos o bindin segun la tabla
        $('#tblUser tbody').on('click', 'tr', function () {

            //Extraemos la fila y los datos de la tabla
            var row = $(this).closest("tr");

            //extraemos el DTO
            //Esto nos devuelve el json de la fila seleccionada por el usuario
            //Segun la data devuelta por el API
            var userDTO = $('#tblUser').DataTable().row(this).data();

            //Binding en el form
            $('#txtId').val(userDTO.id);
            $('#txtUserCode').val(userDTO.userCode);
            $('#txtName').val(userDTO.name);
            $('#txtEmail').val(userDTO.email);
            $('#txtStatus').val(userDTO.status);

            //fecha tiene un formato
            var onlyDate = userDTO.birthDate.split("T");
            $('#txtBDate').val(onlyDate[0]);
        })
    }
    this.Create = function () {
        var userDTO = {};
        //Atributos con valores default, que son coltrolados por el API
        userDTO.id = 0;
        userDTO.created = "2025-01-01";
        userDTO.updated = "2025-01-01";

        //Valores capturados en pantalla
        userDTO.userCode = $('#txtUserCode').val();
        userDTO.name = $('#txtName').val();
        userDTO.email = $('#txtEmail').val();
        userDTO.status = $('#txtStatus').val();
        userDTO.birthDate = $('#txtBDate').val();
        userDTO.password = $('#txtPassword').val();

        //Enviar la data al API
        var ca = new ControlActions();
        var urlService = this.ApiEndPointName + "/Create";

        ca.PostToAPI(urlService, userDTO, function () {
            //Recargar la tabla
            $('#tblUser').DataTable().ajax.reload();
        })
    }
    this.Update = function () {
        var userDTO = {};
        //Atributos con valores default, que son coltrolados por el API
        userDTO.id = $('#txtId').val();
        userDTO.created = "2025-01-01";
        userDTO.updated = "2025-01-01";

        //Valores capturados en pantalla
        userDTO.userCode = $('#txtUserCode').val();
        userDTO.name = $('#txtName').val();
        userDTO.email = $('#txtEmail').val();
        userDTO.status = $('#txtStatus').val();
        userDTO.birthDate = $('#txtBDate').val();
        userDTO.password = $('#txtPassword').val();

        //Enviar la data al API
        var ca = new ControlActions();
        var urlService = this.ApiEndPointName + "/Update";

        ca.PutToAPI(urlService, userDTO, function () {
            //Recargar la tabla
            $('#tblUser').DataTable().ajax.reload();
        })
    }
    this.Delete = function () {
        var userDTO = {};
        //Atributos con valores default, que son coltrolados por el API
        userDTO.id = $('#txtId').val();
        userDTO.created = "2025-01-01";
        userDTO.updated = "2025-01-01";

        //Valores capturados en pantalla
        userDTO.userCode = $('#txtUserCode').val();
        userDTO.name = $('#txtName').val();
        userDTO.email = $('#txtEmail').val();
        userDTO.status = $('#txtStatus').val();
        userDTO.birthDate = $('#txtBDate').val();
        userDTO.password = $('#txtPassword').val();

        //Enviar la data al API
        var ca = new ControlActions();
        var urlService = this.ApiEndPointName + "/Delete";

        ca.DeleteToAPI(urlService, userDTO, function () {
            //Recargar la tabla
            $('#tblUser').DataTable().ajax.reload();
        })
    }
    this.LoadTableById = function () {

        var id = $('#txtSearchId').val().trim();

        var ca = new ControlActions();
        var service = this.ApiEndPointName + "/RetrieveById?id=" + id;
        var urlService = ca.GetUrlApiService(service);

        if (!id) {
            Swal.fire({
                icon: 'warning',
                title: 'ID requerido',
                text: 'Por favor, ingrese un ID válido antes de continuar.',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        var columns = [];
        columns[0] = { 'data': 'id' };
        columns[1] = { 'data': 'userCode' };
        columns[2] = { 'data': 'name' };
        columns[3] = { 'data': 'email' };
        columns[4] = { 'data': 'birthDate' };
        columns[5] = { 'data': 'status' };

        // Destruye la tabla si ya existía
        if ($.fn.DataTable.isDataTable('#tblUser')) {
            $('#tblUser').DataTable().clear().destroy();
        }

        $('#tblUser').dataTable({
            "ajax": {
                url: urlService,
                "dataSrc": function (json) {
                    return Array.isArray(json) ? json : [json];
                },
                
            },
            columns: columns
        });

    }
    this.LoadTableByUserCode = function () {
        var userCode = $('#txtSearchUserCode').val().trim();

        var ca = new ControlActions();
        var service = this.ApiEndPointName + "/RetrieveByUserCode?userCode=" + userCode;
        var urlService = ca.GetUrlApiService(service);

        if (!userCode) {
            Swal.fire({
                icon: 'warning',
                title: 'UserCode requerido',
                text: 'Por favor, ingrese un UserCode válido antes de continuar.',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
        var columns = [];
        columns[0] = { 'data': 'id' }
        columns[1] = { 'data': 'userCode' }
        columns[2] = { 'data': 'name' }
        columns[3] = { 'data': 'email' }
        columns[4] = { 'data': 'birthDate' }
        columns[5] = { 'data': 'status' }

        // Destruye la tabla si ya existía
        if ($.fn.DataTable.isDataTable('#tblUser')) {
            $('#tblUser').DataTable().clear().destroy();
        }

        $('#tblUser').dataTable({
            "ajax": {
                url: urlService,
                "dataSrc": function (json) {
                    return Array.isArray(json) ? json : [json];
                },

            },
            columns: columns
        });
    }
    this.LoadTableByEmail = function () {
        var email = $('#txtSearchEmail').val().trim()
        var ca = new ControlActions();
        var service = this.ApiEndPointName + "/RetrieveByEmail?email=" + email;
        var urlService = ca.GetUrlApiService(service);
        if (!email) {
            Swal.fire({
                icon: 'warning',
                title: 'Email requerido',
                text: 'Por favor, ingrese un Email válido antes de continuar.',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
        var columns = [];
        columns[0] = { 'data': 'id' }
        columns[1] = { 'data': 'userCode' }
        columns[2] = { 'data': 'name' }
        columns[3] = { 'data': 'email' }
        columns[4] = { 'data': 'birthDate' }
        columns[5] = { 'data': 'status' }

        // Destruye la tabla si ya existía
        if ($.fn.DataTable.isDataTable('#tblUser')) {
            $('#tblUser').DataTable().clear().destroy();
        }

        $('#tblUser').dataTable({
            "ajax": {
                url: urlService,
                "dataSrc": function (json) {
                    return Array.isArray(json) ? json : [json];
                },

            },
            columns: columns
        });
    }
  
}


$(document).ready(function () {
    var vc = new UserViewController();
    vc.InitView();
})
