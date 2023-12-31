$('#post-comment').hide();

$('#btn-toggle-comment').click(e => {
    e.preventDefault();
    $('#post-comment').slideToggle();
})

$('#btn-like').click(function(e) {
    e.preventDefault();
    let imgId = $(this).data('id') //$ = de este elemento -- (this) = de este botón, traeme la propiedad id
    $.post('/images/' + imgId + '/like')
        .done(data => {
            console.log(data);
            $('.likes-count').text(data.likes);
        })
})

$('#btn-delete').click(function(e) {

    e.preventDefault();
    let $this = $(this); 
    const response = confirm('¿Estás seguro de quieres eliminar la imagen?');
    if (response){
        let imgId = $this.data('id')
        $.ajax({
            url: '/images/' + imgId,
            type: 'DELETE',
        })
        .done(function(result) {
            $this.removeClass('btn-danger').addClass('btn-success');
            $this.find('i').removeClass('fa-times').addClass('fa-check');
            $this.append('<span>Eliminado</span>')
        })
    }

})