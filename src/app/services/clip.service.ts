import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, QuerySnapshot } from '@angular/fire/compat/firestore';
import IClip from '../models/clip.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  public clipsCollection: AngularFirestoreCollection<IClip>

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth
  ) {
    this.clipsCollection = db.collection('clips');
  }


  createClip(data: IClip): Promise<DocumentReference<IClip>> {
    return this.clipsCollection.add(data); // firebase generate id
  }

  getUserClips() {
    // get clips for current user
    return this.auth.user.pipe(
      switchMap(user => {
        if (!user) {
          return of([]);
        }

        const query = this.clipsCollection.ref.where(
          'uid', '==', user.uid
        ); // reference to clip collection
        
        return query.get()
      }),
      map(snapshot => (snapshot as QuerySnapshot<IClip>).docs)
    )
  }

  updateClip(id: string, title: string) {
    return this.clipsCollection.doc(id).update({
      title
    })
  }
}
