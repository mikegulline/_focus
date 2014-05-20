<section class="entry-content">
	<?php 	if ( has_post_thumbnail() ) { the_post_thumbnail('liqid-feature', array('class'=>"respond pano")); } // || liqid-feature-fixed ?>
    <?php 	if (class_exists('MultiPostThumbnails')) : 
				MultiPostThumbnails::the_post_thumbnail(get_post_type(), 'secondary-image', NULL, 'thumbnail', array('class'=>"round99 shadow-big emb1")); 
				MultiPostThumbnails::the_post_thumbnail(get_post_type(), 'third-image', NULL, 'thumbnail', array('class'=>"round99 shadow-big emb2"));
			endif; ?>
    <?php the_content(); ?>
    <div class="entry-links"><?php wp_link_pages(); ?></div>
</section>