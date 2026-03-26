import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKTv8bAF_LZ4Kz1vst0leAkA3se-hiCOg",
  authDomain: "cinestart-leandro.firebaseapp.com",
  projectId: "cinestart-leandro",
  storageBucket: "cinestart-leandro.firebasestorage.app",
  messagingSenderId: "1010066915771",
  appId: "1:1010066915771:web:496a9b12a95fd23bd2849e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const setPeliculas = async () => {
  const data = await fetch("http://localhost/CineStart-FireStore/peliculas");
  const peliculas = await data.json();
  peliculas.data.forEach((pelicula) => {
    addDoc(collection(db, "peliculas"), pelicula);
  });
};

const setCines = async () => {
  const data = await fetch("http://localhost/CineStart-FireStore/cines");
  const cines = await data.json();
  cines.data.forEach(async (cine) => {
    const peliculas = await fetch(
      `http://localhost/CineStart-FireStore/cines/${cine.id}/peliculas`,
    );
    cine.peliculas = (await peliculas.json()).data;

    const tarifas = await fetch(
      `http://localhost/CineStart-FireStore/cines/${cine.id}/tarifas`,
    );
    cine.tarifas = (await tarifas.json()).data;
    addDoc(collection(db, "cines"), cine);
  });
};

// setPeliculas();
// setCines();

// Funciones para obtener los datos de Firestore
export const getPeliculas = async () => {
  const query = await getDocs(collection(db, "peliculas"));
  return query.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getCines = async () => {
  const query = await getDocs(collection(db, "cines"));
  return query.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
