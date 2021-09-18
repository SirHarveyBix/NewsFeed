export const log = async (resolve, _parent, _args, _ctx, _info) => {
  try {
    const response = await resolve();
    return response;
  } catch (error) {
    console.log(error);
  }
};
