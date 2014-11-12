Ext.define('App.Model.Logisticos.MatLogisticos', {
    extend: 'Ext.data.Model',
    fields: [
        { type: "int", name: "ID_ITEM" },
        { type: "int", name: "ID_MAT_LOGISTICO" },
        { type: "string", name: "UNIDAD" },
         { type: "string", name: "NRO_SERIE" },
        { type: "date", name: "FECHA_DOTACION", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        { type: "string", name: "FABRICANTE" },
        { type: "string", name: "CODIGO" },
        { type: "string", name: "TIPO_COMPONENTE" },
        { type: "string", name: "AERONAVE" },
        { type: "string", name: "GRUPO" },
        { type: "string", name: "NRO_PARTE" },
        { type: "int", name: "CANTIDAD_DISPONIBLE" },
        { type: "int", name: "CICLO_VIDA" },
        { type: "int", name: "HORA_VIDA" },
      { type: "string", name: "DESCRIPCION" },
      { type: "string", name: "ESTADO" },


    ]
});
