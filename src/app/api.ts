import {
  ListResult,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db, storageRef } from "./firebaseconfig";

import { v4 as uuidv4 } from "uuid";

export const getListAll = async (): Promise<ListResult | null> => {
  try {
    const list = await listAll(storageRef);

    return list;
  } catch (e) {
    console.log(e);

    return null;
  }
};

export const getBucketElement = async (elementName: string) => {
  const downloadRef = ref(storageRef, elementName);
  try {
    const downloadURL = await getDownloadURL(downloadRef);

    return downloadURL;
  } catch (e) {
    console.log(e);

    return null;
  }
};

export const getAllBucket = async (): Promise<string[] | []> => {
  const list = await getListAll();

  try {
    const itemsArray = [];
    if (list) {
      for (let i = 0; i < list.items.length; i++) {
        itemsArray.push(await getDownloadURL(list.items[i]));
      }
    }

    return itemsArray;
  } catch (e) {
    console.log(e);

    return null;
  }
};

export const uploadImageToStorage = async (file: File): Promise<void> => {
  console.log("upload file");
  const uploadRef = ref(storageRef, file.name);
  try {
    const uploadTask = await uploadBytes(uploadRef, file);
    console.log("uploadTask " + uploadTask.metadata);
  } catch (e) {
    console.log(e);
  }
};

///Storage

export const createDecal = async (file: File) => {
  console.log("createDecal");
  try {
    const defaultData = {
      uuid: uuidv4(),
      name: "Default Name",
      thumb_nail: "Default Thumbnail",
      image: "Default Image",
    };

    const decalData = {
      uuid: uuidv4(),
      name: file.name || defaultData.name,
      thumb_nail: "thumbnail link" || defaultData.thumb_nail,
      image: "image link" || defaultData.image,
    };
    await addDoc(collection(db, "decal"), decalData);
    alert("Zdarzenie dodane pomyślnie");
  } catch (e) {
    console.log(e);
    alert("Błąd dodawania zdarzenia");
  }
  // Dostajemy plik i tworzymy decal
  // Chcemy żeby decal miał nazwę, link z thumbnail image i z image
  //Żeby dodać link z image musimy wrzucić image, a następnie odnależć link i umieścić go w API callu pod nazwą image
  // Żeby to zrobić musimy wyeksrachować nazwe pliku i dodać ją do api calla
  //Żeby dodać link z thumbnail musimy wrzucić thumbnail firebase storage a następnie odnaleźć link i umieścić go w API callu pod nazwą thumb_nail
};
