$(document).ready(function () {
    jQuery.support.cors = true;

    // GET para actualizar la tabla de Mensaje
    $("#actualizar-tabla-mensaje").click(function () {
        var urlServicio = "http://localhost:8080/api/Message/all";
        $("#tabla-mensaje tbody").empty();
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
                var mensaje = "";
                var maquinaria;
                var cliente;
                var salidaFila = "";

                $("#tabla-mensaje tbody").empty();

                salidaFila = "<tr><th>Mensaje</th><th>Maquinaria</th><th>Cliente</th></tr>";
                $("#tabla-mensaje tbody").append(salidaFila);

                for (i = 0; i < result.length; i++) {
                    mensaje = result[i]["messageText"];
                    maquinaria = result[i]["machine"];
                    cliente = result[i]["client"];

                    if (JSON.stringify(maquinaria) != "[]"){
                        delete maquinaria["id"];
                        delete maquinaria["category"]["id"];
                    }else{
                        console.log(JSON.stringify(maquinaria));
                    }
                    if (JSON.stringify(cliente) != "[]"){
                        delete cliente["idClient"];
                        delete cliente["password"];
                    }else{
                        console.log(JSON.stringify(cliente));
                    }

                    maquinaria = JSON.stringify(result[i]["machine"]);
                    cliente = JSON.stringify(result[i]["client"]);

                    salidaFila = "<tr><td>" + mensaje + "</td><td>" +
                        maquinaria + "</td><td>" + cliente + "</td></tr>";

                    $("#tabla-mensaje tbody").append(salidaFila);

                }//Fin del for


                //Fin del selector success del AJAX
            }
        });
    })

    // DELETE para eliminar un mensaje
    $("#Borrar-Mensaje").click(function () {
        var urlServicio = "https://g272857530b233b-db202109272016.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message";
        var id = $("#ID-Mensaje").val();
        $.ajax({
            url: urlServicio,
            type: "DELETE",
            data: JSON.stringify({id:id}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
        });
    })

    // POST para agregar un mensaje
    $("#agregar-mensaje-boton").click(function () {
        var urlServicio = "http://localhost:8080/api/Message/save";
        var mensaje = $("#escribir-cuadro-mensaje").val();
        var cliente = parseInt($("#escribir-id-cliente").val());
        var maquinaria = parseInt($("#escribir-id-maquinaria").val()); 
        console.log(maquinaria)       
        if (mensaje != "" && cliente != NaN && maquinaria != NaN) {
            $.ajax({
                url: urlServicio,
                type: "POST",
                data: JSON.stringify({ "messageText":mensaje, "client":{"idClient":cliente}, "machine":{"id":maquinaria}}),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
            });   
        }
    })

    // PUT para actualizar un mensaje
    $("#Actualizar-Mensaje").click(function () {
        var urlServicio = "https://g272857530b233b-db202109272016.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message";
        var idMensaje = parseInt($("#Agregar-ID-Mensaje").val());
        var mensaje = $("#Mensaje-Texto").val();
        $.ajax({
            url: urlServicio,
            type: "PUT",
            data: JSON.stringify({ "id":idMensaje, "messagetext":mensaje}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
        } );   
    })
})