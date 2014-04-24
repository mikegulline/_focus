<?php
add_action( 'after_setup_theme', '_focus_setup' );
function _focus_setup(){
	load_theme_textdomain( '_focus', get_template_directory() . '/languages' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'post-thumbnails' );
	global $content_width;
	if ( ! isset( $content_width ) ) $content_width = 840;
	register_nav_menus(
		array( 
			'main-menu' 	=> __('Main Menu', '_focus'),
			'top' 			=> __('Top Sub Menu', 'liqid'), 
			'bottom' 		=> __('Bottom Sub Menu', 'liqid' )
		)
	);
}
add_action( 'comment_form_before', '_focus_enqueue_comment_reply_script' );
function _focus_enqueue_comment_reply_script(){
	if ( get_option( 'thread_comments' ) ) { wp_enqueue_script( 'comment-reply' ); }
}
add_filter( 'the_title', '_focus_title' );
	function _focus_title( $title ) {
	if ( $title == '' ) {
		return '&rarr;';
	} else {
		return $title;
	}
}
add_filter( 'wp_title', '_focus_filter_wp_title' );
function _focus_filter_wp_title( $title ){
	return $title . esc_attr( get_bloginfo( 'name' ) );
}
add_action( 'widgets_init', '_focus_widgets_init' );
function _focus_widgets_init(){
	register_sidebar( 
		array (
			'name' => __( 'Sidebar Widget Area', '_focus' ),
			'id' => 'primary-widget-area',
			'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
			'after_widget' => "</li>",
			'before_title' => '<h3 class="widget-title">',
			'after_title' => '</h3>',
		) 
	);
}
function _focus_custom_pings( $comment ){
	$GLOBALS['comment'] = $comment;
	?>
	<li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>"><?php echo comment_author_link(); ?></li>
	<?php 
}
add_filter( 'get_comments_number', '_focus_comments_number' );
function _focus_comments_number( $count ){
	if ( !is_admin() ) {
		global $id;
		$comments_by_type = &separate_comments( get_comments( 'status=approve&post_id=' . $id ) );
		return count( $comments_by_type['comment'] );
	} else {
		return $count;
	}
}
////////////////////////////////////////////////////////////////////////////
// Add Front End Javascript ================================================
	add_action( 'wp_enqueue_scripts', 'liqid_enqueue_and_register_my_scripts' );
	function liqid_enqueue_and_register_my_scripts(){
		$font = 'Titillium+Web:200,200italic,600,600italic|Roboto+Slab:400,100,300,700|Open+Sans:400,400italic,700,700italic';
		wp_enqueue_script('jquery');
		wp_enqueue_script("jquery-effects-core");
		wp_enqueue_script('liqid-scripts', get_template_directory_uri().'/framework/js/script.js', array(), '',  true);
		wp_enqueue_style('liqid-css-fonts', 'http://fonts.googleapis.com/css?family='.$font, false, null, 'all');
	}
	
// Add Image Infos =========================================================
	add_image_size( 'liqid-feature', 840, 9999);
	
// Add Main Menu Functions =========================================================	
	function liqid_wp_old_menu(){
		$old =  '<ul>';
		$old .= wp_list_pages(array(
			'depth'        => 0,
			'show_date'    => '',
			'date_format'  => get_option('date_format'),
			'child_of'     => 0,
			'exclude'      => '',
			'include'      => '',
			'title_li'     => '',
			'echo'         => 0,
			'authors'      => '',
			'sort_column'  => 'menu_order, post_title',
			'link_before'  => '',
			'link_after'   => '',
			'post_type'    => 'page',
			'post_status'  => 'publish' 
		));
		$old .= '</ul>';
		return $old;
	}

