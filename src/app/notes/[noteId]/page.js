'use client';
import { useRouter } from 'next/navigation';
import userVideoStore from '../../pages/storedata.js';

export default function Note({ params }) {
  const noteId = params.id;
  const { videoData } = userVideoStore();

  console.log("Raw videoData:", videoData);




  console.log("Raw videoData:",typeof videoData);

  



  

  return (
    <div className='p-8 mt-12'>
      {videoData.length > 0 &&
        videoData[0].notes.map((note, index) => (
          <div key={index} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
            <h3 className='text-white'>{note.emoji} {note.title}</h3>
            <p className='text-white'>{note.text}</p>
          </div>
        ))}
    </div>
  );
}
