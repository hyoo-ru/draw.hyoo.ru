namespace $.$$ {

	export class $hyoo_draw_pane extends $.$hyoo_draw_pane {
		
		@ $mol_mem
		figures( next?: readonly string[] ) {
			return this.state().doc( 'figures' ).list( next ) as readonly string[]
		}
		
		@ $mol_mem
		peers() {
			this.figures()
			const self = this.state().peer()
			return [ ... this.state().doc( 'figures' ).store().clock.keys() ].filter( id => id != self )
		}
		
		@ $mol_mem
		graphs() {
			return [
				... this.figures().map( id => this.Line( id ) ),
				... this.peers().map( id => this.Peer( id ) ),
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

		@ $mol_mem_key
		peer( id: number ) {
			return this.state().doc( 'peers' ).sub( id.toString(36) )
		}
		
		@ $mol_mem_key
		peer_x( id: number ) {
			const data = this.peer( id ).value() as {
				left: number
				right: number
			}
			return data ? [ data.left, data.left, data.right, data.right, data.left ] : []
		}
		
		@ $mol_mem_key
		peer_y( id: number ) {
			const data = this.peer( id ).value() as {
				top: number
				bottom: number
			}
			return data ? [ data.top, data.bottom, data.bottom, data.top, data.top ] : []
		}
		
		@ $mol_mem_key
		peer_color( id: number ) {
			const color = ( this.peer( id ).value() as { color: string } )?.color ?? 'negative'
			return `var(--hyoo_draw_palette_${ color })`
		}

		@ $mol_mem
		figure_current( next = null as string | null ) {
			return next
		}
		
		_point_last = null as null | $mol_vector_2d< number >
		
		draw( event: Event ) {
			switch( this.tool() ) {
				case 'pencil': return this.draw_pencil( event )
				case 'eraser': return this.draw_eraser( event )
			}
		}
		
		draw_pencil( event: Event ) {
			
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

					const next = { x: point!.x, y: point!.y }
					
					if( points.length > 1 ) {
						
						const end = points[ points.length - 2 ] as typeof next
						const last = {
							x: ( end.x + next.x ) / 2,
							y: ( end.y + next.y ) / 2,
						}
						
						points = [
							... points.slice( 0 , -1 ),
							last,
							next,
						]
					
					} else {
						
						points = [ ... points, next ]
						
					}
					
					figure.sub( 'points' ).list( points )
					
					return
				}
				
				default: {
					this.figure_current( null )
					return
				}
				
			}
			
		}
		
		draw_eraser( event: Event ) {
			
			event.preventDefault()
			
			const action = this.action_type()
			if( action !== 'draw' ) return
			
			const color = this.color()
			const point = this.action_point()
			const radius = 16 / this.zoom()
			
			const visible = new Set( this.graphs_visible() )

			let figures = this.figures()
			for( const id of figures ) {
				
				const graph = this.Line( id )
				if( !visible.has( graph ) ) continue
				
				const figure = this.figure( id )
				if( color && color !== figure.sub( 'color' ).value() ) continue
				
				const points = figure.sub( 'points' )
				
				const list = ( points.list() as { x: number, y: number }[] ).filter( p => {
					if( Math.abs( p.x - point.x ) > radius ) return true
					if( Math.abs( p.y - point.y ) > radius ) return true
					return false
				} )
				
				points.list( list )
				
				if( !list.length ) {
					figures = figures.filter( f => f !== id )
				}
				
			}
			
			this.figures( figures )
			
		}
		
		_peer_update_task: $mol_fiber | undefined
		
		@ $mol_mem
		peer_update() {
			
			const dims = this.dimensions_viewport()
			const color = this.color()
			
			if( this._peer_update_task ) this._peer_update_task.destructor()
			this._peer_update_task = $mol_fiber_defer( ()=> {
				this.peer( this.state().peer() ).value({
					left: dims.x.min,
					right: dims.x.max,
					top: dims.y.min,
					bottom: dims.y.max,
					color,
				})
			} )

			return null
		}
		
	}

}
