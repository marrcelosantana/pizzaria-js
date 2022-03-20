// ** LISTAGEM DAS PIZZAS **

let modalQt = 1;
let cart = [];
let modalKey = 0;

pizzaJson.map((item, index) => {
  //Clonando o modelo HTML.
  let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);

  //Preenchendo o HTML clonado com os dados da API Fake.
  pizzaItem.setAttribute('data-key', index);
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
  pizzaItem.querySelector('.pizza-item--img img').src = item.img;

  //Realizando as ações ao clicar em um produto.
  pizzaItem.querySelector('a').addEventListener('click', (event) => {
    event.preventDefault();
    let key = event.target.closest('.pizza-item').getAttribute('data-key'); //Dando uma key para cada item.
    modalQt = 1;
    modalKey = key;

    //Preenchendo os dados do modal de acordo com a key dos produtos.
    document.querySelector('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    document.querySelector('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
    document.querySelector('.pizzaBig img').src = pizzaJson[key].img;
    document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`

    document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');

    //Pegando os tamanhos do produto de acordo com a posição de cada um.
    document.querySelectorAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
      if(sizeIndex === 2){
        size.classList.add('selected');
      }
      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
    });

    document.querySelector('.pizzaInfo--qt').innerHTML = modalQt;

    //Criando uma animação ao abrir o modal.
    document.querySelector('.pizzaWindowArea').style.opacity = 0;
    document.querySelector('.pizzaWindowArea').style.display = 'flex';
    setTimeout(() => {
      document.querySelector('.pizzaWindowArea').style.opacity = 1;
    }, 200)
  });
  
  //Pegando o item criado e jogando na div para aparecer listando.
  document.querySelector('.pizza-area').append( pizzaItem );
});

// ** EVENTOS DO MODAL **

function closeModal() {
  document.querySelector('.pizzaWindowArea').style.opacity = 0;
  setTimeout(() => {
    document.querySelector('.pizzaWindowArea').style.display = 'none';
  }, 500);
}

//Colocando a função closeModal() nos botões.
document.querySelectorAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
  item.addEventListener('click', closeModal);
});

//Funções de aumentar e diminuir o número de pizzas no modal.
document.querySelector('.pizzaInfo--qtmenos').addEventListener('click', () => {
  if(modalQt > 1){
    modalQt--;
    document.querySelector('.pizzaInfo--qt').innerHTML = modalQt;
  }
});

document.querySelector(".pizzaInfo--qtmais").addEventListener('click', () => {
  modalQt++;
  document.querySelector('.pizzaInfo--qt').innerHTML = modalQt;
});

//Função de selecionar os tamanhos das pizzas no modal.
document.querySelectorAll('.pizzaInfo--size').forEach((size) => {
  size.addEventListener('click', () => {
    document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
    size.classList.add('selected');
  })
});

//Função do botão de ADICIONAR no modal.
document.querySelector('.pizzaInfo--addButton').addEventListener('click', () => {
  let size = parseInt(document.querySelector('.pizzaInfo--size.selected').getAttribute('data-key'));

  /*Verificando se já existe um item com mesmo tamanho e id, então ao invés de adicionar um novo, 
  ele aumenta a quantidade do que já existe.*/

  let identifier = pizzaJson[modalKey].id+'@'+size;
  let key = cart.findIndex((item) => {
    return item.identifier == identifier;
  });

  if(key !== -1){
    cart[key].qt += modalQt;
  }else{
    cart.push({
      identifier,
      id: pizzaJson[modalKey].id,
      size,
      qt: modalQt
    });
  }
  closeModal();
})

