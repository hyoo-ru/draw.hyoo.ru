namespace $.$$ {

	export class $hyoo_draw_pane extends $.$hyoo_draw_pane {
		
		@ $mol_mem
		figures( next?: readonly string[] ) {
			return this.state().doc( 'figures' ).list( next ) as readonly string[]
		}
		
		@ $mol_mem
		graphs() {
			return [
				... this.figures().map( id => this.Line( id ) ),
				this.Ruler_hor(),
				this.Ruler_vert(),
			]
		}
		
		@ $mol_mem_key
		figure( id: string ) {
			return this.state().doc( 'figure' ).doc( id )
		}

		@ $mol_mem_key
		line_x( id: string, next?: readonly number[] ) {
			return this.figure( id ).sub( 'x' ).list( next ) as readonly number[]
		}

		@ $mol_mem_key
		line_y( id: string, next?: readonly number[] ) {
			return this.figure( id ).sub( 'y' ).list( next ) as readonly number[]
		}

		@ $mol_mem_key
		line_color( id: string ) {
			return `var(--hyoo_draw_palette_${ this.figure( id ).sub( 'color' ).value() })`
		}

		@ $mol_mem
		figure_current( next? : string | null ) {
			return next ?? null
		}
		
		@ $mol_mem
		drawn( next: $mol_vector_2d< readonly number[] > ) {
			
			if( !next ) return new $mol_vector_2d( [], [] )
					
			let id = this.figure_current()
			let figures = this.figures()
			let index = id === null ? -1 : figures.indexOf( id )
			
			if( next.x.length === 0 ) {
				
				if( index === null ) return next
				if( id === null ) return next
				
				this.figure_current( null )
				
				return next
			}
			
			if( next.x.length < 2 ) return next
			
			if( id === null ) {
				id = $mol_guid()
				this.figure_current( id )
				figures = [ ... figures, id ]
				this.figures( figures )
			}
			
			const figure = this.figure( id )
			figure.sub( 'color' ).value( this.color() )
			figure.sub( 'type' ).value( 'line' )
			figure.sub( 'x' ).list( next.x )
			figure.sub( 'y' ).list( next.y )
			
			return next
		}
		
		@ $mol_mem
		pan( next?: $mol_vector_2d< number > ) {
			return next || this.size_real().map( v => v / 2 )
		}

	}

}
