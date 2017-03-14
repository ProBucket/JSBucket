// Event file upload
    $('#event-slideshow-image').uploadifive({
        'auto'             : true,
        'formData'         : {
            'timestamp' : '',
            'token'     : ''
        },
        'fileType'     : 'image',
        'removeCompleted' : true,
        'swf': SITE_URL + 'uploadify/uploadify.swf',
        'uploadScript': SITE_URL + 'admin/events/eventBannerUpload',
        'onUploadComplete': function (file, response) {
            if(response) {
                if(response != 'Error'){
                    var uploaded_image_block = $(
                        '<div class="form-group col-md-3">' +
                        '   <div>' +
                        '       <img style="position: absolute; top: 10px"  src="' + SITE_URL + 'uploads/events/' + response + '" height="40" alt="">' +
                        '   </div>' +
                        '   <div>' +
                        '       <input type="hidden" name="slideshow_image" value="' + response + '">' +
                        '   </div>'+
                        '</div>'
                    );
                    $('.uploadifive-queue-item').remove();
                } else {
                    var uploaded_image_block = $(
                        '<div class="form-group col-md-6">' +
                        '   <div>' +
                        '       <p>This file formate is not allowed</p>' +
                        '   </div>' +
                        '   <div>' +
                        '       <input type="hidden" name="thumbnail_image" value="' + response + '">' +
                        '   </div>'+
                        '</div>'
                    );
                }
                $('.event-slideshow').html(uploaded_image_block);
            }
        }
    });
