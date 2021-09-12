namespace $.$$ {

	export class $hyoo_draw_tools extends $.$hyoo_draw_tools {
		
		@ $mol_mem_key
		option_label( id: string ) {
			
			switch( id ) {
				case 'pencil': return [ this.Icon_pencil() ]
				case 'filler': return [ this.Icon_filler() ]
				case 'eraser': return [ this.Icon_eraser() ]
				default: return []
			}
			
		}
		
		@ $mol_mem_key
		option_hint( id: string ) {
			
			switch( id ) {
				case 'pencil': return this.hint_pencil()
				case 'filler': return this.hint_filler()
				case 'eraser': return this.hint_eraser()
				default: return ''
			}
			
		}
		
	}

}
