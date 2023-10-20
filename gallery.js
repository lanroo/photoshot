const UNSPLASH_ACCESS_KEY = 'qa7HUlX2aBAficyO4Q-fj1PvA2ZyW-r2GCbMzGQW6xI';

document.addEventListener('DOMContentLoaded', function() {
    const photos = document.querySelectorAll('.photo');
    const modal = document.querySelector('.modal');
    const enlargedPhoto = modal.querySelector('img');
    const closeButton = modal.querySelector('button');
    const gallery = document.querySelector('.gallery');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchForm = document.getElementById('search-form'); // Adicione esta linha

    // Função para fechar o modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Adicione o event listener para o botão Close
    closeButton.addEventListener('click', closeModal);

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

    // Função para pesquisar imagens com base no termo de pesquisa
    function searchImages() {
        const searchTerm = searchInput.value;

        fetch(`https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}&count=10&query=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            gallery.innerHTML = ''; // Limpa a galeria atual
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

    // Adiciona imagens iniciais
    addImages();

    // Detecta quando o usuário está quase no final da página
    window.addEventListener('scroll', function() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
            addImages();
        }
    });

    // Adicione um evento de clique ao botão de pesquisa
    searchButton.addEventListener('click', searchImages);

    // Adicione um evento de envio de formulário ao formulário de pesquisa
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o envio do formulário
        searchImages();
    });
});
