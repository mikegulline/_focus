<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <meta name="viewport" content="width=device-width" />
    <title><?php wp_title( ' | ', true, 'right' ); ?></title>
    <link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_uri(); ?>" />
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <div id="wrapper" class="hfeed wrapper">
    	<div class="menu-fix wrapper"></div>
        <header id="header" role="banner" class="wrapper">
            <section id="branding">
            <!--
                <div id="site-title"><h1><a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php esc_attr_e( get_bloginfo( 'name' ), '_focus' ); ?>" rel="home"><?php echo esc_html( get_bloginfo( 'name' ) ); ?></a></h1></div>
                <div id="site-description"><?php bloginfo( 'description' ); ?></div>
            -->
            	<h1 class="m-b m-b-0"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php esc_attr_e( get_bloginfo( 'name' ), '_focus' ); ?>" rel="home"><?php echo esc_html( get_bloginfo( 'name' ) ); ?></a></h1>
                <p id="site-description"><?php bloginfo( 'description' ); ?></>
            </section>
            <nav id="menu" role="navigation">
                <div id="search">
                <?php get_search_form(); ?>
                </div>
                <?php //wp_nav_menu( array( 'theme_location' => 'main-menu', 'container' => false  ) ); ?>
                <?php
                echo wp_nav_menu( 
					array( 
						'container' 		=> false,
						'echo'         		=> 0,
						'theme_location' 	=> 'main-menu',
						'fallback_cb'     	=> 'liqid_wp_old_menu',
						//'walker' 			=> new liqid_walker_nav_menu()
					) 
				); 
				class liqid_page_walker extends Walker_Page{
				 function start_lvl(&$output, $depth) {
					$indent = str_repeat("\t", $depth);
					$themenuclass = 'custom'.of_get_option('cl5').' custom'.of_get_option('cl5').of_get_option('cv5');
					$output .= "\n$indent<ul class=\"$themenuclass sub-menu drop\">\n";
				  }
				}
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
						//'walker'       => new liqid_page_walker(),
						'post_type'    => 'page',
						'post_status'  => 'publish' 
					));
					$old .= '</ul>';
					return $old;
				}
				?>
           
                
                
                
            </nav>
        </header>
        <div id="container">