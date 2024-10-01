import Dropzone from "dropzone";

Dropzone.autoDiscover = false;

const dropzone = new Dropzone('#dropzone', {
    dictDefaultMessage: "Upload a new photo",
    acceptedFiles: ".png, .jpg, .jpeg,. gif",
    addRemoveLinks: true,
    dictRemoveFile: "Remove file",
    maxFiles: 1,
    uploadMultiple: false,
    init: function() {
        if(document.querySelector('[name="imagen"]').value.trim()) {
            const uploadedImage = {};
            uploadedImage.size = 1234;
            uploadedImage.name = document.querySelector('[name="imagen"]').value;

            this.options.addedfile.call(this, uploadedImage);
            this.options.thumbnail.call(this, uploadedImage, "/uploads/${uploadedImage.name}");
            uploadedImage.previewElement.classList.add(
                "dz-success",
                "dz-complete"
            );
        }
    }
});

dropzone.on('success', function(file, response) {
    console.log(response);
    document.querySelector('[name="imagen"]').value = response.imagen;
});

dropzone.on('removedfile', function(){
    console.log("File has been removed");
});