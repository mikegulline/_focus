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
        <header id="header" role="banner" class="wrapper">
            <section id="branding">
            <!--
                <div id="site-title"><h1><a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php esc_attr_e( get_bloginfo( 'name' ), '_focus' ); ?>" rel="home"><?php echo esc_html( get_bloginfo( 'name' ) ); ?></a></h1></div>
                <div id="site-description"><?php bloginfo( 'description' ); ?></div>
            -->
            	<h1 class="m-b m-b-10"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php esc_attr_e( get_bloginfo( 'name' ), '_focus' ); ?>" rel="home"><?php echo esc_html( get_bloginfo( 'name' ) ); ?></a></h1>
                <p id="site-description"><?php bloginfo( 'description' ); ?></>
            </section>
            <nav id="menu" role="navigation">
                <div id="search">
                <?php get_search_form(); ?>
                </div>
                <?php wp_nav_menu( array( 'theme_location' => 'main-menu', 'container' => false  ) ); ?>
                
           
                
                
                
            </nav>
        </header>
        <div id="container">