import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { collection, collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiGeneral {

constructor( private fireStore: Firestore ){}

// generateDocId(): string {
//   // Genera un ID basado en la marca de tiempo y un número aleatorio
//   return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
// }

getCollectionChanges  ( path: string ){
  const referenciaCollections = collection( this.fireStore, path )

  return collectionData(referenciaCollections) as Observable<any[]>
}
// createIdDoc(){
//   return uuidv4()
// }

// createDocumentID( data: any, enlace: string, idDoc: string ){

//   const document = doc( this.fireStore, `${enlace}/${idDoc}` );

//   return setDoc( document, data );
// }


async createItem(addData: any): Promise<{ status: string; message: string }> {
  console.info(addData);
  
  try {
    // 1. Crear referencia a la colección
    const collectionRef = collection(this.fireStore, 'producto');
    
    // 2. Crear referencia a un nuevo documento con ID automático
    const docRef = doc(collectionRef); 
    
    // 3. Guardar los datos
    await setDoc(docRef, addData);

    return { 
      status: 'success', 
      message: 'Documento creado con éxito!',
      // id: docRef.id // Opcional: devolver el ID generado
    };
  } catch (error: any) {
    console.error('Error al crear el documento: ', error);
    return { 
      status: 'error', 
      message: 'Error al crear el documento: ' + error.message 
    };
  }
}




}