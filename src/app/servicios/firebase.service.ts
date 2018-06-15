import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  items: Observable<any[]>;
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) {}

  obtenerDatosLogin(usuario: string, password: string): Observable<any> {
    this.itemsCollection = this.db.collection<any>('users', ref => ref.where('userEmail', '==', usuario)
                                                                      .where('userPassword', '==', password));
    return this.itemsCollection.snapshotChanges().pipe(
      map( data => {
        return data.map( d => {
          const retorno = d.payload.doc.data();
          retorno['id'] = d.payload.doc.id;
          return retorno;
        });
      })
    );
  }

  obtener(tabla): Observable<any> {
    return this.items = this.db.collection(tabla).valueChanges();
  }

  obtenerParqueaderos(): Observable<any> {
    this.itemsCollection = this.db.collection<any>('parking', ref => ref.orderBy('parkingNumber', 'asc'));
    return this.itemsCollection.snapshotChanges().pipe(
      map( data => {
        return data.map( d => {
          const retorno = d.payload.doc.data();
          retorno['id'] = d.payload.doc.id;
          return retorno;
        });
      })
    );
  }

  guardarDatos(tabla: string, data)  {
    this.itemsCollection = this.db.collection<any>(tabla);
    this.itemsCollection.add(data);
  }

  actualizarDatos (tabla, data, id) {
    this.itemsCollection = this.db.collection<any>(tabla);
    this.itemsCollection.doc(id).update(data).then(
      () => {
      }
    );
  }

  eliminarDatos(tabla: string, id: any) {
    this.itemsCollection = this.db.collection<any>(tabla);
    this.itemsCollection.doc(id).delete().then(
      () => {
      }
    );
  }
}
