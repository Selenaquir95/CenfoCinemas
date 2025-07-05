

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
    }

    //Metodo cargar tabla
    this.LoadTable = function () {

        //URL del API a invocar
        //https://localhost:7147/api/User/RetrieveAll

        var ca = new ControlActions();
        var service = this.ApiEndPointName + "/RetrieveAll";
        var urlService = ca.GetUrlApiService(service);


        /*
    {
        "userCode": "1234",
        "name": "Selena",
        "email": "squiross@ucenfotec.ac.cr",
        "password": "1234Cenfo",
        "birthDate": "2000-10-01T00:00:00",
        "status": "AC",
        "id": 1,
        "created": "2025-06-14T13:19:44.433",
        "updated": "0001-01-01T00:00:00"
      }
      <tr>
                            <th>Id </th>
                            <th>User Code</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Birth Date</th>
                            <th>Status</th>
                        </tr>
    */
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
}

$(document).ready(function () {
    var vc = new UserViewController();
    vc.InitView();
})