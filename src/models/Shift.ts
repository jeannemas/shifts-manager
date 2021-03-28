import firebase from 'firebase/app';

export interface Shift {
  id: string | null;

  workplace: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> | null;

  startTime: number | null;

  endTime: number | null;

  title: string | null;

  description: string | null;
}
