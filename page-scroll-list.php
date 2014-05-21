<?php 	/* Template Name: Scroll List */ ?>
<?php get_header(); ?>
<section id="content" class="site-pad page-page" role="main">
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        <section class="entry-content">
        	<!--<h1 class="entry-title"><?php the_title(); ?></h1>-->
			<?php if ( has_post_thumbnail() ) { the_post_thumbnail('liqid-feature', array('class'=> 'respond')); } ?>
            <?php the_content(); ?>
            <div class="entry-links"><?php wp_link_pages(); ?></div>
            <?php edit_post_link('Edit', '<p>', '</p>'); ?>
        </section>
    </article>
    <?php if ( ! post_password_required() ) comments_template( '', true ); ?>
    <?php endwhile; endif; ?>
</section>
<aside id="sidebar" role="complementary">
    <div id="primary" class="widget-area">
        <ul class="xoxo">
        	<li>
            	<h3><?php echo $post->post_title ?></h3>
                <ul class="scroll-list">
                </ul>
            </li>
        </ul>
    </div>
</aside>
<?php get_footer(); ?>
