$(document).ready(function () {
    $(document).on('click', '.delete-btn', function () {
        var userId = $(this).data('user-id');
        $('#deleteUserId').val(userId);
    });

    $(document).ready('click', '.delete-brand-btn', function () {
        var userId = $(this).data('brand-id');
        $('#deleteBrandID').val(userId);
    });

    $(document).on('click', '.delete-brand-btn', function () {
        var userId = $(this).data('brand-id');
        $('#deleteBrandID').val(userId);
    });

    $(document).on('click', '.edit-btn', function () {
        var userId = $(this).data('user-id');
        console.log(userId);
        $.ajax({
            url: '/get-user/' + userId,
            type: 'GET',
            success: function (data) {
                $('#id').val(data.id);
                $('#fullname').val(data.name);
                $('#gender').val(data.gender);
                $('#user_address').val(data.address);
                $('#phonenumber').val(data.phone_number);
                $('#email').val(data.email);
                $('#user_point').val(data.user_point);
            }
        });
    });

    $(document).on('click', '#add-phone-btn', function () {
        $('#new_brand_name').empty();
        $('#new_category_name').empty();
        $('#new_os_name').empty();
        $('#new_brand_name').select2({
            dropdownParent: $('#addPhone .modal-content'),
            width: '100%'
        });
        $('#new_category_name').select2({
            dropdownParent: $('#addPhone .modal-content'),
            width: '100%'
        });
        $('#new_os_name').select2({
            dropdownParent: $('#addPhone .modal-content'),
            width: '100%'
        });
        $.ajax({
            url: '/addPhone',
            type: 'GET',
            success: function (response) {
                for (let i = 0; i < response[0].length; ++i) {
                    $('#new_brand_name').append('<option value="' + response[0][i].brand_id + '">' +
                        response[0][i].brand_name +
                        '</option>')
                }
                for (let i = 0; i < response[1].length; ++i) {
                    $('#new_category_name').append('<option value="' + response[1][i].category_id + '">' +
                        response[1][i].category_name +
                        '</option>')
                }
                for (let i = 0; i < response[2].length; ++i) {
                    $('#new_os_name').append('<option value="' + response[2][i].os_id + '">' +
                        response[2][i].os_name +
                        '</option>')
                }
            },
        })
    })

    $(document).on('click', '.phone-edit-btn', function () {
        var phoneId = $(this).data('phone-id');
        $.ajax({
            url: '/editPhone/' + phoneId,
            type: 'GET',
            success: function (response) {
                $('#phone_id').val(response[0].phone_id);
                $('#phone_name').val(response[0].phone_name);
                $('#description').summernote('code', response[0].description);
                $('#youtube_url').val(response[0].youtube_url)
                $('#brand_name').empty();
                $('#category_name').empty();
                $('#os_name').empty();
                for (let i = 0; i < response[1].length; ++i) {
                    $('#brand_name').append(
                        '<option value="' + response[1][i].brand_id + '" ' + (response[0].brand_id == response[1][i].brand_id ? ' selected ' : '') + ' >' + response[1][i].brand_name + '</option>'
                    );
                }

                for (let i = 0; i < response[2].length; ++i) {
                    $('#category_name').append(
                        '<option value="' + response[2][i].category_id + '" ' + (response[0].category_id == response[2][i].category_id ? ' selected ' : '') + '>' + response[2][i].category_name + '</option>'
                    );
                }

                for (let i = 0; i < response[3].length; ++i) {
                    $('#os_name').append(
                        '<option value="' + response[3][i].os_id + '" ' + (response[0].os_id == response[3][i].os_id ? ' selected ' : '') + ' >' + response[3][i].os_name + '</option>'
                    );
                }
            }
        });
    });

    $(document).on('click', '#add-details-form-btn', function () {
        $('#new_phone_id').val($('#ed_phone_id').val());
        $('#new_img_holder').empty();
        $('#new_thumbnail_holder').empty();
        $('#add-details-form').removeClass('d-none');
        $('#edit-selected-details-form').addClass('d-none');
        $('#add-details-form-based-on-color').addClass('d-none');
        $('#new_thumbnail_holder').append('<div class="col-3 p-1 position-relative">' +
            '<img id="new_thumbnail_img" src="/image/' + 'no_image.png' + '" class="h-100 w-100 border rounded" style="z-index: 1001">' +
            '<label for="new_thumbnail">' +
            '<button class="btn position-absolute top-0 end-0 rounded-circle bg-dark mb-3 change-thumbnail-btn" data-thumbnail-type="insert" style="z-index: 998" type="button"><i class="fa-solid fa-rotate text-light"></i></button>' +
            '<input type="file" class="form-control d-none" id="new_thumbnail" name="thumbnail">' +
            '</label>' +
            '</div>');
        $('#new_img_holder').append('<div id="new-add-img-btn" class="col-3 p-1 text-center d-flex min-col"><button class="btn w-100 h-100 my-auto border rounded add-img-btn" data-details-type="insert" style="font-size: 3rem;" type="button">+</button></div>');
        $('#new_color_select').empty();
        $('#new_specs_select').empty();
        $('#new_color_select').select2({
            dropdownParent: $('#editDetails .modal-content')
        });
        $('#new_specs_select').select2({
            dropdownParent: $('#editDetails .modal-content')
        })
        var phoneId = $('#ed_phone_id').val();
        $.ajax({
            url: '/addDetails/' + phoneId,
            type: 'GET',
            success: function (response) {
                for (let i = 0; i < response[0].length; ++i) {
                    $('#new_color_select').append('<option value="' + response[0][i].color_id + '" >' +
                        response[0][i].color_name +
                        '</option>');
                }

                for (let i = 0; i < response[1].length; ++i) {
                    $('#new_specs_select').append('<option value="' + response[1][i].specific_id + '" >' +
                        response[1][i].specific_name +
                        '</option>')
                }
            }
        })
    })

    $(document).on('click', '#close-add-details-form-btn', function () {
        $('#add-details-form').addClass('d-none');
    })

    $(document).on('click', '#close-add-bo-details-form-btn', function () {
        $('#add-details-form-based-on-color').addClass('d-none');
    })

    $(document).on('click', '.edit-selected-details-btn', function () {
        var detailsId = $(this).data('details-id');
        $('#add-details-form').addClass('d-none');
        $('#add-details-form-based-on-color').addClass('d-none');
        $.ajax({
            url: '/editSelectedDetails/' + detailsId,
            type: 'GET',
            success: function (response) {
                $('#edit-selected-details-form').removeClass('d-none');
                $('#ed_details_id').val(response[0].phone_details_id);
                $('#img_holder').empty();
                $('#thumbnail_holder').empty();
                $('#ed_color_select').empty();
                $('#ed_specs_select').empty();
                $('#ed_color_select').select2({
                    dropdownParent: $('#editDetails .modal-content')
                });
                $('#ed_specs_select').select2({
                    dropdownParent: $('#editDetails .modal-content')
                })
                $('#ed_details_screen').val(response[0].screen);
                $('#ed_details_ram').val(response[0].ram);
                $('#ed_details_rom').val(response[0].rom);
                $('#ed_details_cpu').val(response[0].cpu);
                $('#ed_details_frontcam').val(response[0].front_cam);
                $('#ed_details_rearcam').val(response[0].rear_cam);
                $('#ed_details_bluetoothver').val(response[0].bluetooth_ver);
                $('#ed_details_wifiver').val(response[0].wifi_ver);
                $('#ed_details_nfc').val(response[0].nfc);
                $('#ed_details_price').val(response[0].price);
                $('#ed_details_discount').val(response[0].discount);
                $('#ed_details_quantity').val(response[0].quantity);

                $('#thumbnail_holder').append('<div class="col-3 p-1 position-relative">' +
                    '<img id="thumbnail_img" src="/image/' + response[0].thumbnail_img + '" class="h-100 w-100 border rounded" style="z-index: 1001">' +
                    '<label for="thumbnail">' +
                    '<button class="btn position-absolute top-0 end-0 rounded-circle bg-dark mb-3 change-thumbnail-btn" style="z-index: 998" type="button"><i class="fa-solid fa-rotate text-light"></i></button>' +
                    '<input type="file" class="form-control d-none" id="thumbnail" name="thumbnail">' +
                    '</label>' +
                    '</div>'
                )

                for (let i = 0; i < response[1].length; ++i) {
                    $('#img_holder').append('<div id="img-col-id-' + response[1][i].image_id + '" class="col-3 p-1 position-relative min-col">' +
                        '<img src="/image/' + response[1][i].file_path + '" class="h-100 w-100 border rounded" style="z-index: 999">' +
                        '<button data-img-id="' + response[1][i].image_id + '" data-file-name="' + response[1][i].file_path + '" class="btn position-absolute top-0 end-0 rounded-circle bg-danger mb-3 remove-img-btn" style="z-index: 998"><i class="fa-solid fa-xmark text-light"></i></button>' +
                        '</div>');
                }

                for (let i = 0; i < response[2].length; ++i) {
                    $('#ed_color_select').append('<option value="' + response[2][i].color_id + '" ' + (response[0].color_id == response[2][i].color_id ? ' selected ' : '') + '>' +
                        response[2][i].color_name +
                        '</option>');
                }

                for (let i = 0; i < response[3].length; ++i) {
                    $('#ed_specs_select').append('<option value="' + response[3][i].specific_id + '" ' + (response[0].specific_id == response[3][i].specific_id ? ' selected ' : '') + '>' +
                        response[3][i].specific_name +
                        '</option>')
                }

                $('#img_holder').append('<div id="add-img-btn" class="col-3 p-1 text-center d-flex min-col"><button class="btn w-100 h-100 my-auto border rounded add-img-btn" style="font-size: 3rem;" type="button">+</button></div>');
            }
        });
    })

    $(document).on('click', '.change-thumbnail-btn', function () {
        if ($(this).data('thumbnail-type') == 'insert') {
            $('#new_thumbnail').click();
        } else {
            $('#thumbnail').click();
        }
        // var fileName = $('#thumbnail').val().replace(/.*[\/\\]/, '');
    })

    $(document).on('click', '.remove-img-btn', function () {
        var imgId = $(this).data('img-id');
        var fileName = $(this).data('file-name');
        $('#img-col-id-' + imgId).remove();
        $('#file-' + imgId).remove();
        $('#img_holder').append('<input name="delete-details-img[]" class="d-none" type="text" value="' + fileName + '">');
    })

    $(document).on('click', '.add-img-btn', function () {
        $('.input-img-added').filter(function () {
            return !$(this).val()
        }).remove();
        var uniqueId = Math.floor(Date.now() * Math.random());
        if ($(this).data('details-type') == 'insert') {
            $('#new_img_holder').append('<input id="file-' +
                uniqueId +
                '" type="file" class="d-none input-img-added" data-input-type="insert" name="file[]' +
                '" data-img-id="' + uniqueId + '">');
        } else {
            $('#img_holder').append('<input id="file-' +
                uniqueId +
                '" type="file" class="d-none input-img-added" name="file[]' +
                '" data-img-id="' + uniqueId + '">');
        }
        $('#file-' + uniqueId).click();
    })

    $(document).on('change', '#thumbnail', function () {
        if ($(this).prop('files') && $(this).prop('files')[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#thumbnail_img').attr('src', e.target.result);
            };
            reader.readAsDataURL($(this).prop('files')[0]);
        }
    })

    $(document).on('change', '#new_thumbnail', function () {
        if ($(this).prop('files') && $(this).prop('files')[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#new_thumbnail_img').attr('src', e.target.result);
            };
            reader.readAsDataURL($(this).prop('files')[0]);
        }
    })

    $(document).on('change', '.input-img-added', function () {
        if ($(this).prop('files') && $(this).prop('files')[0]) {
            var reader = new FileReader();
            var uniqueId = $(this).data('img-id');
            var fileName = $(this).val().replace(/.*[\/\\]/, '');
            var type = $(this).data('input-type');
            reader.onload = function (e) {
                if (type == 'insert') {
                    $('#new-add-img-btn').remove();
                    $('#new_img_holder').append('<div id="img-col-id-' + uniqueId + '" class="col-3 p-1 position-relative min-col">' +
                        '<img id="auto-img-' + uniqueId + '" class="h-100 w-100 border rounded" style="z-index: 999">' +
                        '<button data-img-id="' + uniqueId + '" class="btn position-absolute top-0 end-0 rounded-circle bg-danger mb-3 remove-img-btn" style="z-index: 998"><i class="fa-solid fa-xmark text-light"></i></button>' +
                        '</div>');
                    $('#new_img_holder').append('<div id="new-add-img-btn" class="col-3 p-1 text-center d-flex min-col"><button class="btn w-100 h-100 my-auto border rounded add-img-btn" data-details-type="insert" style="font-size: 3rem;" type="button">+</button></div>');
                } else {
                    $('#add-img-btn').remove();
                    $('#img_holder').append('<div id="img-col-id-' + uniqueId + '" class="col-3 p-1 position-relative min-col">' +
                        '<img id="auto-img-' + uniqueId + '" class="h-100 w-100 border rounded" style="z-index: 999">' +
                        '<button data-img-id="' + uniqueId + '" class="btn position-absolute top-0 end-0 rounded-circle bg-danger mb-3 remove-img-btn" style="z-index: 998"><i class="fa-solid fa-xmark text-light"></i></button>' +
                        '</div>');
                    $('#img_holder').append('<div id="add-img-btn" class="col-3 p-1 text-center d-flex"><button class="btn w-100 h-100 my-auto border rounded add-img-btn" style="font-size: 3rem;" type="button">+</button></div>');
                }
                $('#auto-img-' + uniqueId).attr('src', e.target.result);
            };
            reader.readAsDataURL($(this).prop('files')[0]);
        } else {
            alert('!')
        }
    })

    $(document).on('submit', '#edit-selected-details-form', function (e) {
        var phoneId = $('#ed_phone_id').val();
        e.preventDefault();
        var formData = new FormData($(this)[0]);
        $.ajax({
            url: '/editSelectedDetailsSubmit',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                ajaxGetDetails(phoneId)
                $('#details_edit_notification').removeClass('d-none')
                $('#details_edit_notification').addClass('show')
                $('#details_edit_notification').empty();
                $('#details_edit_notification').html('<p>Sửa thành công</p>')
                setTimeout(function () {
                    $('#details_edit_notification').alert('close')
                    $('#details_edit_notification').addClass('d-none')
                }, 4000)
            },
            error: function () {
                $('#details_edit_notification_failed').removeClass('d-none')
                $('#details_edit_notification_failed').addClass('show')
                $('#details_edit_notification_failed').empty();
                $('#details_edit_notification_failed').html('<p>Sửa thất bại</p>')
                setTimeout(function () {
                    $('#details_edit_notification_failed').alert('close')
                    $('#details_edit_notification_failed').addClass('d-none')
                }, 4000)
            }
        })
    })

    $(document).on('submit', '#add-details-form', function (e) {
        var phoneId = $('#ed_phone_id').val();
        e.preventDefault();
        var formData = new FormData($(this)[0]);
        $.ajax({
            url: '/addPhoneDetailsSubmit',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                ajaxGetDetails(phoneId)
                $('#details_add_notification').removeClass('d-none')
                $('#details_add_notification').addClass('show')
                $('#details_add_notification').empty();
                $('#details_add_notification').html('<p>Thêm thành công</p>')
                setTimeout(function () {
                    $('#details_add_notification').alert('close')
                    $('#details_add_notification').addClass('d-none')
                }, 4000)
            },
            error: function () {
                $('#details_add_notification_failed').removeClass('d-none')
                $('#details_add_notification_failed').addClass('show')
                $('#details_add_notification_failed').empty();
                $('#details_add_notification_failed').html('<p>Thêm thất bại</p>')
                setTimeout(function () {
                    $('#details_add_notification_failed').alert('close')
                    $('#details_add_notification_failed').addClass('d-none')
                }, 4000)
            }
        })
    })

    $(document).on('click', '#close-edit-details-form-btn', function () {
        $('#edit-selected-details-form').addClass('d-none');
    })

    function formatVND(num) {
        var p = num.toFixed(0).split(".");
        return p[0].split("").reverse().reduce(function (acc, num, i, orig) {
            return num + (num != "-" && i && !(i % 3) ? "," : "") + acc;
        }, "") + " VNĐ";
    }

    function ajaxGetColors(phone_id) {
        $.ajax({
            url: '/editColors/' + phone_id,
            type: 'GET',
            success: function (response) {

                $('#ec_phone_name').val(response[1].phone_name);
                $('#ec_phone_id').val(response[1].phone_id);
                $('#color-board').empty();
                for (let i = 0; i < response[0].length; ++i) {
                    $('#color-board').append(
                        '<tr>' +
                        '<td scope="row">' +
                        response[0][i].color_id +
                        '</td>' +
                        '<td>' +
                        response[0][i].color_name +
                        '</td>' +
                        '<td>' +
                        response[0][i].phone_details_count +
                        '</td>' +
                        '<td>' +
                        '<button data-color-id="' + response[0][i].color_id + '" class="btn btn-primary edit-selected-color-btn">Sửa</button>' +
                        '<button data-color-id="' + response[0][i].color_id + '" class="ms-1 btn btn-danger delete-selected-color-btn">Xóa</button>' +
                        '</td>' +
                        '</tr>'
                    )
                }
            },
            error: function () {

            }
        })
    }

    function ajaxGetSpecs(phone_id) {
        $.ajax({
            url: '/editSpecifics/' + phone_id,
            type: 'GET',
            success: function (response) {
                $('#es_phone_name').val(response[1].phone_name);
                $('#es_phone_id').val(response[1].phone_id);
                $('#specs-board').empty();
                for (let i = 0; i < response[0].length; ++i) {
                    $('#specs-board').append(
                        '<tr>' +
                        '<td scope="row">' +
                        response[0][i].specific_id +
                        '</td>' +
                        '<td>' +
                        response[0][i].specific_name +
                        '</td>' +
                        '<td>' +
                        response[0][i].phone_details_count +
                        '</td>' +
                        '<td>' +
                        '<button data-specs-id="' + response[0][i].specific_id + '" class="btn btn-primary edit-selected-specs-btn">Sửa</button>' +
                        '<button data-specs-id="' + response[0][i].specific_id + '" class="ms-1 btn btn-danger delete-selected-specs-btn">Xóa</button>' +
                        '</td>' +
                        '</tr>'
                    )
                }
            },
            error: function () {

            }
        })
    }

    function ajaxGetDetails(phone_id) {
        $.ajax({
            url: '/editDetails/' + phone_id,
            type: 'GET',
            success: function (response) {
                $('#ed_phone_name').val(response[1].phone_name);
                $('#ed_phone_id').val(response[1].phone_id);
                $('#details-board').empty();
                for (let i = 0; i < response[0].length; ++i) {
                    $('#details-board').append(
                        '<tr>' +
                        '<td scope="row"><img src="/image/' +
                        response[0][i].thumbnail_img +
                        '" style="width: 5.5rem; height: 5.5rem;"></td>' +
                        '<td>' +
                        response[0][i].phone_details_id +
                        '</td>' +
                        '<td>' +
                        response[0][i].phone_name +
                        '</td>' +
                        '<td>' +
                        response[0][i].specific_name +
                        '</td>' +
                        '<td>' +
                        response[0][i].color_name +
                        '</td>' +
                        '<td>' +
                        formatVND(Number(response[0][i].price)) +
                        '</td>' +
                        '<td>' +
                        response[0][i].discount +
                        '</td>' +
                        '<td>' +
                        '<button data-details-id="' + response[0][i].phone_details_id + '" class="btn btn-primary edit-selected-details-btn">Sửa</button>' +
                        '<button data-details-id="' + response[0][i].phone_details_id + '" class="ms-1 btn btn-danger delete-selected-details-btn">Xóa</button>' +
                        '</td>' +
                        '</tr>'
                    )
                }
            },
            error: function () {
                alert('error');
            }
        })
    }

    $(document).on('click', '.delete-selected-details-btn', function () {
        var phoneId = $('#ed_phone_id').val();
        var detailsId = $(this).data('details-id');
        $.ajax({
            url: '/deleteDetails/' + detailsId,
            type: 'GET',
            success: function (response) {
                ajaxGetDetails(phoneId)
                $('#details_delete_notification').removeClass('d-none')
                $('#details_delete_notification').addClass('show')
                $('#details_delete_notification').empty();
                $('#details_delete_notification').html('<p>Xóa thành công</p>')
                setTimeout(function () {
                    $('#details_delete_notification').alert('close')
                    $('#details_delete_notification').addClass('d-none')
                }, 4000)
            },
            error: function () {
                $('#details_delete_notification_failed').removeClass('d-none')
                $('#details_delete_notification_failed').addClass('show')
                $('#details_delete_notification_failed').empty();
                $('#details_delete_notification_failed').html('<p>Xóa thất bại</p>')
                setTimeout(function () {
                    $('#details_delete_notification_failed').alert('close')
                    $('#details_delete_notification_failed').addClass('d-none')
                }, 4000)
            }
        })
    })

    $(document).on('click', '.phone-delete-btn', function () {
        var phoneId = $(this).data('phone-id');
        $.ajax({
            url: '/deletePhone/' + phoneId,
            type: 'GET',
            success: function (response) {
                location.reload();
            }
        });
    })

    $(document).on('click', '.edit-phone-details-btn', function () {
        var phoneId = $(this).data('phone-id');
        ajaxGetDetails(phoneId);
    })

    $(document).on('click', '.edit-phone-specs-btn', function () {
        var phoneId = $(this).data('phone-id');
        ajaxGetSpecs(phoneId)
    })

    $(document).on('click', '.edit-phone-color-btn', function () {
        var phone_id = $(this).data('phone-id');
        ajaxGetColors(phone_id);
    });

    $(document).on('click', '.edit-selected-color-btn', function () {
        var color_id = $(this).data('color-id');
        $('#add-color-form').addClass('d-none');
        $('#add-color-form-btn').removeClass('d-none');
        $.ajax({
            url: '/editSelectedColor/' + color_id,
            type: 'GET',
            success: function (response) {
                $('#edit-color-form').removeClass('d-none');
                $('#ec_color_id').val(response.color_id)
                $('#ec_color_name').val(response.color_name)
                $('#edit_notification').addClass('d-none');
            }
        })
    });

    $(document).on('click', '#close-edit-color-form-btn', function () {
        $('#edit-color-form').addClass('d-none');
        $('#ec_color_id').val('')
        $('#ec_color_name').val('')
        $('#notification').addClass('d-none');
    })

    $(document).on('click', '.edit-selected-specs-btn', function () {
        var specsId = $(this).data('specs-id');
        $('#add-specs-form').addClass('d-none');
        $('#add-specs-form-btn').removeClass('d-none');
        $.ajax({
            url: '/editSelectedSpecific/' + specsId,
            type: 'GET',
            success: function (response) {
                $('#edit-specs-form').removeClass('d-none');
                $('#es_specs_id').val(response.specific_id)
                $('#es_specs_name').val(response.specific_name)
                $('#edit_specs_notification').addClass('d-none');
            }
        });
    })

    $(document).on('click', '#close-edit-specs-form-btn', function () {
        $('#edit-specs-form').addClass('d-none');
        $('#es_specs_id').val('')
        $('#es_specs_name').val('')
        $('#edit_specs_notification').addClass('d-none');
    })

    $(document).on('submit', '#edit-specs-form', function (e) {
        var phone_id = $('#es_phone_id').val()
        e.preventDefault()
        var form = $(this)
        $.ajax({
            url: '/editSelectedSpecificSubmit',
            type: 'POST',
            data: form.serialize(),
            success: function (response) {
                ajaxGetSpecs(phone_id)
                $('#specs_edit_notification').removeClass('d-none')
                $('#specs_edit_notification').addClass('show')
                $('#specs_edit_notification').empty();
                $('#specs_edit_notification').append('<p>Sửa thành công</p>')
                setTimeout(function () {
                    $('#specs_edit_notification').alert('close')
                    $('#specs_edit_notification').addClass('d-none')
                }, 4000)
            },
            error: function () {
                $('#specs_edit_notification_failed').removeClass('d-none')
                $('#specs_edit_notification_failed').addClass('show')
                $('#specs_edit_notification_failed').empty();
                $('#specs_edit_notification_failed').append('<p>Sửa thất bại</p>')
                setTimeout(function () {
                    $('#specs_edit_notification_failed').alert('close')
                    $('#specs_edit_notification_failed').addClass('d-none')
                }, 4000)
            }
        })
    })

    $(document).on('submit', '#edit-color-form', function (e) {
        var phone_id = $('#ec_phone_id').val()
        e.preventDefault()
        var form = $(this)
        $.ajax({
            type: 'POST',
            url: '/editSelectedColorSubmit',
            data: form.serialize(),
            success: function (response) {
                ajaxGetColors(phone_id)
                $('#color_edit_notification').removeClass('d-none')
                $('#color_edit_notification').addClass('show')
                $('#color_edit_notification').empty();
                $('#color_edit_notification').append('<p>Sửa thành công</p>')
                setTimeout(function () {
                    $('#color_edit_notification').alert('close')
                    $('#color_edit_notification').addClass('d-none')
                }, 4000)
            },
            error: function () {
                $('#color_edit_notification_failed').removeClass('d-none')
                $('#color_edit_notification_failed').addClass('show')
                $('#color_edit_notification_failed').empty();
                $('#color_edit_notification_failed').append('<p>Sửa thất bại</p>')
                setTimeout(function () {
                    $('#color_edit_notification_failed').alert('close')
                    $('#color_edit_notification_failed').addClass('d-none')
                }, 4000)
            }
        })
    })

    $(document).on('click', '#add-specs-form-btn', function () {
        $('#edit-specs-form').addClass('d-none');
        $('#add-specs-form').removeClass('d-none')
        $('#add_specs_notification').addClass('d-none');
        $('#new_specs_name').val('')
        $('#add-specs-form-btn').addClass('d-none');
    })

    $(document).on('click', '#close-add-specs-form-btn', function () {
        $('#add-specs-form').addClass('d-none')
        $('#add_specs_notification').addClass('d-none');
        $('#new_specs_name').val('')
        $('#add-specs-form-btn').removeClass('d-none');
    })

    $(document).on('submit', '#add-specs-form', function (e) {
        var phoneId = $('#es_phone_id').val();
        e.preventDefault();
        var form = $(this);
        $.ajax({
            url: '/addSpecificSubmit',
            type: 'POST',
            data: form.serialize() + '&' + 'phone_id=' + phoneId,
            success: function (response) {
                ajaxGetSpecs(phoneId)
                $('#specs_add_notification').removeClass('d-none')
                $('#specs_add_notification').addClass('show')
                $('#specs_add_notification').empty();
                $('#specs_add_notification').html('<p>Thêm thành công</p>')
                setTimeout(function () {
                    $('#specs_add_notification').alert('close')
                    $('#specs_add_notification').addClass('d-none')
                }, 4000)
            },
            error: function () {
                $('#specs_add_notification_failed').removeClass('d-none')
                $('#specs_add_notification_failed').addClass('show')
                $('#specs_add_notification_failed').empty();
                $('#specs_add_notification_failed').html('<p>Thêm thất bại</p>')
                setTimeout(function () {
                    $('#specs_add_notification_failed').alert('close')
                    $('#specs_add_notification_failed').addClass('d-none')
                }, 4000)
            }
        })
    })

    $(document).on('click', '.delete-selected-specs-btn', function () {
        var phoneId = $('#es_phone_id').val();
        var specsId = $(this).data('specs-id');
        $.ajax({
            url: '/deleteSpecific/' + specsId,
            type: 'GET',
            success: function (response) {
                ajaxGetSpecs(phoneId)
                $('#specs_delete_notification').removeClass('d-none')
                $('#specs_delete_notification').addClass('show')
                $('#specs_delete_notification').empty();
                $('#specs_delete_notification').html('<p>Xóa thành công</p>')
                setTimeout(function () {
                    $('#specs_delete_notification').alert('close')
                    $('#specs_delete_notification').addClass('d-none')
                }, 4000)
            },
            error: function () {
                $('#specs_delete_notification_failed').removeClass('d-none')
                $('#specs_delete_notification_failed').addClass('show')
                $('#specs_delete_notification_failed').empty();
                $('#specs_delete_notification_failed').html('<p>Xóa thất bại</p>')
                setTimeout(function () {
                    $('#specs_delete_notification_failed').alert('close')
                    $('#specs_delete_notification_failed').addClass('d-none')
                }, 4000)
            }
        })
    })


    $(document).on('click', '#close-add-color-form-btn', function () {
        $('#add-color-form').addClass('d-none');
        $('#add_notification').addClass('d-none');
        $('#add-color-form-btn').removeClass('d-none');
        $('#delete_notification').addClass('d-none')
    })

    $(document).on('click', '#add-color-form-btn', function () {
        $('#edit-color-form').addClass('d-none');
        $('#add-color-form').removeClass('d-none');
        $('#add-color-form-btn').addClass('d-none');
        $('#delete_notification').addClass('d-none')
        $('#new_color_id').val('');
    })

    $(document).on('submit', '#add-color-form', function (e) {
        var phone_id = $('#ec_phone_id').val()
        e.preventDefault();
        var form = $(this);
        $.ajax({
            type: 'POST',
            url: '/addColorSubmit',
            data: form.serialize() + '&' + 'phone_id=' + phone_id,
            success: function (response) {
                ajaxGetColors(phone_id)
                $('#add_notification').removeClass('d-none')
                $('#add_notification').addClass('show')
                $('#add_notification').empty();
                $('#add_notification').html('<p>Thêm thành công</p>')
                setTimeout(function () {
                    $('#add_notification').alert('close')
                    $('#add_notification').addClass('d-none')
                }, 4000)
            },
            error: function () {
                $('#add_notification_failed').removeClass('d-none')
                $('#add_notification_failed').addClass('show')
                $('#add_notification_failed').empty();
                $('#add_notification_failed').html('<p>Thêm thất bại</p>')
                setTimeout(function () {
                    $('#add_notification_failed').alert('close')
                    $('#add_notification_failed').addClass('d-none')
                }, 4000)
            }
        })
    })

    $(document).on('click', '#add-bo-details-form-btn', function () {
        $('#bo_phone_id').val($('#ed_phone_id').val());
        $('#add-details-form').addClass('d-none');
        $('#edit-selected-details-form').addClass('d-none');
        $('#add-details-form-based-on-color').removeClass('d-none');
        $('#bo_new_color_select').empty();
        $('#bo_new_specs_select').empty();
        $('#bo_new_color_select').select2({
            dropdownParent: $('#editDetails .modal-content'),
            width: '100%'
        });
        $('#bo_new_specs_select').select2({
            dropdownParent: $('#editDetails .modal-content'),
            width: '100%'
        });

        var phone_id = $('#ed_phone_id').val();
        $.ajax({
            url: '/getDetailsList/' + phone_id,
            type: 'GET',
            success: function(response) {
                for (let i = 0; i < response[0].length; ++i) {
                    $('#bo_new_color_select').append('<option value="' + response[0][i].phone_details_id + '">' + 
                    '[' + response[0][i].phone_details_id + '] ' +response[0][i].phone_name + ' ' + response[0][i].specific_name + ' ' + response[0][i].color_name +
                    '</option>')
                }

                for (let i = 0; i < response[1].length; ++i) {
                    $('#bo_new_specs_select').append('<option value="' + response[1][i].specific_id + '">' + 
                    response[1][i].specific_name +
                    '</option>')
                }
            }
        })
    })

    $(document).on('submit', '#add-details-form-based-on-color', function (e) {
        e.preventDefault();
        var phoneId = $('#ed_phone_id').val();
        var formData = new FormData($(this)[0]);
        $.ajax({
            url: '/addDetailsByCurrentColor',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                ajaxGetDetails(phoneId)
                $('#details_bo_add_notification').removeClass('d-none')
                $('#details_bo_add_notification').addClass('show')
                $('#details_bo_add_notification').empty();
                $('#details_bo_add_notification').html('<p>Thêm thành công</p>')
                setTimeout(function () {
                    $('#details_bo_add_notification').alert('close')
                    $('#details_bo_add_notification').addClass('d-none')
                }, 4000)
            },
            error: function () {
                $('#details_bo_add_notification_failed').removeClass('d-none')
                $('#details_bo_add_notification_failed').addClass('show')
                $('#details_bo_add_notification_failed').empty();
                $('#details_bo_add_notification_failed').html('<p>Thêm thất bại</p>')
                setTimeout(function () {
                    $('#details_add_notification_failed').alert('close')
                    $('#details_add_notification_failed').addClass('d-none')
                }, 4000)
            }
        })
    })

    $(document).on('click', '.delete-selected-color-btn', function () {
        var phone_id = $('#ec_phone_id').val()
        var color_id = $(this).data('color-id');
        $.ajax({
            type: 'GET',
            url: '/deleteColor/' + color_id,
            success: function (response) {
                ajaxGetColors(phone_id)
                $('#delete_notification').removeClass('d-none')
                $('#delete_notification').addClass('show')
                $('#delete_notification').empty();
                $('#delete_notification').html('<p>Xóa thành công</p>')
                setTimeout(function () {
                    $('#delete_notification').alert('close')
                    $('#delete_notification').addClass('d-none')
                }, 4000)
            },
            error: function () {
                $('#delete_notification_failed').removeClass('d-none')
                $('#delete_notification_failed').addClass('show')
                $('#delete_notification_failed').empty();
                $('#delete_notification_failed').html('<p>Xóa thất bại</p>')
                setTimeout(function () {
                    $('#delete_notification_failed').alert('close')
                    $('#delete_notification_failed').addClass('d-none')
                }, 4000)
            }
        })
    })

    $('#search').on('input', function () {
        var searchTerm = $(this).val().trim();
        $.ajax({
            url: '/searchUser/' + searchTerm,
            type: 'GET',
            success: function (data) {
                $('#data-body').empty();

                $.each(data, function (index, user) {
                    console.log(user);

                    var row = '<tr>' +
                        '<th scope="row">' + user.id + '</th>' +
                        '<td>' + user.name + '</td>' +
                        '<td>' + user.phone_number + '</td>' +
                        '<td>' + user.gender + '</td>' +
                        '<td>' + user.address + '</td>' +
                        '<td>' + user.email + '</td>' +
                        '<td>' + user.user_point + '</td>' +
                        '<td>' +
                        '<a class="col btn btn-primary edit-btn" data-bs-toggle="modal" data-bs-target="#editUser" data-user-id="' + user.id + '">Sửa</a>' +
                        '<a class="col btn btn-danger delete-btn" data-bs-toggle="modal" data-bs-target="#deleteUser" data-user-id="' + user.id + '">Xóa</a>' +
                        '</td>' +
                        '</tr>';
                    $('#data-body').append(row);
                });
            }
        });
    });


    $(document).on('click', '.list-brand-btn', function () {
        var brand_id = $(this).data('brand-id');
        $.ajax({
            url: '/listItemBrand/' + brand_id,
            type: 'GET',
            success: function (data) {
                $('#data-body-list-brand-item').empty();
                console.log(data);
                for (let i = 0; i < data[0].length; ++i) {
                    var row = '<tr>' +
                        '<th scope="row">' + data[0][i].phone_id + '</th>' +
                        '<td>' + data[0][i].phone_name + '</td>' +
                        '<td>' + data[0][i].brand_name + '</td>' +
                        '<td>' + data[0][i].category_description + '</td>' +
                        '<td>' + data[0][i].os_name + '</td>' +
                        '<td>' + data[0][i].colors_count + ' <button type="button"  class="btn btn-sm btn-warning edit-phone-color-btn" data-bs-toggle="modal"  data-bs-target="#editPhoneColor" data-phone-id="' + data[0][i].phone_id + '">Chi tiết</button>' + '</td>' +
                        '<td>' + data[0][i].specifics_count + '<button type="button" class="btn btn-sm btn-warning">Chi tiết</button> ' + '</td>' +
                        '<td>' + data[0][i].phone_details_count + '<button type="button" class="btn btn-sm btn-warning">Chi tiết</button> ' + '</td>' +
                        '<td>' + ' <a class="col btn btn-primary phone-edit-btn" data-bs-toggle="modal" data-bs-target="#editPhone" data-phone-id="' + data[0][i].phone_id + '">Sửa</a>   <a class="col btn btn-danger phone-edit-btn" data-bs-toggle="modal" data-bs-target="#" data-phone-id="{{ $row->phone_id }}">Xóa</a></td>' +
                        '</tr>';
                    $('#data-body-list-brand-item').append(row);
                }
            }
        })
    })

    $(document).on('click', '.phone-edit-btn', function () {
        var id = $(this).data('phone-id');
        $.ajax({
            url: '/editPhone/' + id,
            type: 'GET',
            success: function (response) {
                $('#phone_id').val(response[0].phone_id);
                $('#phone_name').val(response[0].phone_name);
                $('#description').summernote('code', response[0].description);
                $('#brand_name').empty();
                $('#category_name').empty();
                $('#os_name').empty();
                for (let i = 0; i < response[1].length; ++i) {
                    $('#brand_name').append(
                        '<option value="' + response[1][i].brand_id + '" ' + (response[0].brand_id == response[1][i].brand_id ? ' selected ' : '') + ' >' + response[1][i].brand_name + '</option>'
                    );
                }

                for (let i = 0; i < response[2].length; ++i) {
                    $('#category_name').append(
                        '<option value="' + response[2][i].category_id + '" ' + (response[0].category_id == response[2][i].category_id ? ' selected ' : '') + '>' + response[2][i].category_name + '</option>'
                    );
                }

                for (let i = 0; i < response[3].length; ++i) {
                    $('#os_name').append(
                        '<option value="' + response[3][i].os_id + '" ' + (response[0].os_id == response[3][i].os_id ? ' selected ' : '') + ' >' + response[3][i].os_name + '</option>'
                    );
                }
            }
        });
    });

    $(document).on('click', '.edit-phone-color-btn', function () {
        var id = $(this).data('phone-id');
        ajaxGetColors(id);
    });

    function ajaxGetColors(phone_id) {
        $.ajax({
            url: '/editColors/' + phone_id,
            type: 'GET',
            success: function (response) {
                $('#ec_phone_name').val(response[1].phone_name);
                $('#ec_phone_id').val(response[1].phone_id);
                $('#color-board').empty();
                for (let i = 0; i < response[0].length; ++i) {
                    $('#color-board').append(
                        '<tr>' +
                        '<td scope="row">' +
                        response[0][i].color_id +
                        '</td>' +
                        '<td>' +
                        response[0][i].color_name +
                        '</td>' +
                        '<td>' +
                        response[0][i].phone_details_count +
                        '</td>' +
                        '<td>' +
                        '<button data-color-id="' + response[0][i].color_id + '" class="btn btn-primary edit-selected-color-btn">Sửa</button>' +
                        '<button data-color-id="' + response[0][i].color_id + '" class="ms-1 btn btn-danger delete-selected-color-btn">Xóa</button>' +
                        '</td>' +
                        '</tr>'
                    )
                }
            }
        })
    }

    $(document).on('click', '.listCategory-btn', function () {
        var id = $(this).data('category-id');
        $.ajax({
            url: '/listPhoneCategory/' + id,
            type: 'get',
            success: function (data) {
                console.log(data);
                $('#data-body-list').empty();
                for (let i = 0; i < data[0].length; ++i) {
                    var row = '<tr>' +
                        '<th scope="row">' + data[0][i].phone_id + '</th>' +
                        '<td>' + data[0][i].phone_name + '</td>' +
                        '<td>' + data[0][i].brand_name + '</td>' +
                        '<td>' + data[0][i].category_description + '</td>' +
                        '<td>' + data[0][i].os_name + '</td>' +
                        '<td>' + data[0][i].colors_count + ' <button type="button"  class="btn btn-sm btn-warning edit-phone-color-btn" data-bs-toggle="modal"  data-bs-target="#editPhoneColor" data-phone-id="' + data[0][i].phone_id + '">Chi tiết</button>' + '</td>' +
                        '<td>' + data[0][i].specifics_count + '<button type="button" class="btn btn-sm btn-warning">Chi tiết</button> ' + '</td>' +
                        '<td>' + data[0][i].phone_details_count + '<button type="button" class="btn btn-sm btn-warning">Chi tiết</button> ' + '</td>' +
                        '<td>' + ' <a class="col btn btn-primary phone-edit-btn" data-bs-toggle="modal" data-bs-target="#editPhone" data-phone-id="' + data[0][i].phone_id + '">Sửa</a>   <a class="col btn btn-danger phone-edit-btn" data-bs-toggle="modal" data-bs-target="#" data-phone-id="{{ $row->phone_id }}">Xóa</a></td>' +
                        '</tr>';
                    $('#data-body-list').append(row);
                }
            }
        });
    });


    $('#searchBrand').on('input', function () {
        var searchTerm = $(this).val().trim();
        $.ajax({
            url: '/searchBrand/' + searchTerm,
            type: 'GET',
            success: function (data) {
                $('#data-body').empty();
                $.each(data, function (index, brand) {
                    console.log(brand);
                    var imageSrc = '/image/' + brand.brand_img;
                    var row = '<tr>' +
                        '<th scope="row">' + brand.brand_id + '</th>' +
                        '<td scope="row" class="align-middle"><img class="img-brand" src="' + imageSrc + '"></td>' +
                        '<td scope="row" class="align-middle">' + brand.brand_name + '</td>' +
                        '<td scope="row" class="align-middle">' + brand.brand_description + '</td>' +
                        '<td scope="row" class="align-middle"><a class="col btn btn-primary list-brand-btn" data-bs-toggle="modal" data-bs-target="#listBrand" data-brand-id="' + brand.brand_id + '">Xem danh sách</a>' +
                        '</tr>';
                    $('#data-body').append(row);
                });
            }
        });
    });
});
$(document).ready('click', '.edit-brand-btn', function () {
    var id = $(this).data('brand-id');
    $.ajax({
        url: '/loadModalBrand/' + id,
        type: 'GET',
        success: function (data) {
            // $('#Mbrand_img').val(data.brand_img);
            $('#Mbrand_name').val(data.brand_name);
            $('#Mbrand_description').val(data.brand_description);
        }
    });
});
$(document).on('click', '.edit-brand-btn', function () {
    var id = $(this).data('brand-id');
    $.ajax({
        url: '/loadModalBrand/' + id,
        type: 'GET',
        success: function (data) {
            $('#Mbrand_name').val(data.brand_name);
            $('#Mbrand_description').val(data.brand_description);
            $('#Mbrand_img').attr('src', '/image/' + data.brand_img);
        }
    });
});


$(document).ready(function () {
    $('.img-btn').click(function () {
        var id = $('#Loadbrand_img').val();
        alert(id);
    });
});
