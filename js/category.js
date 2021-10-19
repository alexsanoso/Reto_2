$(document).ready(function () {
    jQuery.support.cors = true; 

    // GET para actualizar la tabla de Gamas
    $("#actualizar-tabla-categoria").click(function (){
        var urlServicio = "http://localhost:8080/api/Category/all";
        console.log(urlServicio)
        $("#tabla-categoria tbody").empty();
        $.ajax({
            url: urlServicio,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,

            success: function (result) {
                console.log("Entre a invocar el servicio REST");
                console.log(result);
                var i = 0;
                var nombre = "";
                var descripcion = "";
                var maquinaria;
                var salidaFila = "";

                $("#tabla-categoria tbody").empty();

                salidaFila = "<tr><th>Nombre</th><th>Descripción</th><th>Maquinaria</th></tr>";
                $("#tabla-categoria tbody").append(salidaFila);

                for (i = 0; i < result.length; i++) {
                    nombre = result[i]["name"];                    
                    descripcion = result[i]["description"];
                    maquinaria = result[i]["machines"];

                    for (var j = 0; j<maquinaria.length;  j++){
                        if (JSON.stringify(maquinaria) != "[]"){
                            delete maquinaria[j]["id"];
                            //delete maquinaria[j]["category"]["id"];
                            for (var k = 0; k < maquinaria[j]["reservations"].length;  k++){
                                //delete car[j]["reservations"][k]["idReservation"]
                                //delete car[j]["reservations"][k]["client"]["idClient"];
                                delete maquinaria[j]["reservations"][k]["client"]["password"];
                                delete maquinaria[j]["reservations"][k]["client"]["age"];
                            }
                            for (var k = 0; k<maquinaria[j]["messages"].length;  k++){
                                delete maquinaria[j]["messages"][k]["idMessage"];
                            }
                        }
                    }
                    
                    maquinaria = JSON.stringify(maquinaria);

                    salidaFila = "<tr><td>" + nombre + "</td><td>" + descripcion + "</td><td>" +
                        maquinaria + "</td></tr>";

                    $("#tabla-categoria tbody").append(salidaFila);

                }//Fin del for
            }
        })
    })

    // POST para agregar una gama
    $("#agregar-categoria-boton").click(function (){
        var urlServicio = "http://localhost:8080/api/Category/save";
        var name = $("#escribir-nombre-categoria").val();
        var descripcion = $("#escribir-descripcion-categoria").val();

        if (name != "" && descripcion != ""){
            $.ajax({
                url: urlServicio,
                type: "POST",
                data: JSON.stringify({ "name":name, "description":descripcion}),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
            });   
        }
    })
})