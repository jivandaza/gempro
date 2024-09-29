import materialService from "../services/materialService.js";

export const createMaterial = async (req, res) => {
    const { name } = req?.body;

    try {
        if (!name) {
            return res.status(400).json({error: 'El nombre es obligatorio'});
        }

        const existMaterial = await materialService.getMaterialByName(name);

        if (existMaterial) {
            return res.status(400).json({error: 'El material ya existe'});
        }

        await materialService.createMaterial(name);

        return res.status(201).json({message: 'Material creado exitosamente'});
    }  catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            error: 'Ocurrió un error, intenta más tarde',
        });
    }
};

export const getAllMateriales = async (req, res) => {
    try {
        const materiales = await materialService.getAllMateriales();

        return res.status(200).json({materiales});
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            error: 'Ocurrió un error, intenta más tarde',
        });
    }
};