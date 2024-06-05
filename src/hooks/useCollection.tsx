import { useState, useEffect } from 'react';
import { useAppSelector } from '../app/hooks';
import {
  DocumentData,
  Query,
  collection,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { db } from '../firebase';

interface Channels {
  id: string;
  channel: DocumentData;
}

const useCollection = (data: string) => {
  const [documents, setDocuments] = useState<Channels[]>([]);
  const collectionRef: Query<DocumentData> = query(collection(db, data));

  useEffect(() => {
    onSnapshot(collectionRef, (querySnapshot) => {
      const channelsResults: Channels[] = [];
      querySnapshot.docs.forEach((doc) => {
        channelsResults.push({
          id: doc.id,
          //ここでchannelプロパティを付与するため他の場所での指定がchannel.channel.hogeとなる
          channel: doc.data(),
        });
      });
      setDocuments(channelsResults);
    });
  }, []);

  return { documents };
};

export default useCollection;
