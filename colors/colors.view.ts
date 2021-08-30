namespace $.$$ {

	export class $hyoo_draw_colors extends $.$hyoo_draw_colors {
		
		@ $mol_mem
		value( next?: string ) {
			return next ?? this.keys()[ Math.floor( Math.random() * this.keys().length ) ]
		}
		
		color_raw( id: string ) {
			return `var(--hyoo_draw_palette_${id})`
		}
		
	}

}
