namespace $.$$ {

	export class $hyoo_draw_tools extends $.$hyoo_draw_tools {
		
		@ $mol_mem_key
		option_label( id: string ) {
			
			switch( id ) {
				case 'move': return [ this.Icon_move() ]
				case 'pencil': return [ this.Icon_pencil() ]
				case 'eraser': return [ this.Icon_eraser() ]
				default: return []
			}
			
		}
		
	}

}