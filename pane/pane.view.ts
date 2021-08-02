namespace $.$$ {

	export class $hyoo_draw_pane extends $.$hyoo_draw_pane {
		
		@ $mol_mem
		figures( next?: string[] ) {
			return this.store().value( 'figures', next ) as string[] ?? []
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
			return this.store().sub( `figure=${ id }`, new $mol_store({
				color: 'blue',
				type: 'line',
				x: '',
				y: '',
			}) )
		}

		@ $mol_mem_key
		line_x( id: string ) {
			const str = this.figure( id ).value( 'x' )
			if( !str ) return []
			return [ ... new Float32Array( $mol_base64_decode( str ) ) ]
		}

		@ $mol_mem_key
		line_y( id: string ) {
			const str = this.figure( id ).value( 'y' )
			if( !str ) return []
			return [ ... new Float32Array( $mol_base64_decode( str ) ) ]
		}

		@ $mol_mem_key
		line_color( id: string ) {
			return `var(--hyoo_draw_palette_${ this.figure( id ).value( 'color' ) })`
		}

		@ $mol_mem
		figure_current( next? : string | null ) {
			return next ?? null
		}
		
		@ $mol_mem
		drawn_last( next: $mol_vector_2d< readonly number[] > ) {
			
			if( !next ) return new $mol_vector_2d( [], [] )
					
			const store = this.store()
			let id = this.figure_current()
			let figures = this.figures()
			let index = id === null ? -1 : figures.indexOf( id )
			
			if( next.x.length === 0 ) {
				
				if( index === null ) return next
				if( id === null ) return next
				
				this.figure_current( null )
				
				if( this.figure( id ).value( 'x' ).length > 1 ) return next
				
				if( index >= 0 ) {
					this.figures( figures.filter( i => i !== id ) )
				}
				
				return next
			}
			
			if( id === null ) {
				id = $mol_guid()
				this.figure_current( id )
				figures = [ ... figures, id ]
				this.figures( figures )
			}
			
			const figure = this.figure( id )
			figure.value( 'color', this.color() )
			figure.value( 'type', 'line' )
			figure.value( 'x', $mol_base64_encode( new Uint8Array( Float32Array.from( next.x ).buffer ) ) )
			figure.value( 'y', $mol_base64_encode( new Uint8Array( Float32Array.from( next.y ).buffer ) ) )
			
			return next
		}
		
		@ $mol_mem
		pan( next?: $mol_vector_2d< number > ) {
			return next || this.size_real().map( v => v / 2 )
		}

	}

}
