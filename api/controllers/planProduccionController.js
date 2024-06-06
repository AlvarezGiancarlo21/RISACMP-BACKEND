const PlanProduccion = require('../models/PlanProduccion');

//Obtener todos
exports.getAllPlanProduccion = async (req,res) => {
    try {
        const plan_produccion = await PlanProduccion.find({});
        res.status(200).json(plan_produccion);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Obtener por ID
exports.getByIDPlanProduccion = async (req,res) => {
    try {
        const { id } = req.params;
        const plan_produccion = await PlanProduccion.findById(id);
        res.status(200).json(plan_produccion);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Registrar plan de produccion
exports.postPlanProduccion = async (req,res) => {
    try {
        const plan_produccion = await PlanProduccion.create(req.body);
        res.status(200).json(plan_produccion);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Editar plan de produccion
exports.updatePlanProduccionByID = async (req, res) => {
    const { id } = req.params;
    const { title, start, end, color } = req.body;

    try {
        let plan = await PlanProduccion.findById(id);

        if (!plan) return res.status(404).json({ msg: 'Plan de produccion no encontrado' });

        plan.title = title || plan.title;
        plan.start = start || plan.start;
        plan.end = end || plan.end;
        plan.color = color || plan.color;

        await plan.save();

        res.json({ msg: 'Plan actualizado correctamente' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
}