const func = async () => {
  const response = await window.versions.ping()
  console.log(response) // prints out 'pong'
}

func()

window.api.getAllRows().then((rows) => {
  console.log(rows);
}).catch((err) => {
  console.error(err);
});