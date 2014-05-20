<?php
	function lq_contact_form($atts){
		extract( shortcode_atts( 
			array( 
				'to'  => '',
				'subject'  => '',
				'input_class'  => '',
				'button_class'  => ''
			), 
			$atts 
		));
		global $emailSent, $hasError, $mail;
		echo $mail;
		$form = '';
		if($hasError) $form = '<div class="thewrapper warning"><p><strong>Please fill out the required fields.</strong></p></div>';
		if($emailSent){
			$form = '<div class="thewrapper success"><p>Message sent! Thank you.</p></div>';
		}elseif($to){
			$form .= '
			<form action="" method="post" class="liqid-contact-form">
			
				<input type="text" name="contact_name" id="author" value="'.(isset($_POST['contact_name']) && !empty($_POST['contact_name'])?$_POST['contact_name']:'').'" placeholder="'. __('Name*', 'liqid').'" size="22" tabindex="1" aria-required="true" class="input-name '.$input_class.'">

				<input type="text" name="email" id="email" value="'.(isset($_POST['email']) && !empty($_POST['email'])? $_POST['email']:'').'" placeholder="'.__('Email*', 'liqid').'" size="22" tabindex="2" aria-required="true" class="input-email '.$input_class.'">

				'.($subject!=''?'<input type="hidden" name="sub" id="sub" value="'.$subject.'" >':'<input type="text" name="sub" id="sub" value="'.(isset($_POST['sub']) && !empty($_POST['sub'])?$_POST['sub']:'').'" placeholder="'. __('Subject', 'liqid').'" size="22" tabindex="3" class="input-website '.$input_class.'">').'
				
				<input type="hidden" name="to" id="to" value="'.$to.'" >
				<input type="hidden" name="liqid-contact-form" id="liqid-contact-form" value="1" >
				<textarea name="msg" id="comment" cols="39" rows="4" tabindex="4" class="textarea-comment '.$input_class.'" placeholder="'.__('Message', 'liqid').'">'.(trim(isset($_POST['msg']) && !empty($_POST['msg'])?$_POST['msg']:'')).'</textarea>

				<input name="submit" type="submit" id="submit" tabindex="5" value="'. __('Submit', 'liqid').'" class=" '.$button_class.'">		

			</form>';
			
		}
		return $form;
	}
	add_shortcode( 'lq_contact_form', 'lq_contact_form' );
	
	//If the form is submitted
	if(isset($_POST['liqid-contact-form'])) {
		global $hasError, $emailSent;
		//Check to make sure that the name field is not empty
		if(trim($_POST['contact_name']) == '' || trim($_POST['contact_name']) == 'Name (required)') {
			$hasError = true;
		} else {
			$name = trim($_POST['contact_name']);
		}
		//Subject field is not required
		$subject = trim($_POST['sub']);
	
		//Check to make sure sure that a valid email address is submitted
		if(trim($_POST['email']) == '' || trim($_POST['email']) == 'Email (required)')  {
			$hasError = true;
		} else if (!filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL)) {
			$hasError = true;
		} else {
			$email = trim($_POST['email']);
		}
	
		//Check to make sure comments were entered
		if(trim($_POST['msg']) == '' || trim($_POST['msg']) == 'Message') {
			$hasError = true;
		} else {
			if(function_exists('stripslashes')) {
				$comments = stripslashes(trim($_POST['msg']));
			} else {
				$comments = trim($_POST['msg']);
			}
		}
		
		//If there is no error, send the email
		if(!isset($hasError)) {
			$emailSent = true;
			$emailTo = trim($_POST['to']); //Put your own email address here
			$body = "Name: $name \n\nEmail: $email \n\nSubject: $subject \n\nComments: $comments";
			$headers = '';
			$mail = wp_mail($emailTo, $subject, $body, $headers);
			
		}
	}
?>