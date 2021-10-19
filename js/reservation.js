$(document).ready(function () {
    jQuery.support.cors = true; 

    // GET para actualizar la tabla de Reservaciones
    $("#actualizar-tabla-reservacion").click(function (){
        var urlServicio = "http://localhost:8080/api/Reservation/all";
        console.log(urlServicio)
        $("#tabla-reservacion tbody").empty();
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
                var idReservacion = 0;
                var fechaInicio = "";
                var fechaDevolucion = "";
                var estado = "";
                var maquinaria;
                var cliente;
                var score = 0;
                var salidaFila = "";

                $("#reservation-table tbody").empty();

                salidaFila = "<tr><th>ID Reservation</th><th>Fecha Inicio</th><th>Fecha Entrega</th><th>Estado</th><th>Maquinaria</th><th>Cliente</th><th>Calificación</th></tr>";
                $("#tabla-reservacion tbody").append(salidaFila);

                for (i = 0; i < result.length; i++) {    
                    idReservacion = result[i]["idReservation"];         
                    fechaInicio = result[i]["startDate"];
                    fechaDevolucion = result[i]["devolutionDate"];
                    estado = result[i]["status"];
                    maquinaria = result[i]["machine"];
                    cliente = result[i]["client"];
                    score = result[i]["score"];

                    if (JSON.stringify(maquinaria) != "[]"){
                        delete maquinaria["id"];
                        delete maquinaria["category"]["id"];
                    }else{
                        console.log(JSON.stringify(maquinaria));
                    }
                    if (JSON.stringify(cliente) != "[]"){
                        delete cliente["password"];
                        delete cliente["age"];
                    }else{
                        console.log(JSON.stringify(maquinaria));
                    }

                    for (var j = 0; j<maquinaria["messages"].length;  j++){
                        delete maquinaria["messages"][j]["idMessage"];
                    }
                    
                    maquinaria = JSON.stringify(result[i]["machine"]);
                    cliente = JSON.stringify(result[i]["client"]);

                    salidaFila = "<tr><td>" + idReservacion + "</td><td>" + fechaInicio + "</td><td>" + 
                        fechaDevolucion + "</td><td>" + estado + "</td><td>" + maquinaria + 
                        "</td><td>" + cliente + "</td><td>" + score + "</td><tr>";

                    $("#tabla-reservacion tbody").append(salidaFila);

                }//Fin del for
            }
        })
    })

    // POST para agregar una reservación
    $("#agregar-reservacion-boton").click(function (){
        var urlServicio = "http://localhost:8080/api/Reservation/save";
        var fechaInicio = $("#escribir-fechaInicio-reservacion").val();
        var fechaDevolucion = $("#escribir-fechaDevolucion-reservacion").val();
        var cliente = $("#escribir-idCliente-reservacion").val();
        var maquinaria = $("#escribir-idMaquinaria-reservacion").val();
        console.log (fechaInicio);
        console.log (fechaDevolucion);
        console.log (cliente);
        if(fechaInicio != "" && fechaDevolucion != "" && cliente != "" && maquinaria != ""){
            $.ajax({
                url: urlServicio,
                type: "POST",
                data: JSON.stringify({ "startDate":fechaInicio, "devolutionDate":fechaDevolucion, "client":{"idClient":cliente}, "machine":{"id":maquinaria}}),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
            } );   
        }
    })
})