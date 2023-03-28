  const frutas = () =>
  axios.get("http://127.0.0.1:8082/api/citas", {
      responseType: "json",
    })
    .then((result) => {
      const { data } = result;
      console.log("entro aqui");
    });

    console.log("termino")

frutas();