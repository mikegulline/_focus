<?php
/* Steps */
/* creates a numbered step item with */
	function lq_steps($atts, $content){
		extract( shortcode_atts( 
			array( 
				'step'  => '',
				'right'  => ''
			), 
			$atts 
		));
		$step = '
				<div class="steps'.($right?' step-right':'').'">
					<div class="count">'.$step.'</div>
					<div class="info">'.$content.'</div>
				</div>';
					
		return $step;
	}
	add_shortcode( 'lq_steps', 'lq_steps' );


/* Step List */
/* creates numbered Step Process from the list items of an unordered list*/
	function lq_step_list($atts, $content){
		extract( shortcode_atts( 
			array( 
				'step'  => '',
				'right'  => ''
			), 
			$atts 
		));
		$pattern = '/<li[^>]*>([^<]*)<\/li>/';
		preg_match_all($pattern, $content, $matches);
		$list = '';
		$step = 1;
		foreach($matches[1] as $k => $v){
			$list .= '<div class="steps'.($right?' step-right':'').'">';
			$list .= '
					<div class="count">'.$step.'</div>
					<div class="info">'.$v.'</div>';
			$list .= '</div>';
			$step++;
		}
		
		return $list;
	}
	add_shortcode( 'lq_step_list', 'lq_step_list' );
?>
