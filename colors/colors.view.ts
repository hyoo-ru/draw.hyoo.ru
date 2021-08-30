namespace $.$$ {

	export class $hyoo_draw_colors extends $.$hyoo_draw_colors {
		
		@ $mol_mem
		rows() {
			return this.options().map( id => this.Option( id ) )
		}
		
		@ $mol_mem
		color( next?: string ) {
			return next ?? this.options()[ Math.floor( Math.random() * this.options().length ) ]
		}
		
		color_raw( id: string ) {
			return `var(--hyoo_draw_palette_${id})`
		}
		
		option_select( id: string ) {
			this.color( id )
		}

		option_title( id: string ) {
			return id === this.color() ? '✔' : ''
		}

	}

}
