// document.addEventListener("DOMContentLoaded", () => {
//   const gallery = document.querySelector(".gallery-grid");
//   const savedDrawings = JSON.parse(localStorage.getItem("galleryDrawings") || "[]");

//   if (!gallery) {
//     console.error("Gallery element not found!");
//     return;
//   }

//   if (savedDrawings.length === 0) {
//     gallery.innerHTML = "<p>No drawings yet! Go create some in the Playground 🖌️</p>";
//     return;
//   }

//   savedDrawings.forEach(dataURL => {
//     const container = document.createElement("div");
//     container.classList.add("gallery-item");

//     const img = document.createElement("img");
//     img.src = dataURL;
//     img.alt = "Canvas drawing";

//     container.appendChild(img);
//     gallery.appendChild(container);
//   });
// });

// // Function to clear the gallery in the console: clearGallery();
// function clearGallery() {
//   localStorage.removeItem('galleryDrawings');
//   alert("Gallery cleared!");
//   location.reload();
// }


const supabaseClient = window.supabase.createClient(
  'https://tusklyxsomqznrocvsne.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1c2tseXhzb21xem5yb2N2c25lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MzYyNjIsImV4cCI6MjA2NTMxMjI2Mn0.OJpcZaQi0VTYZR7nd_WOFwwK-B1Pp7ONFA84dVM_mX8'
);

async function loadGallery() {
  const { data, error } = await supabaseClient
  .from('drawings')
  .select('*')
  .order('created_at', { ascending: false });


  const container = document.getElementById('gallery-container');

  data.forEach(drawing => {
    const img = document.createElement('img');
    img.src = drawing.image;
    img.alt = 'User drawing';
    img.className = 'gallery-item';
    container.appendChild(img);
  });

}

loadGallery();

