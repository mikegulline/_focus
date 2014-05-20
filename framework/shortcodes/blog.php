<?php
/* Steps */
/* creates a numbered step item with */
	function lq_recent_images($atts, $content){
		extract( shortcode_atts( 
			array( 
				'count'  => '3'
			), 
			$atts 
		));
		global $post;
		$blog = '';
		$recent = new WP_Query( array( 'posts_per_page' => $count, 'meta_key' => '_thumbnail_id' ) );
		if( $recent->have_posts() ) : 
			$blog .= '<div class="co7s with'.$count.' ceq b480  type-join">';
			while( $recent->have_posts() ) : $recent->the_post();
				$blog .= '<div data-col="1">';
				$blog .= '<a href="'.get_the_permalink().'">';
				$blog .= get_the_post_thumbnail($post->ID, 'liqid-feature-fixed');
				$blog .= '</a>';
				$blog .= '</div>';
			endwhile; 
			$blog .= '</div>';
		endif;
		wp_reset_postdata(); 

		return $blog;
	}
	add_shortcode( 'lq_recent_images', 'lq_recent_images' );
?>
