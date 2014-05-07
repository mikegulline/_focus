<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <meta name="viewport" content="width=device-width, minimum-scale=1; maximum-scale=1" />
    <title><?php wp_title( ' | ', true, 'right' ); ?></title>
    <link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_uri(); ?>" />
    <?php wp_head(); ?>
</head>
<body <?php body_class('w'.lq_get_theme_option('site_width_max')); ?> data-max-width="<?php echo  lq_get_theme_option('site_width_max') ?>">
    <div id="wrapper" class="hfeed wrapper">
    	<div class="menu-fix wrapper"></div>
        <header id="header" role="banner" class="wrapper">
        	<?php
				wp_nav_menu(
					array(
						'theme_location'  	=> 'top',
						'container_class' 	=> 'site-pad menu-sub menu-sub-top', 
						'echo' 				=> 1,
						'fallback_cb'     	=> false
					)
				);
			?>
            <section id="branding" class="site-pad">
            	<h1 class="m-b m-b-0 m-t-20"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php esc_attr_e( get_bloginfo( 'name' ), '_focus' ); ?>" rel="home"><?php echo esc_html( get_bloginfo( 'name' ) ); ?></a></h1>
                <p id="site-description" class="m-b-20"><?php bloginfo( 'description' ); ?></p>
            </section>
            <nav id="menu" role="navigation" class="site-pad">
                <div id="search">
                <?php get_search_form(); ?>
                </div>
                <?php
					echo wp_nav_menu( 
						array( 
							'container' 		=> false,
							'echo'         		=> 0,
							'theme_location' 	=> 'main-menu',
							'fallback_cb'     	=> 'liqid_wp_old_menu',
						) 
					); 
				?>
            </nav>
        </header>
        <div id="container">