const Receta = require("../models/Receta");
const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");
const fs = require("fs");
exports.registerReceta = async (req, res) => {
  const { codigo, nombre, rendimiento, ingredientes, disponible } = req.body;

  try {
    let receta = await Receta.findOne({ codigo });

    if (receta) {
      return res.status(400).json({ msg: "Receta already exists" });
    }

    receta = new Receta({
      codigo,
      nombre,
      rendimiento,
      ingredientes,
      disponible,
    });

    await receta.save();

    res.json({ msg: "Receta registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getAllRecetas = async (req, res) => {
  try {
    const recetas = await Receta.find();
    res.json(recetas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error del servidor");
  }
};

exports.exportRecetasToExcel = async (req, res) => {
  try {
    const recetas = await Receta.find();

    // Crear un nuevo workbook de Excel
    const workbook = new ExcelJS.Workbook();
    const worksheetRecetas = workbook.addWorksheet("Recetas");
    const worksheetIngredientes = workbook.addWorksheet("Ingredientes");

    // Definir las cabeceras de las columnas para Recetas
    worksheetRecetas.columns = [
      { header: "Codigo", key: "codigo", width: 15 },
      { header: "Nombre", key: "nombre", width: 30 },
      { header: "Rendimiento", key: "rendimiento", width: 30 },
      { header: "Disponible", key: "disponible", width: 15 },
    ];

    // Definir las cabeceras de las columnas para Ingredientes
    worksheetIngredientes.columns = [
      { header: "Receta Codigo", key: "recetaCodigo", width: 15 },
      { header: "Nombre", key: "nombre", width: 30 },
      { header: "Cantidad", key: "cantidad", width: 15 },
      { header: "Unidad", key: "unidad", width: 15 },
    ];

    // Agregar los datos de los proveedores al worksheet
    recetas.forEach(receta => {
        worksheetRecetas.addRow({
            codigo: receta.codigo,
            nombre: receta.nombre,
            rendimiento: receta.rendimiento,
            disponible: receta.disponible
        });
    
        // Agregar los ingredientes al worksheetIngredientes
        receta.ingredientes.forEach(ingrediente => {
            worksheetIngredientes.addRow({
                recetaCodigo: receta.codigo,
                nombre: ingrediente.nombre,
                cantidad: ingrediente.cantidad,
                unidad: ingrediente.unidad
            });
        });
    });

    // Generar el archivo Excel
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", 'attachment; filename="recetas.xlsx"');

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error del servidor");
  }
};
exports.exportRecetasToPDF = async (req, res) => {
  try {
    const recetas = await Receta.find();

    // Crear un nuevo documento PDF
    const doc = new PDFDocument();

    // Configurar la respuesta HTTP con el tipo de contenido
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="recetas.pdf"'
    );

    // Pipe el documento PDF directamente a la respuesta HTTP
    doc.pipe(res);

    // Agregar contenido al documento PDF
    doc.font('Helvetica-Bold').fontSize(20).text("Lista de Recetas", { align: "center" });
    doc.moveDown();

    recetas.forEach((receta) => {
      doc.font('Helvetica-Bold').fontSize(14).text(`Código: ${receta.codigo}`);
      doc.font('Helvetica').fontSize(12).text(`Nombre: ${receta.nombre}`);
      doc.font('Helvetica').fontSize(12).text(`Rendimiento por receta: ${receta.rendimiento}`);
      doc.font('Helvetica').fontSize(12).text(`Disponible: ${receta.disponible}`);
      doc.font('Helvetica').fontSize(12).text(`Ingredientes:`);
      receta.ingredientes.forEach((ingrediente) => {
        doc.font('Helvetica').fontSize(12).text(`     Nombre: ${ingrediente.nombre}`);
        doc.font('Helvetica').fontSize(12).text(`     Cantidad: ${ingrediente.cantidad}`);
        doc.font('Helvetica').fontSize(12).text(`     Unidad: ${ingrediente.unidad}`);
        doc.moveDown();
      })
      doc.moveDown();
    });

    // Finaliza el documento PDF
    doc.end();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error del servidor");
  }
};
exports.updateRecetaById = async (req, res) => {
  const { id } = req.params;
  const { codigo, nombre, rendimiento, ingredientes, disponible } = req.body;

  try {
    let receta = await Receta.findById(id);

    if (!receta) {
      return res.status(404).json({ msg: "Receta no encontrada" });
    }

    receta.codigo = codigo || receta.codigo;
    receta.nombre = nombre || receta.nombre;
    receta.rendimiento = rendimiento || receta.rendimiento;
    receta.ingredientes = ingredientes || receta.ingredientes;
    receta.disponible = disponible || receta.disponible;

    await receta.save();

    res.json({ msg: "Receta actualizada exitosamente" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error del servidor");
  }
};

exports.unavailableRecetaById = async (req, res) => {
  const { id } = req.params;

  try {
    let receta = await Receta.findById(id);

    if (!receta) {
      return res.status(404).json({ msg: "Receta no encontrada" });
    }

    receta.disponible = false;

    await receta.save();

    res.json({ msg: "Receta disponible exitosamente" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error del servidor");
  }
};

exports.availableRecetaById = async (req, res) => {
  const { id } = req.params;

  try {
    let receta = await Receta.findById(id);

    if (!receta) {
      return res.status(404).json({ msg: "Receta no encontrada" });
    }

    receta.disponible = true;

    await receta.save();

    res.json({ msg: "Receta actualizada exitosamente" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error del servidor");
  }
};

exports.getRecetaById = async (req, res) => {
  const { id } = req.params;

  try {
    const receta = await Receta.findById(id);

    if (!receta) {
      return res.status(404).json({ msg: "Receta no encontrado" });
    }

    res.json(receta);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error del servidor");
  }
};

exports.eliminarReceta = async (req, res) => {
  try {
      const { id } = req.params;
      const receta = await Receta.findByIdAndDelete(id);
      if (!receta) {
          return res.status(404).json({ message: "Receta no encontrada" });
      }
      res.status(200).json({ message: "Receta eliminada exitosamente" });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}