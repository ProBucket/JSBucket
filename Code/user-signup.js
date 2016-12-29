/* User signup JS */

$(document).ready(function(){
    
    $("#datepicker").datepicker({
        dateFormat: 'dd-mm-yy'
    });

    $('body').delegate('.signup-submit','click', function(e){
        e.preventDefault();
        var valid_check = validateSignupForm();
        if(valid_check == true){
            signupLoading();
            saveUser();
        }
    });

    $("#StudentSearchForm").validate({
        rules: {
            student_id : "required"
        },
        messages: {
            student_id: "Please enter student id"
        },
        submitHandler: function(form) {
            searchStudent();
        }
    });

    function validateSignupForm(){

        var signup_validation = $("#UserSignupForm");

        signup_validation.validate({
            rules: {
                first_name: "required",
                last_name: "required",
                address_line_1: "required",
                address_line_2: "required",
                city: "required",
                postcode: {
                    required: true,
                    number: true
                },
                state: "required",
                country: "required",
                dob: "required",
                password: {
                    required: true,
                    minlength: 8
                },
                confirm_password: {
                    required: true,
                    minlength: 8,
                    equalTo: "#password"
                },
                email :{
                    remote:{
                        url: SITE_URL + 'users/isEmailExist',
                        type:'post',
                        data:{
                            email:function(){
                                return $('#field-email').val()
                            }
                        }
                    },
                    required: true
                }
            },
            messages: {
                first_name: "Please enter your first name",
                last_name: "Please enter your last name",
                address_line_1: "Please enter address line1",
                address_line_2: "Please enter address line2",
                city: "Please enter your city",
                postcode: {
                    required: "Please enter postcode",
                    number: "Please enter number"
                },
                state: "Please enter your state",
                country: "Please enter your country",
                dob: "Please enter your date of birth",
                email: {
                    remote: "This email address already exist",
                    required: "Please enter your valid email address"
                },
                password: {
                    required: "Please enter password",
                    minlength: "Min length is 8"
                },
                confirm_password: {
                    required: "Please enter confirm password",
                    minlength: "Min length is 8",
                    equalTo: "Password and confirm password must be same"
                }
            }
        });

        return signup_validation.valid();

    }
    
    function signupLoading(){
        swal({
            title: "Please wait for a moment.",
            text: "We are creating your account.",
            imageUrl: "/img/green_loader.gif"
        });
        $('.confirm').remove();
    }

    function saveUser(){
        var action_url = '/users/save-user';
        var action_res = 'save-user';
        var request_type = 'post';
        var post_data = $('#UserSignupForm').serialize();

        signupAjax(post_data, action_url, action_res, request_type);
    }

    function searchStudent() {
        var action_url = '/users/search-student';
        var action_res = 'search-student';
        var request_type = 'post';
        var post_data = $('#StudentSearchForm').serialize();
        
        signupAjax(post_data, action_url, action_res, request_type);
    }

    function signupAjax(post_data, action_url, action_res, request_type) {
        $.ajax({
            type: request_type,
            data: post_data,
            url: SITE_URL + action_url,
            complete:function(request, json) {
                signupAjaxResponse(request.responseText,action_res)
            }
        })
    }

    function signupAjaxResponse(ajax_response,action_res) {

        clearMsg();
        
        if(action_res == 'save-user'){

            try {
                var response_obj = JSON.parse(ajax_response);
                if(response_obj.status == 'Error'){
                    hideLoading();
                    swal('Registration Failed!', "Please try again." , "error");
                } else if(response_obj.status == 'Success') {
                    location.href = SITE_URL+'users/login';
                }
            } catch(e){
                console.log(e);
            }


        } else if(action_res == 'search-student'){

            try {
                var response_obj = JSON.parse(ajax_response);
                if(response_obj.status == 'Error'){
                    showMessage(response_obj);
                    swal(response_obj.title, response_obj.msg , "error");
                }
            } catch(e) {
                response_obj = {
                    status: 'Success',
                    title: 'Student id valid.',
                    msg: 'Please register.'
                }
                showMessage(response_obj);
                $('.user-signup-section').html(ajax_response);
                $("#first-name").prop('readonly', true);
                $("#last-name").prop('readonly', true);
            }

        }

    }

    function showMessage(response_obj) {
        if(response_obj.status == 'Error'){
            var msg_class = 'alert-danger';
        } else {
            var msg_class = 'alert-success';
        }
        var msg_dom =  '<div class="alert '+msg_class+'" onclick="this.classList.add("hidden");">';
        msg_dom += '<a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>';
        msg_dom += '<b>' + response_obj.status + '! </b>' + response_obj.title +' '+ response_obj.msg + '</div>';

        $('.msg-section').html(msg_dom);
    }

    function clearMsg(){
        $('.msg-section').html('');
    }

});
