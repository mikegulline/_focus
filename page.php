<?php get_header(); ?>
<section id="content" class="site-pad"role="main">
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        <section class="entry-content">
        	<!--<h1 class="entry-title"><?php the_title(); ?></h1>-->
			<?php if ( has_post_thumbnail() ) { the_post_thumbnail('liqid-feature', array('class'=> 'respond')); } ?>
            <?php the_content(); ?>
            <div class="entry-links"><?php wp_link_pages(); ?></div>
            <?php edit_post_link(); ?>
        </section>
    </article>
    <?php if ( ! post_password_required() ) comments_template( '', true ); ?>
    <?php endwhile; endif; ?>
</section>
<?php get_sidebar(); ?>
<?php get_footer(); ?>