<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <header>
		<?php 
			if ( is_singular() ) { 
				echo '<h1 class="entry-title">'.get_the_title().'</h1>'; 
			} else { 
				echo '<h2 class="entry-title"><a href="'.get_the_permalink().'" title="'.get_the_title().'" rel="bookmark">'.get_the_title().'</a></h2>'; 
			} 
			?> 
        <?php if ( !is_search() ) get_template_part( 'entry', 'meta' ); ?>
    </header>
    <?php get_template_part( 'entry', ( is_archive() || is_search() || !is_singular() ? 'summary' : 'content' ) ); ?>
    <?php if ( !is_search() ) get_template_part( 'entry-footer' ); ?>
</article>