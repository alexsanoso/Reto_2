$(document).ready(function () {
    jQuery.support.cors = true;

    // GET para actualizar la tabla de clientes
    $("#actualizar-tablacliente-boton").click(function () {
        var urlServicio = "http://localhost:8080/api/Client/all";
        $("#tabla-cliente tbody").empty();
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
                var id = 0;
                var nombre = "";
                var email = "";
                var edad = 0;
                var mensajes;
                var reservaciones;
                var salidaFila = "";
                
                $("#tabla-cliente tbody").empty();

                salidaFila = "<tr><th>ID</th><th>Nombre</th><th>Correo</th><th>Edad</th><th>Mensajes</th><th>Reservaciones</th></tr>";
                $("#tabla-cliente tbody").append(salidaFila);

                for (i = 0; i < result.length; i++) {
                    id = result[i]["idClient"];
                    nombre = result[i]["name"];
                    email = result[i]["email"];
                    edad = result[i]["age"];
                    mensajes = result[i]["messages"];
                    reservaciones = result[i]["reservations"];

                    for (var j = 0; j<reservaciones.length; j++){
                        if (JSON.stringify(reservaciones) != "[]"){
                            //delete reservaciones[j]["idReservation"];
                            delete reservaciones[j]["machine"]["id"];
                            delete reservaciones[j]["machine"]["category"]["id"];
                            
                            for (var k = 0; k<reservaciones[j]["machine"]["messages"].length;  k++){
                                delete reservaciones[j]["machine"]["messages"][k]["idMessage"];
                            }
                        }else{
                            console.log(JSON.stringify(reservaciones));
                        }
                    }
                    for (var j = 0; j<mensajes.length; j++){
                        if (JSON.stringify(mensajes) != "[]"){
                            delete mensajes[j]["idMessage"];
                            delete mensajes[j]["machine"]["id"];
                            delete mensajes[j]["machine"]["category"]["id"];
                        }else{
                            console.log(JSON.stringify(mensajes));
                        }
                    }
                    mensajes = JSON.stringify(result[i]["messages"]);
                    reservaciones = JSON.stringify(result[i]["reservations"]);

                    salidaFila = "<tr><td>" + id + "</td><td>" +
                        nombre + "</td><td>" + email + "</td><td>" + edad + "</td><td>" + mensajes + "</td><td>" + 
                        reservaciones +"</td></tr>";

                    $("#tabla-cliente tbody").append(salidaFila);

                }//Fin del for


                        //Fin del selector success del AJAX
            }
        });
    })

    // DELETE para eliminar un cliente
    $("#Borrar-Cliente").click(function () {
        var urlServicio = "https://g272857530b233b-db202109272016.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client";
        var id = $("#ID-Cliente").val();
        $.ajax({
            url: urlServicio,
            type: "DELETE",
            data: JSON.stringify({id:id}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
        });   
    })

    // POST para agregar un cliente
    $("#agregar-cliente-boton").click(function () {
        var urlServicio = "http://localhost:8080/api/Client/save";        
        var name = $("#escribir-nombre-cliente").val();
        var email = $("#escribir-correo-cliente").val();
        var password = $("#escribir-contraseña-cliente").val();
        var age = parseInt($("#escribir-edad-cliente").val());
        if (name != "" && email != "" && password != "" && age != NaN){
            $.ajax({
                url: urlServicio,
                type: "POST",
                data: JSON.stringify({ "name":name, "email":email, "password":password, "age":age }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
            });
        }
    })

    // PUT para actualizar un cliente
    $("#Actualizar-Cliente").click(function () {
        var urlServicio = "https://g272857530b233b-db202109272016.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client";
        var idCliente = parseInt($("#Agregar-ID-Cliente").val());
        var nombreCliente = $("#Nombre-Cliente").val();
        var emailCliente = $("#Email-Cliente").val();
        var edadCliente = parseInt($("#Edad-Cliente").val());
        $.ajax({
            url: urlServicio,
            type: "PUT",
            data: JSON.stringify({ "id":idCliente, "name":nombreCliente, "email":emailCliente, "age":edadCliente }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
        });   
    })
})