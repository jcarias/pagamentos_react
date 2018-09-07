export const urls = {
    home: { name: "Home", path: "/" },
    services: { name: "Serviços", path: "/services", toolbar: true },
    addService: { name: "Novo Serviço", path: "/services/add", toolbar: true },
    updateService: {
        name: "Editar Serviço",
        path: "/services/update/:id",
        toolbar: true
    },
    about: { name: "Sobre", path: "/about", toolbar: true }
};

export const urlsToolbar = () => {
    let retVal = [];

    Object.keys(urls).map(key => {
        let url = urls[key];
        return retVal.push({ name: url.name, path: url.path });
    });

    return retVal;
};