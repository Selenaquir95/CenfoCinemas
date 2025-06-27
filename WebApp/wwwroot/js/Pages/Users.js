

function UserViewController() {
    this.ViewName = "Users";
    this.ApiEndPointName = "User";

    //Metodo Constructor
    this.InitView = function () {
        console.log("User init view --> ok");
        this.LoadTable();
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
    }
}

$(document).ready(function () {
    var vc = new UserViewController();
    vc.InitView();
})