namespace $.$$ {

	export class $hyoo_draw extends $.$hyoo_draw {
		
		@ $mol_mem
		center( next?: $mol_vector_2d< number > ) {
			const arg = next ? next.join( 'x' ) : undefined
			const str = this.$.$mol_state_arg.value( 'center', arg )
			if( !str ) return super.center()
			const coords = str.split( 'x' ).map( Number )
			return new $mol_vector_2d( coords[0], coords[1] )
		}
		
		@ $mol_mem
		zoom( next?: number ) {
			const arg = next ? String( next ) : undefined
			const str = this.$.$mol_state_arg.value( 'zoom', arg )
			return Number( str ) || 1
		}
		
	}

}
