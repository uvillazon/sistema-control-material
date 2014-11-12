Ext.define('App.view.OrdenesTrabajo.TrabajosEjecutados.ViewPersonalMovilTrabajoEjecutado', {
    extend: 'Ext.view.View',
    alias: 'widget.personalmoviltrabajosejecutados',
    store: 'OrdenesTrabajo.PersonalMovilTrabajosEjecutados',
    emptyText: 'Ningun personal registrado',
    itemSelector: 'div.personalmovil',
    tpl: [
        '<tpl for =".">',
			'<tpl if="active &gt; 0">',// interrogate if the user is active (step one)
				'<div class="personalmovil active">',
			'<tpl else>',
				'<div class="personalmovil inactive">',
			'</tpl>',
				'<div class="content">',
					'<img src="content/images/usermovil.png"  height="60" width="60">',
				'</div>',
				'<b>{NOMBRE} {APELLIDO}</b></br>', // render the name of our users (step two)
				'<spam>{UNIDAD}</spam>',
		    '</div>',
		'</tpl>'].join('')
});