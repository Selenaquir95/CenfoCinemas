//js que maneja todo el comportamiento de la vista de películas

//Definir una clase JS usadando prototype

function MoviesViewController() {

    this.ViewName = "Movies";
    this.ApiEndPointName = "Movie";

    //Metodo constructor
    this.InitView = function () {
        console.log("Movies init view --> ok");
        this.LoadTable();

        //Asignar eventos a los botones
        $('#btnCreate').click(function () {
            var vc = new MoviesViewController();
            vc.Create();
        });
        $('#btnUpdate').click(function () {
            var vc = new MoviesViewController();
            vc.Update();
        });
        $('#btnDelete').click(function () {
            var vc = new MoviesViewController();
            vc.Delete();
        });
        $('#btnSearchById').click(function () {
            var vc = new MoviesViewController();
            vc.LoadTableById();
        });
        $('#btnSearchByTitle').click(function () {
            var vc = new MoviesViewController();
            vc.LoadTableByTitle();
        });
    }
    //Metodo cargar tabla
    this.LoadTable = function () {

        //URL del API a invocar
        //https://localhost:7147/api/Movie/RetrieveAll

        var ca = new ControlActions();
        var service = this.ApiEndPointName + "/RetrieveAll";
        var urlService = ca.GetUrlApiService(service);

        var columns = [];
        columns[0] = { 'data': 'id' }
        columns[1] = { 'data': 'title' }
        columns[2] = { 'data': 'description' }
        columns[3] = { 'data': 'releaseDate' }
        columns[4] = { 'data': 'genre' }
        columns[5] = { 'data': 'director' }

        $('#tblMovie').dataTable({
            "ajax": {
                url: urlService,
                "dataSrc": ""
            },
            columns: columns
        });
        //asignar eventos de carga de datos o binding segun el click en la tabla
        $('#tblMovie tbody').on('click', 'tr', function () {
            //Extraemos la fila y los datos de la tabla
            var row = $(this).closest("tr");

            //extraemos el DTO
            //Esto nos devuelve el json de la fila seleccionada por el usuario
            //Segun la data devuelta por el API
            var movieDTO = $('#tblMovie').DataTable().row(this).data();

            //Binding en el form
            $('#txtId').val(movieDTO.id);
            $('#txtTitle').val(movieDTO.title);
            $('#txtDescription').val(movieDTO.description);
            $('#txtGenre').val(movieDTO.genre);
            $('#txtDirector').val(movieDTO.director);

            //fecha tiene un formato especial, por lo que debemos formatearla
            var onlyDate = movieDTO.releaseDate.split("T");
            $('#txtRDate').val(onlyDate[0]);
        });
    }
    this.Create = function () {
        var movieDTO = {};
        //Atributos con valores default, que son controlados por el API
        movieDTO.id = 0; //ID por defecto
        movieDTO.created = "2025-01-01";
        movieDTO.updated = "2025-01-01";

        //Valores que se capturan desde la vista
        movieDTO.title = $('#txtTitle').val();
        movieDTO.description = $('#txtDescription').val();
        movieDTO.releaseDate = $('#txtRDate').val();
        movieDTO.genre = $('#txtGenre').val();
        movieDTO.director = $('#txtDirector').val();

        //Enviar data al API
        var ca = new ControlActions();
        var service = this.ApiEndPointName + "/Create";

        ca.PostToAPI(service, movieDTO, function () {
            $('#tblMovie').DataTable().ajax.reload();
        })
    }

    this.Update = function () {
        var movieDTO = {};
                
        //Atributos con valores default, que son controlados por el API
        movieDTO.id = $('#txtId').val();
        movieDTO.created = "2025-01-01";
        movieDTO.updated = "2025-01-01";

        //Valores que se capturan desde la vista
        movieDTO.title = $('#txtTitle').val();
        movieDTO.description = $('#txtDescription').val();
        movieDTO.releaseDate = $('#txtRDate').val();
        movieDTO.genre = $('#txtGenre').val();
        movieDTO.director = $('#txtDirector').val();

        //Enviar data al API
        var ca = new ControlActions();
        var service = this.ApiEndPointName + "/Update";

        ca.PutToAPI(service, movieDTO, function () {
            $('#tblMovie').DataTable().ajax.reload();
        })
    }
    this.Delete = function () {
        var movieDTO = {};

        //Atributos con valores default, que son controlados por el API
        movieDTO.id = $('#txtId').val();
        movieDTO.created = "2025-01-01";
        movieDTO.updated = "2025-01-01";

        //Valores que se capturan desde la vista
        movieDTO.title = $('#txtTitle').val();
        movieDTO.description = $('#txtDescription').val();
        movieDTO.releaseDate = $('#txtRDate').val();
        movieDTO.genre = $('#txtGenre').val();
        movieDTO.director = $('#txtDirector').val();

        //Enviar data al API
        var ca = new ControlActions();
        var service = this.ApiEndPointName + "/Delete";

        ca.DeleteToAPI(service, movieDTO, function () {
            $('#tblMovie').DataTable().ajax.reload();
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
        columns[0] = { 'data': 'id' }
        columns[1] = { 'data': 'title' }
        columns[2] = { 'data': 'description' }
        columns[3] = { 'data': 'releaseDate' }
        columns[4] = { 'data': 'genre' }
        columns[5] = { 'data': 'director' }

        // Destruye la tabla si ya existía
        if ($.fn.DataTable.isDataTable('#tblMovie')) {
            $('#tblMovie').DataTable().clear().destroy();
        }
        $('#tblMovie').dataTable({
            "ajax": {
                url: urlService,
                "dataSrc": function (json) {
                    return Array.isArray(json) ? json : [json];
                },

            },
            columns: columns
        });

    }
    this.LoadTableByTitle = function () {

        var title = $('#txtSearchTitle').val().trim();

        var ca = new ControlActions();
        var service = this.ApiEndPointName + "/RetrieveByTitle?Title=" + title;
        var urlService = ca.GetUrlApiService(service);

        if (!title) {
            Swal.fire({
                icon: 'warning',
                title: 'Titulo requerido',
                text: 'Por favor, ingrese un Titulo antes de continuar.',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        var columns = [];
        columns[0] = { 'data': 'id' }
        columns[1] = { 'data': 'title' }
        columns[2] = { 'data': 'description' }
        columns[3] = { 'data': 'releaseDate' }
        columns[4] = { 'data': 'genre' }
        columns[5] = { 'data': 'director' }

        // Destruye la tabla si ya existía
        if ($.fn.DataTable.isDataTable('#tblMovie')) {
            $('#tblMovie').DataTable().clear().destroy();
        }

        $('#tblMovie').dataTable({
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
    var vc = new MoviesViewController();
    vc.InitView();
})