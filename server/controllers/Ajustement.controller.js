import Ajustement from '../database/models/Ajustement.model.js';const getAll = async (req, res) =    try {    const response = await Ajustement.findAll();    res.json(response);  } catch (error) {    console.log(error.message);  }};const getSpecific = async (req, res) =  try {    const response = await Ajustement.findOne({ where: {        id: req.params.id,      },    });    res.json(response);  } catch (error) {    console.log(error.message);  }};const createOne = (req, res) =;const updateOne = async (req, res) =;const deleteOne = async (req, res) =        const user = Ajustement.findOne({        where: {      id: req.params.id,    },  });  if (!user) return res.status(404).json({ message: 'Ajustement introvable!' });  try {    await Ajustement.destroy({      where: {        id: req.params.id,      },    });    return res.status(200).json({ message: 'Ajustement supprimé avec succès!' });  } catch (error) {    console.log(error);  }};export { getAll, getSpecific, createOne, updateOne, deleteOne }; import Ajustement from '../database/models/Ajustement.model.js';const getAll = async (req, res) =    try {    const response = await Ajustement.findAll();    res.json(response);  } catch (error) {    console.log(error.message);  }};const getSpecific = async (req, res) =  try {    const response = await Ajustement.findOne({ where: {        id: req.params.id,      },    });    res.json(response);  } catch (error) {    console.log(error.message);  }};const createOne = (req, res) =;const updateOne = async (req, res) =;const deleteOne = async (req, res) =        const user = Ajustement.findOne({        where: {      id: req.params.id,    },  });  if (!user) return res.status(404).json({ message: 'Ajustement introvable!' });  try {    await Ajustement.destroy({      where: {        id: req.params.id,      },    });    return res.status(200).json({ message: 'Ajustement supprimé avec succès!' });  } catch (error) {    console.log(error);  }};export { getAll, getSpecific, createOne, updateOne, deleteOne };  
