import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseconfig";

type DecalType = {
  name: string;
  decalLink: string;
  thumbnailLink: string;
  uuid: string;
};

export const useFetchDecals = () => {
  const [decals, setDecals] = useState<DecalType[]>([]);
  const [selectedDecal, setSelectedDecal] = useState<DecalType | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "decals"));
      const newDecals = querySnapshot.docs.map((doc) => {
        return {
          uuid: doc.id,
          name: doc.data().name,
          decalLink: doc.data().image,
          thumbnailLink: doc.data().thumb_nail,
        };
      });
      setDecals(newDecals);
    };

    fetchItems();
  }, []);

  return { decals, setDecals, selectedDecal, setSelectedDecal };
};
