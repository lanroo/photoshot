const UNSPLASH_ACCESS_KEY = 'qa7HUlX2aBAficyO4Q-fj1PvA2ZyW-r2GCbMzGQW6xI';

document.addEventListener('DOMContentLoaded', function() {
    const photos = document.querySelectorAll('.photo');
    const modal = document.querySelector('.modal');
    const enlargedPhoto = modal.querySelector('img');
    const closeButton = modal.querySelector('button');
    const gallery = document.querySelector('.gallery');

    // Função para fechar o modal
    function closeModal() {
        modal.style.display = 'none';
    }
    
    // Adicione o event listener para o botão Close
    document.querySelector('.modal button').addEventListener('click', closeModal);

    // Função para adicionar novas imagens à galeria
    function addImages() {
        fetch(`https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}&count=10`)
        .then(response => response.json())
        .then(data => {
            data.forEach(photo => {
                const photoDiv = document.createElement('div');
                photoDiv.className = 'photo';
                photoDiv.style.backgroundImage = `url('${photo.urls.small}')`;
                gallery.appendChild(photoDiv);

                // Adicione o evento de clique à nova imagem
                photoDiv.addEventListener('click', function() {
                    enlargedPhoto.src = photo.urls.full;
                    modal.style.display = 'flex';
                });
            });
        })
        .catch(error => {
            console.error("Houve um erro ao buscar as imagens:", error);
        });
    }

    // evento de clique a cada foto
    photos.forEach(photo => {
        photo.addEventListener('click', function() {
            const backgroundImage = this.style.backgroundImage;
            const imageUrl = backgroundImage.slice(5, backgroundImage.length - 2);
            
            enlargedPhoto.src = imageUrl;
            modal.style.display = 'flex';
        });
    });

    // evento de clique ao botão "Close" para fechar a modal
    closeButton.addEventListener('click', closeModal);
    

    // Adiciona imagens iniciais
    addImages();

    // Detecta quando o usuário está quase no final da página
    window.addEventListener('scroll', function() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) { 
            addImages();
        }
    });
});
