<section class="entry-summary">
	<?php if ( has_post_thumbnail() && !is_search() ) { the_post_thumbnail('thumbnail', array('class'=>"right-round shadow-big")); } ?>
	<?php the_excerpt(); ?>
    <?php if( is_search() ) { ?><div class="entry-links"><?php wp_link_pages(); ?></div><?php } ?>
</section>