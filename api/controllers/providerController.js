const Provider = require('../models/Provider');

exports.registerProvider = async (req, res) => {
  const { ruc, razonSocial, direccion, telefono, lugarProcedencia } = req.body;

  try {
    let provider = await Provider.findOne({ ruc });

    if (provider) {
      return res.status(400).json({ msg: 'Provider already exists' });
    }

    provider = new Provider({
      ruc,
      razonSocial,
      direccion,
      telefono,
      lugarProcedencia,
    });

    await provider.save();

    res.json({ msg: 'Provider registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.getAllProviders = async (req, res) => {
    try {
        const providers = await Provider.find();
        res.json(providers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

exports.updateProviderById = async (req, res) => {
    const { id } = req.params;
    const { ruc, razonSocial, direccion, telefono, lugarProcedencia } = req.body;

    try {
        let provider = await Provider.findById(id);

        if (!provider) {
            return res.status(404).json({ msg: 'Proveedor no encontrado' });
        }

        provider.ruc = ruc || provider.ruc;
        provider.razonSocial = razonSocial || provider.razonSocial;
        provider.direccion = direccion || provider.direccion;
        provider.telefono = telefono || provider.telefono;
        provider.lugarProcedencia = lugarProcedencia || provider.lugarProcedencia;

        await provider.save();

        res.json({ msg: 'Proveedor actualizado exitosamente' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

exports.deleteProviderById = async (req, res) => {
    const { id } = req.params;

    try {
        let provider = await Provider.findById(id);

        if (!provider) {
            return res.status(404).json({ msg: 'Proveedor no encontrado' });
        }

        await Provider.findByIdAndDelete(id);

        res.json({ msg: 'Proveedor eliminado exitosamente' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

exports.getProviderById = async (req, res) => {
    const { id } = req.params;

    try {
        const provider = await Provider.findById(id);

        if (!provider) {
            return res.status(404).json({ msg: 'Proveedor no encontrado' });
        }

        res.json(provider);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};