/* Common JS */

function showLoading(loading_title, loading_text, loading_img){                  // Show sweetalert loading.
    swal({
        title: loading_title,
        text: loading_text,
        imageUrl: loading_img
    });
    $('.confirm').remove();
}

function hideLoading(){                                                         // Hide sweetalert loading.
    $('.sweet-alert').remove();
    $('.sweet-overlay').remove();
    return true;
}


