import firebase from 'firebase/app';
import 'firebase/firestore';

export default async ({ Vue }) => Vue.prototype.$db = firebase.initializeApp({ projectId: 'gunescancapanoglume' }).firestore();