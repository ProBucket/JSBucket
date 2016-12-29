$(document).ready(function(){

    showGreenLoading('current');

    getStep('current');                                            // OnLoad page get the step.

    $('body').delegate('.next-step','click', function(){           // OnClick Next button.
        var  step_counter = getStepCounter();

        var form_valid = validateStepForm(step_counter);

        if(form_valid === true){
            if(step_counter == 6){                                // Step6: Delivery Details
                showLoading();
                processOrder();
            } else {
                getStep('next');
            }
        }

    });

    $('body').delegate('.previous-step','click', function(){     // OnClick Previous button.
        getStep('previous');
    });

    $('body').delegate('.bin-product','click', function(){
        $('.bin-product').each(function(i, obj) {
            $(this).removeClass('bin-selected');
        });
        $(this).addClass('bin-selected');
        var bin_id = $(this).find('.bin-id').val();
        var bin_price = $(this).find('.bin-price').val();
        $('#product_id').val(bin_id);
        $('#product_price').val(bin_price);
    });

    $('body').delegate('#special_waste_contact_form_submit','click', function(e){
        e.preventDefault();
        var is_valid = validateContactForm();

        if(is_valid == true){
            var action_url = '/booking/special_waste_contact';
            var action_res = 'special_waste_contact';
            var request_type = 'post';
            var data = $('#special_waste_contact_form').serialize();

            var loader_content  = '<div class="center-align" style="margin-top: 50px;margin-bottom: 50px;"> <img  src=" ' + BASE_URL + '/public/src/site/images/green_loader.gif" alt="Product Image" /> </div>';
            $('.show-loader').html(loader_content);

            commonAjax(data, action_url, action_res, request_type);
        }

    });

    $('body').on('click', function(e){
        if ($('.popup-content').is(':visible')) {
            if (!$(e.target).closest('.cart_poup').length){
                if (!$(e.target).closest('.popup-content').length){
                    $('.popup-content').addClass('hide');
                }
            }
        }
    });

    $('.cart_poup').on('click', function(e){
        var $cart_poup = $('.popup-content');
        if ($cart_poup.hasClass('hide')) {
            $cart_poup.removeClass('hide');
        } else {
            $cart_poup.addClass('hide');
        }
    });

});

function validateContactForm(){
    var details_form = $("#contact_form");

    details_form.validate({
        rules: {
            name: "required",
            address: "required",
            comment: "required",
            email_address: {
                required: true,
                email: true
            },
            phone_number: {
                required: true,
                number: true,
                maxlength: 12,
                minlength: 4
            }
        },
        messages: {
            name: "Please enter your full name",
            address: "Please enter your address",
            comment: "Please enter your comment",
            email_address: {
                required: "Please enter your email address",
                email: "Your email address must be in the format of name@domain.com"
            },
            phone_number: {
                required: "Please enter your phone number",
                number: "Please enter your number",
                maxlength: "Max length is 12",
                minlength: "Min length is 4"
            }
        }
    });

    return details_form.valid();
}

function scrollGoTo(classOrId){
    $('html,body').animate({scrollTop: $(classOrId).offset().top}, 'slow');
}

function validateStepForm(step_counter){

    var form_valid = true;

    // Step1:
    if(step_counter == 1){

        var suburb_name = $('#suburb_autocomplate').val();
        if(!suburb_name){
            var error_msg = 'Please select a suburb!';
            swal(error_msg, "This field is required" , "error");
            form_valid = false;
        }

    // Step2:
    } else if(step_counter == 2){

        var product_id = $('#product_id').val();
        if(!product_id){
            var error_msg = 'Please select a bin!';
            swal(error_msg, "This field is required" , "error");
            form_valid = false;
        }

    // Step3:
    } else if (step_counter == 3){

        var waste_type_val = parseInt($('input[name=waste_id]:checked').val());
        if(SPECIAL_WASTE_ID == waste_type_val){
            form_valid = false;
            $('#special_waste_modal').modal('show');
        } else {
            if($('input[name=waste_id]:checked').length <= 0) {
                var error_msg = 'Please select type of waste!';
                swal(error_msg, "This field is required" , "error");
                form_valid = false;
            }
        }

    // Step4
    } else if (step_counter == 4){

        if($('input[name=place_id]:checked').length <= 0) {
            var error_msg = 'Please select placing!'
            swal(error_msg, "This field is required" , "error");
            form_valid = false;
        }

    // Step5
    } else if(step_counter == 5){

        var delivery_date = $('#delivery_date').val();
        var pickup_date = $('#pickup_date').val();
        if(!delivery_date || !pickup_date){
            var error_msg = 'Please select delivery and pickup date!'
            swal(error_msg, "All fields are required" , "error");
            form_valid = false;
        }

    // Step6: Delivery Details
    } else if(step_counter == 6){

        removeControlSection();

        var details_form = $("#form-step6");

        details_form.validate({
            rules: {
                first_name: "required",
                last_name: "required",
                email: {
                    required: true,
                    email: true
                },
                confirm_email: {
                    required: true,
                    email: true,
                    equalTo: '[name="email"]'
                },
                delivery_address: "required",
                billing_address: "required",
                delivery_suburb: "required",
                billing_suburb: "required",
                delivery_zipcode: {
                    required: true,
                    number: true,
                    maxlength: 6,
                    minlength: 3
                },
                billing_zipcode: {
                    required: true,
                    number: true,
                    maxlength: 6,
                    minlength: 3
                },
                delivery_mobile: {
                    required: true,
                    number: true
                },
                billing_mobile: {
                    required: true,
                    number: true
                },
                site_manager_name: "required",
                delivery_instruction: "required",
                site_manager_phone_number: {
                    required: true,
                    number: true,
                    maxlength: 12,
                    minlength: 4
                }
            },
            messages: {
                first_name: "Please enter your first name",
                last_name: "Please enter your last name",
                email: {
                    required: "Please enter your email",
                    email: "Your email address must be in the format of name@domain.com"
                },
                confirm_email: {
                    required: "Please enter confirm email",
                    email: "Your email address must be in the format of name@domain.com",
                    equalTo: "Email and confirm email must be same."
                },
                delivery_address: "Please enter your delivery address",
                billing_address: "Please enter your billing address",
                delivery_suburb: "Please enter your delivery suburb",
                billing_suburb: "Please enter your billing suburb",
                delivery_zipcode: {
                    required: "Please enter your delivery zipcode",
                    number: "Please enter number",
                    maxlength: "Cannot enter more than 6 digit",
                    minlength: "Cannot enter less than 3 digit"
                },
                billing_zipcode: {
                    required: "Please enter your billing zipcode",
                    number: "Please enter number",
                    maxlength: "Cannot enter more than 6 digit",
                    minlength: "Cannot enter less than 3 digit"
                },
                delivery_mobile: {
                    required: "Please enter your delivery mobile",
                    number: "Please enter number"
                },
                billing_mobile: {
                    required: "Please enter your billing mobile",
                    number: "Please enter number"
                },
                site_manager_name: "Please enter your site manager name",
                delivery_instruction: "Please enter your delivery instruction",
                site_manager_phone_number: {
                    required: "Please enter site manager phone number",
                    number: "Please enter number",
                    maxlength: "Max length is 12",
                    minlength: "Min length is 4"
                }
            }
        });

        var id_valid = details_form.valid();

        if (id_valid == false){
            var error_msg = 'Please enter all information!';
            swal(error_msg, "All fields are required" , "error");
            form_valid = false;
            addControlSection();
        }

    }

    return form_valid;

}

function removeControlSection(){
    $('.button-group').empty();
}

function addControlSection(){
    var html_content  = '<a href="#" class="back-btn previous-step">Previous</a> <a href="#" class="next-btn next-step">Next</a>';
    $('.button-group').append(html_content);
}

function getStepCounter(){
    return $('#step_counter').val();
}

function processOrder(){
    var step_counter = getStepCounter();
    var action_url = '/booking/process_order';
    var action_res = 'process_order';
    var request_type = 'post';
    var data = $('#form-step'+step_counter).serialize();
    commonAjax(data, action_url, action_res, request_type);
}

function getStep(step) {
    if(step == 'next'){
        getNextStep()
    } else if(step == 'previous'){
        getPreviousStep()
    } else {
        var action_url = '/booking/get_current_step';
        var action_res = 'get_current_step';
        var request_type = 'get';
        var data = '';
        commonAjax(data, action_url, action_res, request_type);
    }
}

function getPreviousStep(){
    var step_counter = getStepCounter();
    var action_url = '/booking/get_previous_step';
    var action_res = 'get_previous_step';
    var request_type = 'post';
    var data = {
        step_counter: step_counter,
        _token: CSRF_FIELD
    };
    showGreenLoading('previous');
    commonAjax(data, action_url, action_res, request_type);
}

function getNextStep(){
    var step_counter = getStepCounter();
    var action_url = '/booking/get_next_step';
    var action_res = 'get_next_step';
    var request_type = 'post';
    var data = $('#form-step'+step_counter).serialize();
    showGreenLoading('next');
    commonAjax(data, action_url, action_res, request_type);
}

function commonAjax(data, action_url, action_res, request_type) {
    $.ajax({
        async:true,
        type: request_type,
        data: data,
        url: BASE_URL + action_url,
        complete:function(request, json) {
            insertDom(request.responseText,action_res);
        }
    })
}

function insertDom(response, action_res) {
    
    if( action_res == 'process_order'){

        if(response.status == 'Error' ){
            swal(response.msg);
            addControlSection();
        } else {
            location.href = BASE_URL+'/booking/payment';
        }

    } else if(action_res == 'cart_popup') {

        $('.popup-content').html(response);

        scrollGoTo('.checkout-step-bar');

    } else if(action_res == 'special_waste_contact') {

        if(response == 'Success'){
            $('.special_waste_msg').removeClass('hidden');
            $('.show-loader').html('');
            // redirect to google after 4 seconds
            window.setTimeout(function() {
                location.href = BASE_URL+'/booking';
            }, 3000);
        }

    } else {

        $('.booking-content').html(response);

        buttonControl();

        getCartPopup();

        scrollGoTo('.checkout-step-bar');
    }
    
}

function buttonControl() {
    var step_counter = getStepCounter();
    if(parseInt(step_counter) == 1){
        $('.previous-step').hide();
    } else {
        $('.previous-step').show();
    }
}

function getCartPopup(){
    var action_url = '/booking/get_cart_popup';
    var action_res = 'cart_popup';
    var request_type = 'get';
    var data = '';
    commonAjax(data, action_url, action_res, request_type);
}

function showLoading(){
    swal({
        title: "Order processing...",
        text: "We are going to take you to the payment page.",
        imageUrl: BASE_URL+"/public/src/site/images/green_loader.gif"
    });
    $('.confirm').remove();
}

function showGreenLoading(step_type){
    if(step_type == 'current'){
        var html_content  = '<div class="center-align step-green-loader" style="margin-top: 100px"> <img  src=" ' + BASE_URL + '/public/src/site/images/green_loader.gif" alt="Product Image" /> </div>';
        $('.booking-content').html(html_content);
    } else {
        var html_content  = '<div class="center-align step-green-loader" style="margin-top: 40px"> <img  src=" ' + BASE_URL + '/public/src/site/images/green_loader.gif" alt="Product Image" /> </div>';
        $('.step-content').html(html_content);
    }

}
