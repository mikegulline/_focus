<section class="entry-content">
	<?php if ( has_post_thumbnail() ) { the_post_thumbnail('liqid-feature-fixed', array('class'=>"respond shadow-big")); } ?>
    <?php the_content(); ?>
    <div class="entry-links"><?php wp_link_pages(); ?></div>
</section>