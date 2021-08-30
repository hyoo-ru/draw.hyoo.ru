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
			const val = this.$.$mol_state_local.value( 'center', next ) as null | readonly[ number, number ]
			
			if( str ) {
				const coords = str.split( 'x' ).map( Number )
				return new $mol_vector_2d( coords[0] + offset.x, coords[1] + offset.y )
			}
			
			if( val ) {
				return new $mol_vector_2d( ... val )
			}
			
			return new $mol_vector_2d(
				Math.trunc( ( Math.random() - .5 ) * 2**32 ),
				Math.trunc( ( Math.random() - .5 ) * 2**32 ),
			)
			
		}
		
		@ $mol_mem
		zoom( next?: number ) {
			const arg = next ? String( next ) : undefined
			const str = this.$.$mol_state_arg.value( 'zoom', arg )
			const val = this.$.$mol_state_local.value( 'zoom', next ) as null | number
			return Number( str ) || val || 1
		}
		
	}

}
