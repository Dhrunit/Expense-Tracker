const findOne = async (param, schema) => {
  try {
    return await schema.findOne({ param });
  } catch (error) {
    return false;
  }
};

export { findOne };
