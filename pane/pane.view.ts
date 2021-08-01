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
		
		@ $mol_mem
		pan( next?: $mol_vector_2d< number > ) {
			return next || this.size_real().map( v => v / 2 )
		}

	}

}
