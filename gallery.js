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

    // Função para adicionar novas imagens à galeria
    function addImages() {
        for (let i = 0; i < 10; i++) { // Adiciona 10 imagens de cada vez
            const photoDiv = document.createElement('div');
            photoDiv.className = 'photo';
            const randomNum = Math.floor(Math.random() * 1000); // Gera um número aleatório para obter imagens diferentes
            photoDiv.style.backgroundImage = `url('https://source.unsplash.com/random/${randomNum}')`;
            gallery.appendChild(photoDiv);
        }
    }

    // Adiciona imagens iniciais
    addImages();

    // Detecta quando o usuário está quase no final da página
    window.addEventListener('scroll', function() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) { 
            addImages();
        }
    });
});
