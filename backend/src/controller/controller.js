
// clase base para manejar las operaciones CRUD de un controlador
export class BaseController {
  
  constructor(model, validators = {}) {
    this.model = model;
    this.validators = validators;
  }

  getAll = async (req, res) => {

    try {

      const data = await this.model.getAll();
      return res.status(data.status).json({ message: data.message, data: data.data });

    } catch (error) {
      return res.status(500).json({ message: "Error interno", error: error.message });
    }
  };

  getId = async (req, res) => {

    const { id } = req.params;

    try {

      const data = await this.model.getId(id);
      return res.status(data.status).json({ message: data.message, data: data.data ?? null});

    } catch (error) {
      return res.status(500).json({ message: "Error interno", error: error.message });
    }
  };

  create = async (req, res) => {
    const validate = this.validators?.create;
    const result = validate ? validate(req.body) : { success: true, data: req.body };

    if (!result.success)
      return res.status(400).json({ message: "Error de validación", error: result.error.errors });

    try {
      const created = await this.model.create(result.data);
      return res.status(created.status).json({ message: created.message, data: created.data ?? null });
    } catch (error) {
      return res.status(500).json({ message: "Error interno", error: error.message });
    }
  };

  update = async (req, res) => {

    const { id } = req.params;
    const validate = this.validators?.update;
    const result = validate ? validate(req.body) : { success: true, data: req.body };

    if (!result.success)
      return res.status(400).json({ message: "Error de validación", error: result.error.errors });

    try {

      const update = await this.model.update(id, result.data);
      return res.status(update.status).json({message : update.message, data: update.data ?? null});

    } catch (error) {
      return res.status(500).json({ message: "Error interno", error: error.message });
    }
  };

  delete = async (req, res) => {

    const { id } = req.params;

    try {

      const destroy = await this.model.delete(id);
      return res.status(destroy.status).json({message : destroy.message, data: destroy.data ?? null});

    } catch (error) {
      return res.status(500).json({ message: "Error interno", error: error.message });
    }
  };

}
