import Sidebarnote from "../../pages/Sidebarnote";

export default async function NoteLayout({ children, params }) {
    const noteId = await params.noteId;

  return (

<div className="flex min-h-screen bg-backgroundcolor">
  <div className="xl:w-[250px]"> {/* Sidebar with fixed width */}
    <Sidebarnote noteId={noteId} />
  </div>
  
  <div className="xl:flex-1 xl:p-4 mt-4 md:w-full md:mx-auto.  w-full max-auto"> {/* Content section takes remaining space */}
    <div className="flex flex-col xl:max-w-[990px] xl:mt-8 xl:p-18 mx-auto">
      {children}
    </div>
  </div>
</div>


    

  );
}