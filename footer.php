            </div>
            <footer id="footer" role="contentinfo">
            	<?php
					wp_nav_menu(
						array(
							'theme_location'  	=> 'bottom',
							'container_class' 	=> 'site-pad menu-sub menu-sub-bottom', 
							'echo' 				=> 1,
							'fallback_cb'     	=> false
						)
					);
				?>
                <div id="copyright" class="site-pad">
                	<?php echo sprintf( __( '%1$s %2$s %3$s. All Rights Reserved.', '_focus' ), '&copy;', date( 'Y' ), esc_html( get_bloginfo( 'name' ) ) ); echo sprintf( __( ' Theme By: %1$s.', '_focus' ), '<a href="http://7iqid.com/">7iqid</a>' ); ?>
                </div>
            </footer>
        </div>
        <?php wp_footer(); ?>
    </body>
</html>