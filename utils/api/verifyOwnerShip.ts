export const verifyOwnership = (item, user) => {
  const { author } = item;
  if (author.auth0 !== user.auth0) {
    throw new Error("accès refusé, vous n'etes pas proprietaire de ce champ");
  }
};
