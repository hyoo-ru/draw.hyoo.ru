namespace $.$$ {

	export class $hyoo_draw extends $.$hyoo_draw {
		
		@ $mol_mem
		sub() {
			return [
				this.Main(),
				... this.chat_pages(),
			]
		}
		
		@ $mol_mem
		center( next?: $mol_vector_2d< number > ) {
			
			const rect = this.view_rect() ?? { width: 0, height: 0 }
			const offset = new $mol_vector_2d(
				rect.width / 2,
				rect.height / 2,
			)
			
			const arg = next ? ( next[0] - offset.x ) + 'x' + ( next[1] - offset.y ) : undefined
			
			const str = this.$.$mol_state_arg.value( 'center', arg )
			if( str ) {
				const coords = str.split( 'x' ).map( Number )
				return new $mol_vector_2d( coords[0] + offset.x, coords[1] + offset.y )
			}
			
			const peer = this.Pane().state().peer()
			const x = ~( $mol_hash_string( 'x', peer ) - 2 ** ( 6 * 8 - 1 ) )
			const y = ~( $mol_hash_string( 'y', peer ) - 2 ** ( 6 * 8 - 1 ) )
			
			return new $mol_vector_2d( x, y )
		}
		
		@ $mol_mem
		zoom( next?: number ) {
			const arg = next ? String( next ) : undefined
			const str = this.$.$mol_state_arg.value( 'zoom', arg )
			if( next ) this.Tools().value( '' )
			return Number( str ) || 1
		}
		
	}

}
