const func = async () => {
  const response = await window.versions.ping()
  console.log(response) // prints out 'pong'
}

func()

// window.api.getAllRows().then((rows) => {
//   console.log(rows);
// }).catch((err) => {
//   console.error(err);
// });

window.api.getAllRows().then((rows) => {
  console.log(rows);
  const videoPlayer = document.getElementById('videoPlayer');

  document.querySelectorAll('.video-list li').forEach(li => {
    li.addEventListener('click', () => {
      videoPlayer.src = li.dataset.src;
    });
  });

  const list = document.getElementById('myList');
  
  // Create a list item for each row and add it to the list
  rows.forEach(row => {
    const li = document.createElement('li');
    li.innerText = row.title; // select 'title' column in the database
    li.onclick = () => {
      const videoPlayer = document.getElementById('videoPlayer');
      videoPlayer.src = `data:video/mp4;base64,${row.base64string}`; // select 'base64string' column which contains encoded video data
      videoPlayer.play();
    };
    list.appendChild(li);
  });
}).catch((err) => {
  console.error(err);
});