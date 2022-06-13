const urlF = "http://192.168.0.16:4000/";

const findFood = async () => {
    await $.ajax({
        method: 'GET',
        headers: { "Accept": "application/json" },
        url: urlF + 'food'
    }).done(function (res) {
        content = "";
        res = res.listFood;


        for (let i = 0; i < res.length; i++) {
            content += `
                <div class="menu-item">
                    <div class="menu-item-name"> ${res[i].name} </div>
                    <div class="menu-item-price"> $${res[i].price} </div>
                </div>
                `;
        };
        $("#tableFood > div").html(content)
    });
};
findFood();

const findFoodAdmin = async () => {
    await $.ajax({
        method: 'GET',
        headers: { "Accept": "application/json" },
        url: urlF + 'food/status'
    }).done(function (res) {
        content = "";
        res = res.listFood;


        for (let i = 0; i < res.length; i++) {
            content += `
            <tr class="text-center">
                <td>${i+1}</td>
                <td>${res[i].name}</td>
                <td>$${res[i].price}</td>
                <td>${res[i].status == 1 ? "Activo" : "Inactivo"} </td>
                <td>
                    <button class='btn btn-warning' data-toggle='modal' onclick='getInfoFood(${res[i].id})' data-target='#updateFood'><i class="fa-solid fa-pen-clip"></i></button>
                </td>
                <td>
                    <button class='btn btn-success' data-toggle='modal' onclick='getInfoDown(${res[i].id})' data-target='#eliminar'><i class="fa-solid fa-arrows-rotate"></i></button>
                </td>
            </tr>
                `;
        };
        $("#tableFood > tbody").html(content)
    });
};
findFoodAdmin();


const getByIdFood = async id => {
    return await $.ajax({
        type: 'GET',
        url: urlF + 'food/' + id
    }).done(res => {
        console.log(res);
    });
};

const getInfoFood = async id => {
    let food = await getByIdFood(id);

    document.getElementById('id_update').value = food.food[0].id;
    document.getElementById('nameInfo').value = food.food[0].name;
    document.getElementById('priceInfo').value = food.food[0].price;
}

const getInfoDown = async (id) => {
    let food = await getByIdFood(id);
  
    let status = food.food[0].status;
  
    if (status === 0) {
        status = 1;
    } else {
        status = 0;
    }
  
    $.ajax({
      type: 'POST',
      url: urlF + 'food/delete/' + id,
      data: { status },
    }).done((res) => {
      if (res.status === 200) {
        Swal.fire({
          title: 'Se elimino correctamente',
          confirmButtonText: 'Aceptar',
          icon: 'success',
        });
        findFoodAdmin();
      } else {
        Swal.fire({
          title: 'Hubo un errro al actualizar',
          confirmButtonText: 'Aceptar',
          icon: 'error',
        });
        findFoodAdmin();
      }
      
      console.log(status);
    });
  };
  
  




const registerClient = async () => {
    let name = document.getElementById('name').value;
    let price = document.getElementById('price').value;
    if (name != "" && price != "") {
        await $.ajax({
            type: 'POST',
            headers: { "Accept": "application/json" },
            url: urlF + "food/create/",
            data: { name, price }
        }).done(res => {
            if (res.status === 200) {
                Swal.fire({
                    title: "Se guardo correctamente",
                    confirmButtonText: "Aceptar",
                    icon: "success",
                });
            } else {
                Swal.fire({
                    title: "Hubo un errro al crear",
                    confirmButtonText: "Aceptar",
                    icon: "error",
                });
            }
            findFoodAdmin();
        });
    } else {
        Swal.fire({
            title: "Rellena ambos campos primero",
            confirmButtonText: "Aceptar",
            icon: "error",
        })
    }
};

const closeModal = () => {
    let modal = document.getElementById("updateFood");
    $(modal).modal('hide')
}

const updateFood = async() => {
    let id = document.getElementById('id_update').value;
    let name = document.getElementById('nameInfo').value;
    let price = document.getElementById('priceInfo').value;

    $.ajax({
        type: 'POST',
        url: urlF + 'food/update/' + id,
        data: { name, price }
    }).done(res => {
        if (res.status === 200) {
            Swal.fire({
                title: "Se actualizo correctamente",
                confirmButtonText: "Aceptar",
                icon: "success",
            });
        } else {
            Swal.fire({
                title: "Hubo un errro al actualizar",
                confirmButtonText: "Aceptar",
                icon: "error",
            });
        }
        findFoodAdmin();
        closeModal();
    });
};

