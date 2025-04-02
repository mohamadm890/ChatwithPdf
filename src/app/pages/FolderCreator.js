'use client';
import { Skeleton } from "@/components/ui/skeleton"
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FaFolderPlus } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import FolderCreateCard_pop from './FolderCreate_card_pop'


const FolderCard = dynamic(() => import('./FolderCreator_card'), {
  loading: () =>  <div className="flex items-center space-x-4 bg-backgroundcolor">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px] bg-Card" />
    <Skeleton className="h-4 w-[200px]   bg-Card" />
  </div>
</div>,
  ssr: false,
});



function FolderCreator() {
  const [folders, setFolders] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://3002-idx-node-1736794691762.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev/folders');
      const data = await response.json();
      console.log('are you sure?', data[0]._id);
      setLoading(true);
      setFolders((prevFolders) => [...prevFolders, ...data]);
    };

    fetchData();
  }, []);

  console.log('Hi', folders);

  return (
    <div className='mt-24 '>
      <div className='max-w-full flex flex-row justify-between '>
        <p className='text-[20px] font-bold text-secon'>ملحوظة</p>
        <div className='flex flex-row gap-4 items-center bg-Card full-screen p-4 rounded-full cursor-pointer text-secon'>
          <FaFolderPlus />
          <FolderCreateCard_pop setFolders={setFolders} />
        </div>
      </div>

      <div className='mt-8 flex flex-col gap-4'>
        {folders?.map((data) => (
          <FolderCard
            key={uuidv4()}
            id={uuidv4()}
            name={data.name}
            folders={folders}
            setFolders={setFolders}
          />
        ))}
      </div>
    </div>
  );
  
}

export default FolderCreator;


