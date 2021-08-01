namespace $.$$ {

	export class $hyoo_draw_pane extends $.$hyoo_draw_pane {
		
		@ $mol_mem
		graphs() {
			return [
				... this.geometry().map( (_,i)=> this.Line( i ) ),
				this.Ruler_hor(),
				this.Ruler_vert(),
			]
		}

		@ $mol_mem_key
		line_x( index: number ) {
			return this.geometry()[ index ].x
		}

		@ $mol_mem_key
		line_y( index: number ) {
			return this.geometry()[ index ].y
		}

		@ $mol_mem_key
		line_color( index: number ) {
			return `var(--hyoo_draw_palette_${ this.geometry()[ index ].color })`
		}

		@ $mol_mem
		geometry_current( next? : number | null ) {
			return next ?? null
		}
		
		@ $mol_mem
		drawn_last( next: $mol_vector_2d< readonly number[] > ) {
			
			if( !next ) return new $mol_vector_2d( [], [] )
					
			const geometry = this.geometry()
			let index = this.geometry_current()
			
			if( next.x.length === 0 ) {
				if( index === null ) return next
				
				this.geometry_current( null )
				
				if( geometry[ index ].x.length > 1 ) return next
				
				this.geometry([
					... geometry.slice( 0, index ),
					... geometry.slice( index + 1 ),
				])
				
				return next
			}
			
			if( index === null ) {
				this.geometry_current( index = geometry.length )
			}
			
			this.geometry([
				... geometry.slice( 0, index ),
				{
					... geometry[ index ] ?? { color: this.color(), type: 'line' },
					x: next.x,
					y: next.y,
				},
				... geometry.slice( index + 1 ),
			])
			
			return next
		}
		
		// point_from( event: PointerEvent ) {
			
		// 	const zoom = this.zoom()
		// 	const pan = this.pan()
		// 	const rect = this.dom_node().getBoundingClientRect()
			
		// 	return new $mol_vector_2d(
		// 		( event.pageX - pan[0] - rect.left ) / zoom,
		// 		( event.pageY - pan[1] - rect.top ) / zoom,
		// 	)
			
		// }

		// draw_start( event : PointerEvent ) {
			
		// 	if( event.defaultPrevented ) return
		// 	if( this.Touch().action_type( event ) ) return
		// 	event.preventDefault()
			
		// 	const geometry = this.geometry()
			
		// 	const index = geometry.length
		// 	this.geometry_current( index )
			
		// 	const point = this.point_from( event )
		// 	this.geometry([
		// 		... geometry,
		// 		{
		// 			color: 'green',
		// 			type: 'line',
		// 			x: [ point.x ],
		// 			y: [ point.y ],
		// 		}
		// 	])
			
		// }
		
		// draw_continue( event : PointerEvent ) {
			
		// 	if( event.defaultPrevented ) return
		// 	if( this.Touch().action_type( event ) ) return
		// 	event.preventDefault()
			
		// 	const index = this.geometry_current()
		// 	if( index === null ) return
			
		// 	const geometry = this.geometry()
		// 	const point = this.point_from( event )
			
		// 	this.geometry([
		// 		... geometry.slice( 0, index ),
		// 		{
		// 			... geometry[ index ],
		// 			x: [ ... geometry[ index ].x, point.x ],
		// 			y: [ ... geometry[ index ].y, point.y ],
		// 		},
		// 		... geometry.slice( index + 1 ),
		// 	])
			
		// }

		// draw_end( event : PointerEvent ) {
		// 	this.geometry_current( null )
		// }

		// draw_end( event : MouseEvent ) {
		// 	const start_pos = this.draw_start_pos()!
		// 	const pos = [ event.pageX , event.pageY ]
			
		// 	if( Math.abs( start_pos[0] - pos[0] ) > 4 ) return
		// 	if( Math.abs( start_pos[1] - pos[1] ) > 4 ) return
			
		// 	const zoom = this.zoom()
		// 	const pan = this.pan()
		// 	const rect = this.dom_node().getBoundingClientRect()
			
		// 	const cell = $mol_coord_pack(
		// 		Math.round( ( event.pageX - rect.left - pan[0] ) / zoom ) ,
		// 		Math.round( ( event.pageY - rect.top - pan[1] ) / zoom ) ,
		// 	)
			
		// 	const state = new Set( this.state() )
		// 	if( state.has( cell ) ) state.delete( cell )
		// 	else state.add( cell )
			
		// 	this.state( state )
		// }

		// @ $mol_mem
		// zoom( next = super.zoom() ) {
		// 	return Math.max( 1 , next )
		// }
		
		@ $mol_mem
		pan( next?: $mol_vector_2d< number > ) {
			return next || this.size_real().map( v => v / 2 )
		}

	}

}
