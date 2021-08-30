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
		line_x( id: string ) {
			return ( this.figure( id ).sub( 'points' ).list() as { x: number }[] ).map( point => point.x )
		}
		
		@ $mol_mem_key
		line_y( id: string ) {
			return ( this.figure( id ).sub( 'points' ).list() as { y: number }[] ).map( point => point.y )
		}

		@ $mol_mem_key
		line_color( id: string ) {
			return `var(--hyoo_draw_palette_${ this.figure( id ).sub( 'color' ).value() })`
		}

		@ $mol_mem
		figure_current( next = null as string | null ) {
			return next
		}
		
		_point_last = null as null | $mol_vector_2d< number >
		
		draw( event: Event ) {
			
			event.preventDefault()
			
			const action = this.action_type()
			const point = this.action_point()
			
			switch( action ) {
				
				case 'draw': {
					
					let id = this.figure_current()
					if( !id ) {
						this.figure_current( $mol_guid() )
						this._point_last = point
						return
					}
					
					const figure = this.figure( id )
					let points = figure.sub( 'points' ).list()
					
					if( points.length === 0 ) {
						
						points = [ { x: this._point_last!.x, y: this._point_last!.y } ]
						
						let figures = [ ... this.figures() ]
						if( figures.indexOf( id ) === -1 ) {
							
							figures.push( id )
							this.figures( figures )
							
							figure.sub( 'color' ).value( this.color() )
							figure.sub( 'type' ).value( 'line' )
							
						}
						
					}
					
					figure.sub( 'points' ).list([
						... points,
						{ x: point!.x, y: point!.y },
					])
					
					return
				}
				
				default: {
					this.figure_current( null )
					return
				}
				
			}
			
		}
		
		@ $mol_mem
		pan( next?: $mol_vector_2d< number > ) {
			return next || this.size_real().map( v => v / 2 )
		}

	}

}
