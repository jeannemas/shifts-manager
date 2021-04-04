import firebase from 'firebase/app';

export default (userId: string) => {
  const db = firebase.firestore();
  const user = () => db.collection('users').doc(userId);
  const workplace = (workplaceId: string | undefined = undefined) =>
    user()
      .collection('workplaces')
      .doc(workplaceId);
  const shift = (shiftId: string | undefined = undefined) =>
    user()
      .collection('shifts')
      .doc(shiftId);

  return {
    user,
    workplace,
    shift,
  };
};
