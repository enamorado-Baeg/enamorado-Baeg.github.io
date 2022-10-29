/* Funciones globales */

const avatarImg = document.querySelectorAll('.avatarImg');
const avatarName = document.querySelectorAll('.name');
const saldo = document.querySelectorAll('.saldo');

function update() {
  avatarImg.forEach(avatarImgg => {
    avatarImgg.style.backgroundImage = `url(img/avt/avt-${localStorage.avtSelected}.png)`;
  });
  avatarName.forEach(name => {
    name.textContent = localStorage.name;
  });
  saldo.forEach(saldoo => {
    saldoo.textContent = '€'+localStorage.saldo;
  });
}

function disabled(element) {
  element.style.display = 'none';
}

function restablecer() {
  let conf = confirm('¿Seguro que quieres resteblecer la app? Se borrarán de forma permantente tus datos del juego.');
  if (conf) {
    alert('La app se ha resteblecido');
    localStorage.clear();
    window.location.reload();
  } else {
    alert('La app se ha resteblecido');
    alert('Bromita XD');
  }
}

/* Verify first time */

const registro = document.querySelector('.registro');

if (localStorage.loged === undefined) {
  registro.style.display = 'block';
} else {
  update();
}

/* Comenzar */

const form = document.querySelector('.form');
const name = document.querySelector('#name');
const edad = document.querySelector('#edad');
let avtSelected;
form.addEventListener('click', (e) => {
  e.preventDefault();
});

function comenzar() {
  if (name.value !== '' && edad.value !== '') {
    if (edad.value < 14) {
      alert('Necesitas ser mayor de 14 años :(');
    } else {
      if (localStorage.avtSelected === undefined) {
        alert('Elije tu avatar');
      } else {
        localStorage.setItem('name', name.value);
        localStorage.setItem('edad', edad.value);
        localStorage.setItem('loged', true);
        // Dinero 
        localStorage.setItem('saldo', 3000);
        registro.style.display = 'none';
        update();
      }
    }
  } else {
    alert('Llena todos los campos ;-;');
  }
}

/* Elección de primer avatar */

const avatarsDefault = document.querySelectorAll('.avatarDefault');

avatarsDefault.forEach(avatarDefault => {
  avatarDefault.onclick = () => {
    avatarsDefault.forEach(avatarDefault => {
      avatarDefault.style.borderColor = '#aaa';
    });
    avatarDefault.style.borderColor = '#00f';
    localStorage.setItem('avtSelected', avatarDefault.classList[1]);
  }
});

/* Acceder al perfil */

const btnPerfil = document.querySelector('.btnPerfil');
const perfil = document.querySelector('.perfil');

btnPerfil.addEventListener('click', () => {
  perfil.style.display = 'block';
});

/* Cambio de Nombre */

function cambiarNombre() {
  let newName = prompt('Ingrese el nombre nuevo');
  if (newName === '') {
    alert('Nombre no válido');
    return;
  }
  if (newName === null) {
    return;
  } else {
    localStorage.name = newName;
    update();
  }
}

/* Cambiar Avatar */

const avatars = document.querySelectorAll('.avatar');

let compras;
if (localStorage.comprados !== undefined) {  
  console.log('Creado');
  compras = localStorage.getItem('comprados');
  compras = JSON.parse(compras);
} else {
  console.log('Creando...');
  compras = [];
  localStorage.setItem('comprados', JSON.stringify(compras));
}

function cambiarAvatar(level, gen, price) {
  if (level !== 1) {
    let article = compras.includes(level + gen);
    if (article) {
      localStorage.avtSelected = `n${level}-${gen}`;
      update();
    } else {
      if (localStorage.saldo >= price) {
        compras.push(level+gen);
        localStorage.comprados = JSON.stringify(compras);
        localStorage.avtSelected = `n${level}-${gen}`;
        localStorage.saldo -= price;
        update();
        alert('Compra Exitosa 7u7');
      } else {
        alert('No tienes suficiente saldo :(');
      }
    }
  } else {
    localStorage.avtSelected = `n${level}-${gen}`;
    update();
  }
}
