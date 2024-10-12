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
import { resizeImageFile, stripFileNameFromExtension } from "./utils";

export const getListAll = async (): Promise<ListResult | null> => {
  try {
    const list = await listAll(storageRef);

    return list;
  } catch (e) {
    return null;
  }
};

export const getBucketElement = async (elementName: string) => {
  const downloadRef = ref(storageRef, elementName);
  try {
    const downloadURL = await getDownloadURL(downloadRef);

    return downloadURL;
  } catch (e) {
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
    return null;
  }
};

export const uploadImageToStorage = async (
  file: File
): Promise<string | null> => {
  const uploadRef = ref(storageRef, file.name);
  try {
    const uploadTask = await uploadBytes(uploadRef, file);
    return uploadTask.ref.fullPath;
  } catch (e) {
    return null;
  }
};

///Storage

export const createDecal = async (file: File) => {
  // const list = await getListAll();
  const UUID = uuidv4();
  const thumbnailFile = await resizeImageFile(file);

  try {
    const defaultData = {
      uuid: uuidv4(),
      name: "Default Name",
      thumb_nail: "Default Thumbnail",
      image: "Default Image",
    };
    const fileName = stripFileNameFromExtension(file.name);

    const imageName = await uploadImageToStorage(file);
    const thumbnailName = await uploadImageToStorage(thumbnailFile);

    const imageReference = ref(storageRef, imageName || "");
    const thumbnailReference = ref(storageRef, thumbnailName || "");

    const imageLink = await getDownloadURL(imageReference);
    const thumbnailLink = await getDownloadURL(thumbnailReference);

    const decalData = {
      uuid: UUID,
      name: fileName || defaultData.name,
      image: imageLink || defaultData.image,
      thumb_nail: thumbnailLink || defaultData.thumb_nail,
    };

    await addDoc(collection(db, "decals"), decalData);
    alert("Zdarzenie dodane pomyślnie");
  } catch (e) {
    alert("Błąd dodawania zdarzenia");
  }
};
